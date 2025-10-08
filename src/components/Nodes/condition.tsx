import React from "react";
import { Handle, Position } from "reactflow";
import { Box, Typography } from "@mui/material";

interface ConditionNodeProps {
  data: {
    label?: string;
  };
}

export const ConditionNode: React.FC<ConditionNodeProps> = ({ data }) => {
  return (
    <>
    <Box
      sx={{
        width: 120,
        height: 120,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          backgroundColor: "#1976d2",
          transform: "rotate(45deg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
          borderRadius: 1,
          position: "relative",
        }}
      >
        <Typography
          variant="body2"
          fontWeight="medium"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-45deg)",
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 60,
          }}
        >
          {"Condition"}
        </Typography>
      </Box>

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
    </Box>
    <Box sx={{
        textAlign: 'center',
    }}>
    <Typography variant="caption" color="textSecondary" fontWeight="bold">
        {data?.label}
    </Typography>
    </Box>
    </>
  );
};