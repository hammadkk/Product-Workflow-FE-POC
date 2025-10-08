import React from "react";
import { Handle, Position } from "reactflow";
import { Paper, Typography } from "@mui/material";

interface ApprovalNodeProps {
  data: {
    label?: string;
  };
}



export const ApprovalNode: React.FC<ApprovalNodeProps> = ({ data }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: 80, 
        height: 60, 
        padding: "4px",
        borderRadius: 2,
        textAlign: "center",
        position: "relative",
        backgroundColor: "#388e3c", 
        color: "#fff",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1.2, 
      }}
    >
      <Typography variant="body2" fontWeight="medium" color="inherit">
        {data?.label || "Approval"}
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
  );
};