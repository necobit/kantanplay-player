import React from "react";
import { Button, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { BleMidiDeviceInfo } from "../hooks/useBleMidi";

interface BleMidiConnectorProps {
  deviceInfo: BleMidiDeviceInfo | null;
  error: string | null;
  connecting: boolean;
  requestDevice: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const BleMidiConnector: React.FC<BleMidiConnectorProps> = ({ deviceInfo, error, connecting, requestDevice, disconnect }) => {
  return (
    <Box mt={2}>
      <Typography variant="h6">BLE MIDIデバイス接続</Typography>
      {deviceInfo ? (
        <Box>
          <Typography variant="body1">
            接続中: {deviceInfo.name} ({deviceInfo.connected ? "接続済み" : "未接続"})
          </Typography>
          <Button variant="outlined" color="secondary" onClick={disconnect} sx={{ mt: 1 }}>
            切断
          </Button>
        </Box>
      ) : (
        <Button variant="contained" onClick={requestDevice} disabled={connecting}>
          {connecting ? <CircularProgress size={20} /> : "BLE MIDIデバイスを検索・接続"}
        </Button>
      )}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};
