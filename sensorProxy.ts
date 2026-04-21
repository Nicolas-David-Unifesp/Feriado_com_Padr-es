//Vamos fazer aqui o proxy
import { ISensor, SensorReading } from "./interfaces";
import { Logger } from "./logger";

export class SensorProxy implements ISensor {//O proxy do sensor tem função de controlar o acesso e cachear as leituras do sensor real.
  private cache: SensorReading | null = null;
  private lastRead: number = 0;
  private readonly TTL_MS = 5000; // cache de 5 segundos

  constructor(
    private realSensor: ISensor,//O sensor real
    private allowedRoles: string[],//Quais roles podem acessar o sensor
    private currentRole: string//Role atual
  ) {}
  getId(): string { return this.realSensor.getId(); }
  read(): SensorReading {
    const logger = Logger.getInstance();

    if (!this.allowedRoles.includes(this.currentRole)) {//Se  role atual não for permitido, loga o acesso negado e lança um erro.
      logger.log(`ACESSO NEGADO: role '${this.currentRole}' tentou ler ${this.getId()}`);
      throw new Error("Acesso não autorizado ao sensor.");
    }

    const now = Date.now();
    if (this.cache && now - this.lastRead < this.TTL_MS) {//Se ainda for valido, retorna o valor do cache e loga o cache hit.
      logger.log(`CACHE HIT: ${this.getId()}`);
      return this.cache;
    }

    logger.log(`LEITURA REAL: ${this.getId()}`);//Se o cache não exite ou por algum motivo expirou, faz a leitura real do sensor, atualiza o cache e loga a leitura real.
    this.cache = this.realSensor.read();
    this.lastRead = now;
    return this.cache;
  }
}
