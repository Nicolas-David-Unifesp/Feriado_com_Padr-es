/*Vou usar o Singleton para o Logger, 
assim a gente tem um log centralizado e fácil de acessar de qualquer parte do código.*/

export class Logger {//Aqui seria o log central.
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {//Adiciona uma nova entrada de log com timestamp.
    const entry = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getLogs(): string[] {//Retorna uma cópia dos logs para evitar modificações externas.
    return [...this.logs];
  }
}
