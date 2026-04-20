//Acho que dá para fazer assim o factory. Ele tipa os sensores e tem um método estático para criar os sensores com base no tipo e id fornecidos. Assim, a criação dos sensores fica centralizada e fácil de manter. Se precisar adicionar mais tipos de sensores no futuro, é só adicionar mais casos no switch.
import { ISensor } from "./interfaces";
import { TemperatureSensor, HumiditySensor, CO2Sensor } from "./sensors";

type SensorType = "temperature" | "humidity" | "co2"; // Tipagem de sensores

export class SensorFactory {
  static create(type: SensorType, id: string): ISensor {
    switch (type) {
      case "temperature": return new TemperatureSensor(id); //Aqui é para temp
      case "humidity":    return new HumiditySensor(id); //Aqui é para umidade
      case "co2":         return new CO2Sensor(id); // Aqui para CO2
      default:
        throw new Error(`Tipo de sensor desconhecido: ${type}`); //Erro caso por alguma razão tenha algo diferente.
    }
  }
} 
