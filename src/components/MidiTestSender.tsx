import React, { useState } from "react";
import { Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import { sendUsbMidiMessage, sendBleMidiMessage } from "../utils/midiSender";
import { MidiOutputInfo } from "../hooks/useMidiOutputs";
import { BleMidiDeviceInfo } from "../hooks/useBleMidi";

interface MidiTestSenderProps {
  usbMidiOutput: MidiOutputInfo | undefined;
  bleMidi: BleMidiDeviceInfo | null;
}

export const MidiTestSender: React.FC<MidiTestSenderProps> = ({ usbMidiOutput, bleMidi }) => {
  // デバッグ用ログ出力
  console.log("[MidiTestSender] usbMidiOutput:", usbMidiOutput);
  console.log("[MidiTestSender] bleMidi:", bleMidi);

  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const note = 60; // C4
  const velocity = 100;
  const channel = 0; // チャンネル1固定（0）

  const isUsbConnected = !!usbMidiOutput;
  const isBleConnected = bleMidi && bleMidi.connected;
  const canSend = isUsbConnected || isBleConnected;

  const handleSend = async (type: "on" | "off") => {
    try {
      if (isUsbConnected) {
        const status = type === "on" ? 0x90 : 0x80; // ノートオン/オフ
        await sendUsbMidiMessage(usbMidiOutput!.output, [status | channel, note, velocity]);
        setSnackbar({ open: true, message: `USB MIDIにノート${type === "on" ? "オン" : "オフ"}送信`, severity: "success" });
      } else if (isBleConnected && bleMidi && bleMidi.device.gatt) {
        const status = type === "on" ? 0x90 : 0x80;
        await sendBleMidiMessage(bleMidi.device.gatt, [status | channel, note, velocity]);
        setSnackbar({ open: true, message: `BLE MIDIにノート${type === "on" ? "オン" : "オフ"}送信`, severity: "success" });
      } else {
        setSnackbar({ open: true, message: "MIDIデバイスが未選択または未接続です", severity: "error" });
      }
    } catch (e: any) {
      setSnackbar({ open: true, message: e?.message || "送信エラー", severity: "error" });
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">MIDI送信テスト</Typography>
      <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => handleSend("on")} disabled={!canSend}>ノートオン送信</Button>
      <Button variant="outlined" color="primary" onClick={() => handleSend("off")} disabled={!canSend}>ノートオフ送信</Button>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
      {!canSend && (
        <Alert severity="error" sx={{ mt: 2 }}>
          MIDIデバイスが未選択または未接続です
        </Alert>
      )}
    </Box>
  );
};
