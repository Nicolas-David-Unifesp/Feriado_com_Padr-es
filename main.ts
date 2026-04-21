//Aqui teria que fazer um exemplo de alguma situação pra ver se funciona de fato

import { MonitoringFacade } from "./monitoringFacade";

const system = new MonitoringFacade("operator");// Configura os sensores e o sistema
system.setupSensors();

console.log("\n=== LEITURA DE TODOS OS SENSORES ===");
const readings = system.readAll();// Lê e exibe as leituras de todos os sensores

for (const r of readings) {
  console.log(`${r.sensorId} | ${r.type}: ${r.value.toFixed(2)} ${r.unit}`);//Mostra as leituras formatadas. O valor é arredondado.
}

console.log("\n=== LOGS DO SISTEMA ===");
for (const log of system.getLogs()) {
  console.log(log);
}// Exibe os logs do sistema, incluindo alertas e erros.

// Pergunta ao usuário se deseja ler um sensor específico e exibe a leitura se o ID for válido
confirm("Deseja ler um sensor específico?") && (() => {
  const sensorId = prompt("Digite o ID do sensor:");
    if (sensorId) {
        try {
            const reading = system.readSensor(sensorId);
            console.log(`Leitura do sensor ${sensorId}: ${reading.value.toFixed(2)} ${reading.unit}`);
        } catch (err: any) {
            console.error(`Erro: ${err.message}`);
        }
}
})();
