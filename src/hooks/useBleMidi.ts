import { useState } from "react";

export interface BleMidiDeviceInfo {
  name: string | null;
  device: BluetoothDevice;
  connected: boolean;
}

export function useBleMidi() {
  const [deviceInfo, setDeviceInfo] = useState<BleMidiDeviceInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  async function requestDevice() {
    setError(null);
    setConnecting(true);
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ["03b80e5a-ede8-4b33-a751-6ce34ec4c700"] },
        ]
      });
      let connected = false;
      if (device.gatt) {
        try {
          await device.gatt.connect();
          connected = device.gatt.connected;
        } catch (e: any) {
          setError("BLE MIDIデバイスへの接続に失敗しました: " + (e?.message || ""));
        }
      }
      setDeviceInfo({
        name: device.name ?? "Unknown BLE MIDI Device",
        device,
        connected,
      });
      device.addEventListener("gattserverdisconnected", () => {
        setDeviceInfo((prev) => prev ? { ...prev, connected: false } : null);
      });
    } catch (e: any) {
      setError(e?.message || "BLE MIDIデバイスの選択に失敗しました。");
    } finally {
      setConnecting(false);
    }
  }

  async function disconnect() {
    if (deviceInfo?.device.gatt?.connected) {
      await deviceInfo.device.gatt.disconnect();
      setDeviceInfo((prev) => prev ? { ...prev, connected: false } : null);
    }
  }

  return {
    deviceInfo,
    error,
    connecting,
    requestDevice,
    disconnect,
  };
}
