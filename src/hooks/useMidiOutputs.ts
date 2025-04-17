import { useEffect, useState } from "react";

export interface MidiOutputInfo {
  id: string;
  name: string;
  manufacturer?: string;
  output: MIDIOutput;
}

export function useMidiOutputs() {
  const [outputs, setOutputs] = useState<MidiOutputInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let access: WebMidi.MIDIAccess | null = null;
    let onStateChange: ((e: WebMidi.MIDIConnectionEvent) => void) | null = null;

    async function init() {
      try {
        access = await navigator.requestMIDIAccess();
        const updateOutputs = () => {
          const arr: MidiOutputInfo[] = [];
          access?.outputs.forEach((output) => {
            arr.push({
              id: output.id,
              name: output.name,
              manufacturer: output.manufacturer,
              output,
            });
          });
          setOutputs(arr);
        };
        updateOutputs();
        onStateChange = () => updateOutputs();
        access.onstatechange = onStateChange;
        setInitialized(true);
      } catch (e) {
        setError("Web MIDI APIの初期化に失敗しました。ブラウザが対応していない可能性があります。");
      }
    }
    init();
    return () => {
      if (access && onStateChange) {
        access.onstatechange = null;
      }
    };
  }, []);

  return { outputs, error, initialized };
}
