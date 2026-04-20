
export class TemperatureSensor implements ISensor {//Sensor de temperatura
  constructor(private id: string) {}
  getId(): string { return this.id; }
  read(): 
  
  SensorReading {
    return {
      sensorId: this.id,
      type: "temperature",
      value: 20 + Math.random() * 15,   // Aqui tentei simular como se fosse uma leitura real, variando entre 20 e 35 graus Celsius.
      unit: "°C",
      timestamp: new Date(),
    };
  }
}

export class
