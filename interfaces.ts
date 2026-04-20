export interface SensorReading {
  sensorId: string;
  type: "temperature" | "humidity" | "co2";
  value: number;
  unit: string;
  timestamp: Date;
}// Leitor de sensores. Ele lê dados como temperatura, umidade e CO2.

export interface ISensor {
  getId(): string;
  read(): SensorReading;
}// Interface para os sensores.

export interface IObserver {
  update(alert: AlertEvent): void;
}//Interface do Observador. Ele recebe notificações de alertas.

export interface IObservable {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(alert: AlertEvent): void;
}// Interface para objetos que são observáveis. Permite que observadores se inscrevam e sejam notificados de eventos.

export interface AlertEvent {
  sensorId: string;
  message: string;
  value: number;
  threshold: number;
  severity: "warning" | "critical";
  timestamp: Date;
}//Uma interface para eventos de alerta. Verifica valores de sensores e gera mensagens de alerta como atenção ou crítica.
