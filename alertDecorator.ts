//Aqui seria o decorator

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
  
