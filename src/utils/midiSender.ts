// USB/BLE両対応のMIDIメッセージ送信ユーティリティ

// USB MIDI (Web MIDI API)
export async function sendUsbMidiMessage(
  output: MIDIOutput,
  data: number[]
) {
  // Web MIDI APIはMIDIチャンネル1固定ならdata[0]の下位4bitが0x00
  output.send(data);
}

// BLE MIDI (GATT)
// BLE MIDI仕様: https://www.midi.org/specifications-old/item/bluetooth-le-midi-specification
// BLE MIDIパケットは [ヘッダ(0x80), MIDIメッセージ...] の形で送信する
export async function sendBleMidiMessage(
  gatt: BluetoothRemoteGATTServer,
  data: number[],
  characteristic?: BluetoothRemoteGATTCharacteristic
) {
  // BLE MIDIサービスUUID, キャラクタリスティックUUID
  const SERVICE_UUID = "03b80e5a-ede8-4b33-a751-6ce34ec4c700";
  const CHARACTERISTIC_UUID = "7772e5db-3868-4112-a1a9-f2669d106bf3";

  try {
    const service = await gatt.getPrimaryService(SERVICE_UUID);
    const char = characteristic || await service.getCharacteristic(CHARACTERISTIC_UUID);
    // BLE MIDIパケット: [0x80, ...MIDIメッセージ]
    const packet = new Uint8Array([0x80, ...data]);
    await char.writeValue(packet);
  } catch (e) {
    throw new Error("BLE MIDIメッセージ送信失敗: " + (e as Error).message);
  }
}
