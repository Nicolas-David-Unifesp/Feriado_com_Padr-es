import { IObservable, IObserver, AlertEvent } from "./interfaces";

//Aqui é o gerenciador de alertas.
export class AlertPublisher implements IObservable {
  private observers: IObserver[] = [];

  subscribe(observer: IObserver): void {
    this.observers.push(observer);//Adiciona um observador à lista de inscritos.
  }

  unsubscribe(observer: IObserver): void {//Remove um observador da lista de inscritos.
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(alert: AlertEvent): void {//Notifica os observadores
    for (const observer of this.observers) {
      observer.update(alert);
    }
  }
}

// Email
export class EmailChannel implements IObserver {
  constructor(private email: string) {}

  update(alert: AlertEvent): void {
    console.log(
      `Alerta Email: ${this.email}: [${alert.severity}] ${alert.message}`//Simula o envio do email. Mostra a severidade e a mensagem do alerta.
    );
  }
}

//SMS
export class SMSChannel implements IObserver {
  constructor(private phone: string) {}

  update(alert: AlertEvent): void {
    console.log(
      `Alerta SMS: ${this.phone}: ALERTA ${alert.severity} em ${alert.sensorId}`//Simula o envio do SMS. Mostra a severidade e o sensor que gerou o alerta.
    );
  }
}

//Pro ZapZap
export class WhatsAppChannel implements IObserver {
    constructor(private phone: string) {}

    update(alert: AlertEvent): void {
        const emoji = alert.severity === "critical" ? "🚨" : "⚠️";
        console.log(`${emoji} Alerta no Zap: ${this.phone}: [${alert.severity}] ${alert.message}`);//Simula o envio de uma mensagem no WhatsApp. Mostra a severidade e a mensagem do alerta.
    }
}

// Dashboard
export class DashboardChannel implements IObserver {
  update(alert: AlertEvent): void {
    console.log(
      `Alerta Dashboard: [${alert.timestamp.toISOString()}] ${alert.sensorId} — ${alert.message}`//Simula a atualização do dashboard. Mostra o sensor e a mensagem do alerta.
    );
  }
}
