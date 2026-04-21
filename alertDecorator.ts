//Aqui seria o decorator

import { ISensor, SensorReading, AlertEvent, IObservable } from "./interfaces";
import { Logger } from "./logger";

export class AlertDecorator implements ISensor {
  constructor(
    private sensor: ISensor,
    private threshold: number,
    private publisher: IObservable
  ) {}

  getId(): string { return this.sensor.getId(); }

  read(): SensorReading {
    const reading = this.sensor.read();
    const logger = Logger.getInstance();

    if (reading.value > this.threshold) {
      const severity = reading.value > this.threshold * 1.2 ? "critical" : "warning";

      const alert: AlertEvent = {
        sensorId: reading.sensorId,
        message: `Leitura acima do limite: ${reading.value.toFixed(1)} ${reading.unit}`,
        value: reading.value,
        threshold: this.threshold,
        severity,
        timestamp: new Date(),
      };

      logger.log(`ALERTA [${severity.toUpperCase()}] — ${alert.message}`);
      this.publisher.notify(alert);
    }

    return reading;
  }
}
  
