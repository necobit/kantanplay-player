import React, { useState } from "react";
import { Container, Typography, Divider } from "@mui/material";
import { MIDIOutputSelector } from "./components/MIDIOutputSelector";
import { BleMidiConnector } from "./components/BleMidiConnector";
import { MidiTestSender } from "./components/MidiTestSender";
import { useMidiOutputs } from "./hooks/useMidiOutputs";
import { useBleMidi } from "./hooks/useBleMidi";

function App() {
  const [selectedOutputId, setSelectedOutputId] = useState<string | undefined>(undefined);
  const { outputs } = useMidiOutputs();
  // useBleMidiは1回だけ呼び出し、deviceInfoを下位コンポーネントに渡す
  const bleMidiHook = useBleMidi();
  const bleMidi = bleMidiHook.deviceInfo;
  const usbMidiOutput = outputs.find((o) => o.id === selectedOutputId);

  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
      <Typography variant="h4" gutterBottom>
        MIDI出力デバイス選択デモ
      </Typography>
      <MIDIOutputSelector value={selectedOutputId} onChange={setSelectedOutputId} />
      {selectedOutputId && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          選択中のデバイスID: {selectedOutputId}
        </Typography>
      )}
      <Divider sx={{ my: 4 }} />
      {/* BleMidiConnectorにbleMidiHookをpropsで渡す */}
      <BleMidiConnector
        deviceInfo={bleMidiHook.deviceInfo}
        error={bleMidiHook.error}
        connecting={bleMidiHook.connecting}
        requestDevice={bleMidiHook.requestDevice}
        disconnect={bleMidiHook.disconnect}
      />
      <Divider sx={{ my: 4 }} />
      {/* MidiTestSenderにも同じbleMidiを渡す */}
      <MidiTestSender usbMidiOutput={usbMidiOutput} bleMidi={bleMidi} />
    </Container>
  );
}

export default App;
