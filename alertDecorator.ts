//Aqui seria o decorator
import { ISensor, SensorReading } from "./interfaces";
import { SensorFactory } from "./sensorFactory";
import { LegacyThermometer, LegacySensorAdapter, LegacyImperialSensorAdapter, ImperialThermometer } from "./adapter";
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


    setupSensors(): void {
      const logger = Logger.getInstance();

      // Factory cria os sensores
      const temp = SensorFactory.create("temperature", "TEMP-01");
      const humid = SensorFactory.create("humidity", "HUMID-01");
      const co2 = SensorFactory.create("co2", "CO2-01");
  
      // Adapter envolve o sensores
      const legacyDevice = new LegacyThermometer();
      const legacyAdapted = new LegacySensorAdapter(legacyDevice);
      const imperialDevice = new ImperialThermometer();
      const imperialAdapted = new LegacyImperialSensorAdapter(imperialDevice);
  
      // Proxy adiciona cache e controle de acesso
      const tempProxied  = new SensorProxy(temp, ["operator", "admin"], this.userRole);
      const humidProxied = new SensorProxy(humid, ["operator", "admin"], this.userRole);
      const co2Proxied   = new SensorProxy(co2, ["admin"], this.userRole);
      const legacyProxied = new SensorProxy(legacyAdapted, ["operator", "admin"], this.userRole);
  
      // Decorator adiciona alertas sobre os proxies
      const tempDecorated  = new AlertDecorator(tempProxied, 30, this.publisher);
      const humidDecorated = new AlertDecorator(humidProxied, 70, this.publisher);
      const co2Decorated   = new AlertDecorator(co2Proxied, 800, this.publisher);
      const legacyDecorated = new AlertDecorator(legacyProxied, 30, this.publisher);
  
      this.sensors.set(temp.getId(), tempDecorated);
      this.sensors.set(humid.getId(), humidDecorated);
      this.sensors.set(co2.getId(), co2Decorated);
      this.sensors.set(legacyDevice.deviceCode, legacyDecorated);
      this.sensors.set(imperialDevice.deviceCode, imperialAdapted); 
  
      logger.log(`Facade inicializada com ${this.sensors.size} sensores. Role: ${this.userRole}`);
    }

    readAll(): SensorReading[] {
      const results: SensorReading[] = [];
      for (const [id, sensor] of this.sensors) {
          try {
            results.push(sensor.read());
          } catch (err: any) {
            Logger.getInstance().log(`ERRO ao ler ${id}: ${err.message}`);
          }
      }
      return results;
    }

  
}

  
