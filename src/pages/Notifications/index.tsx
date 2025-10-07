import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
  IconButton,
  Divider,
  Paper,
  Tooltip,
  Snackbar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { GET_ALL_NOTIFICATIONS } from "../../graphql/notifications/query";
import { UPDATE_NOTIFICATION } from "../../graphql/notifications/mutations";

const NotificationList: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_ALL_NOTIFICATIONS);
  const [updateNotification] = useMutation(UPDATE_NOTIFICATION);
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">Error fetching notifications 😢</Typography>
      </Box>
    );

  const notifications = (data?.notifications || []).filter(
    (notif: any) => notif.isModified === false
  );

  const handleApproveOrReject = async (
    notif: any,
    approval: boolean = false
  ) => {
    try {
      await updateNotification({
        variables: {
          updateNotificationInput: {
            id: notif.id,
            isModified: true,
          },
          approval,
        },
      });
      setSnackbar({ open: true, message: "Notification Updated ✅" });
      refetch();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to update notification ❌" });
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9fafc", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate("/products")} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight={600} ml={2}>
          Pending Notifications
        </Typography>
      </Box>

      {notifications.length === 0 ? (
        <Typography textAlign="center" color="textSecondary" mt={5}>
          🎉 All notifications have been approved!
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <List>
            {notifications.map((notif: any, index: number) => (
              <React.Fragment key={notif.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 2,
                    px: 3,
                    "&:hover": { backgroundColor: "#f1f5ff" },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#1976d2" }}>
                      <NotificationsActiveIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {notif.productName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {notif.description
                          ? notif.description
                          : "This product needs your approval."}
                      </Typography>
                    }
                  />

                  {/* Action Buttons */}
                  <Box display="flex" gap={1}>
                    <Tooltip title="Approve">
                      <IconButton
                        color="success"
                        onClick={() => handleApproveOrReject(notif, true)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Reject">
                      <IconButton
                        color="error"
                        onClick={() => handleApproveOrReject(notif, false)}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>

                {index !== notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default NotificationList;
