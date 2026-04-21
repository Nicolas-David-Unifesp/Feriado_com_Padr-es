//Aqui seria o decorator
import { ISensor, SensorReading } from "./interfaces";
import { SensorFactory } from "./sensorFactory";
import { LegacyThermometer, LegacySensorAdapter } from "./adapter";
import { SensorProxy } from "./sensorProxy";
import { AlertDecorator } from "./alertDecorator";
import { AlertPublisher, EmailChannel, SMSChannel, DashboardChannel, WhatsAppChannel } from "./alertPublisher";
import { Logger } from "./logger";


export class MonitoringFacade {
  private sensors: Map<string, ISensor> = new Map();
  private publisher: AlertPublisher;

  constructor(private userRole: string = "operator") {
    this.publisher = new AlertPublisher();

    // Registra canais de notificação (Observer)
    this.publisher.subscribe(new EmailChannel("ops@empresa.com"));
    this.publisher.subscribe(new SMSChannel("+5511999990000"));
    this.publisher.subscribe(new DashboardChannel());
    this.publisher.subscribe(new WhatsAppChannel("+5511999990000"));
  }

   getLogs(): string[] {
    return Logger.getInstance().getLogs();
  }

  readSensor(id: string): SensorReading {
    const sensor = this.sensors.get(id);
    if (!sensor) throw new Error(`Sensor não encontrado: ${id}`);
    return sensor.read();
  }
}
  
