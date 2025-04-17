import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useMidiOutputs, MidiOutputInfo } from "../hooks/useMidiOutputs";

interface MIDIOutputSelectorProps {
  value: string | undefined;
  onChange: (id: string) => void;
}

export const MIDIOutputSelector: React.FC<MIDIOutputSelectorProps> = ({ value, onChange }) => {
  const { outputs, error, initialized } = useMidiOutputs();

  return (
    <FormControl fullWidth margin="normal" disabled={!initialized || !!error || outputs.length === 0}>
      <InputLabel id="midi-output-select-label">MIDI出力デバイス</InputLabel>
      <Select
        labelId="midi-output-select-label"
        id="midi-output-select"
        name="midi-output"
        value={value ?? ""}
        label="MIDI出力デバイス"
        onChange={(e) => onChange(e.target.value as string)}
      >
        {outputs.map((output: MidiOutputInfo) => (
          <MenuItem key={output.id} value={output.id} id={`midi-output-option-${output.id}`}>
            {output.name} {output.manufacturer ? `(${output.manufacturer})` : ""}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>{error}</FormHelperText>}
      {!error && outputs.length === 0 && initialized && (
        <FormHelperText>利用可能なMIDI出力デバイスが見つかりません</FormHelperText>
      )}
    </FormControl>
  );
};
