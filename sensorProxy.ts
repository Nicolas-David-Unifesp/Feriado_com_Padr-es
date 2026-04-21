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
}
