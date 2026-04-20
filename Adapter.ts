import { ISensor, SensorReading } from "./interfaces";

// Simula um dispositivo com interface diferente
interface LegacyDevice {
  deviceCode: string;
  fetchRaw(): { temp_k: number; ts: number };  // Kelvin e timestamp em ms
}

interface ImperialDevice{
    deviceCode: string;
    fetchImperial(): { temp_f: number; ts: number }; // Fahrenheit e timestamp em ms
}

export class ImperialThermometer implements ImperialDevice {
    deviceCode = "IMPERIAL-001";

    fetchImperial(): { temp_f: number; ts: number } {
        return {temp_f: 77 + Math.random() * 10, ts: Date.now()}; // Exemplo de valores em Fahrenheit
    }
}


export class LegacyThermometer implements LegacyDevice {//Aqui temos um dispositivo legado que não segue a interface ISensor. 
  deviceCode = "LEGACY-001";

  fetchRaw() {
    return { temp_k: 293 + Math.random() * 10, ts: Date.now() };
  }
}

// O adptador ficaria aqui: De LegacyDevice para ISensor
export class LegacySensorAdapter implements ISensor {
  constructor(private device: LegacyDevice) {}

  getId(): string { return this.device.deviceCode; }

  read(): SensorReading {
    const raw = this.device.fetchRaw();
    return {
      sensorId: this.device.deviceCode,
      type: "temperature",
      value: raw.temp_k - 273.15,          // Transforma Kelvin em Celsius
      unit: "°C",
      timestamp: new Date(raw.ts),
    };
  }
}

export class LegacyImperialSensorAdapter implements ISensor {
    constructor(private device: ImperialDevice) {}

    getId(): string { return this.device.deviceCode; }

    read(): SensorReading {
        const raw = this.device.fetchImperial();
        return {
            sensorId: this.device.deviceCode,
            type: "temperature",
            value: (raw.temp_f - 32) * 5 / 9, // Transforma Fahrenheit em Celsius
            unit: "°C",
            timestamp: new Date(raw.ts),
        };
    }
}
