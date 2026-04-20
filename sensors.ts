
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

export class CO2Sensor implements ISensor {//Sensor de CO2
  constructor(private id: string) {}

  getId(): string { return this.id; }

  read(): SensorReading {
    return {
      sensorId: this.id,
      type: "co2",
      value: 400 + Math.random() * 600,//Simula que está entre 400 ppm e 1000 ppm.
      unit: "ppm",
      timestamp: new Date(),
    };
  }
}

export class HumiditySensor implements ISensor {//Sensor de umidade
  constructor(private id: string) {}

  getId(): string { return this.id; }

  read(): SensorReading {
    return {
      sensorId: this.id,
      type: "humidity",
      value: 40 + Math.random() * 40, //Simula uma leitura de umidade relativa do ar, entre 40% e 80%.
      unit: "%",
      timestamp: new Date(),
    };
  }
}
