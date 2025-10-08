import React from "react";
import { Handle, Position } from "reactflow";
import { Paper, Typography, Box } from "@mui/material";

interface HttpRequestNodeProps {
  data: {
    label?: string;
  };
}

export const HttpRequestNode: React.FC<HttpRequestNodeProps> = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: 90,
          height: 85,
          padding: "4px",
          borderRadius: "16px",
          textAlign: "center",
          position: "relative",
          backgroundColor: "#e86337ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          border: "1px solid #c44c27",
          lineHeight: 1.2,
          flexShrink: 0,
        }}
      >
        <Typography variant="body2" fontWeight="medium" color="inherit">
          {"HTTP Request"}
        </Typography>

        <Handle
          type="target"
          position={Position.Left}
          id="input-left"
          style={{ background: "#555" }}
        />

        <Handle
          type="source"
          position={Position.Right}
          id="output-right"
          style={{ background: "#555" }}
        />
      </Paper>

      <Typography
        variant="caption"
        sx={{
          marginLeft: 1.5,
          textAlign: "left",
          color: "text.primary",
          whiteSpace: "nowrap",
          maxWidth: 250,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {data.label}
      </Typography>
    </Box>
  );
};