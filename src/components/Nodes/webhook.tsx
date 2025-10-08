import React from "react";
import { Handle, Position } from "reactflow";
import { Typography, Paper } from "@mui/material";

interface CustomNodeProps {
  data: {
    label?: string;
  };
}


export const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f0f0f0",
        border: '1px solid #ccc',
        lineHeight: 1.2,
      }}
    >
      <Typography variant="body2" fontWeight="medium">
        {data?.label || "Custom Node"}
      </Typography>

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: "#555" }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: "#555" }}
      />
    </Paper>
  );
};