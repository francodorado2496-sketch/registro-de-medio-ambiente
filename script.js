let env3_temps = [];
let env5_niveles = [];
let env5_alertas = 0;

function ambiente1() {
    const resultadoSpan = document.getElementById('env1-resultado');
    const aqi = parseFloat(document.getElementById('env1-aqi').value);
    
    if (isNaN(aqi)) {
        resultadoSpan.innerHTML = "Error: Ingresa un número.";
        return; 
    }

    let clasificacion = "";
    if (aqi <= 50) { clasificacion = "Buena"; }
    else if (aqi <= 100) { clasificacion = "Moderada"; }
    else if (aqi <= 150) { clasificacion = "Dañina a la salud para grupos sensibles"; }
    else if (aqi <= 200) { clasificacion = "Dañina a la salud"; }
    else if (aqi <= 300) { clasificacion = "Muy dañina a la salud"; }
    else { clasificacion = "Peligrosa"; }
    
    resultadoSpan.innerHTML = `<strong>${clasificacion}</strong>.`;
}


function ambiente2() {
    const resultadoSpan = document.getElementById('env2-resultado');
    const input = document.getElementById('env2-niveles').value; 
    
    if (input === "") {
        resultadoSpan.innerHTML = "Error: Ingresa mediciones.";
        return;
    }
    const nivelesStr = input.split(',');
    let sumaTotal = 0;
    let conteoValido = 0;


    for (let i = 0; i < nivelesStr.length; i++) {
        const num = parseFloat(nivelesStr[i]);
        if (!isNaN(num)) {
            sumaTotal += num;
            conteoValido++;
        }
    }

    if (conteoValido === 0) {
        resultadoSpan.innerHTML = "Error: No se encontraron números.";
        return;
    }

    const promedio = sumaTotal / conteoValido;
    resultadoSpan.innerHTML = `Promedio de ruido: <strong>${promedio.toFixed(2)} dB</strong>.`;
}


function ambiente3() {
    const input = document.getElementById('env3-temp');
    const listaSpan = document.getElementById('env3-lista');
    const resultadoSpan = document.getElementById('env3-resultado');
    const temp = parseFloat(input.value);

    resultadoSpan.className = ""; 

    if (temp === 0) {
        let contadorAltas = 0;
        let i = 0;
        
  
        while (i < env3_temps.length) {
            if (env3_temps[i] > 45) {
                contadorAltas++;
            }
            i++;
        }
        
        resultadoSpan.innerHTML = `Se encontraron <strong>${contadorAltas}</strong> focos de calor.`;
        

        env3_temps = [];
        listaSpan.innerHTML = "Ninguno";
    } 

    else if (!isNaN(temp)) {
        env3_temps.push(temp);
        listaSpan.innerHTML = env3_temps.join('°C, ') + '°C';
        resultadoSpan.innerHTML = "..."; 
    } 

    else {
        resultadoSpan.innerHTML = "Por favor, ingresa un número (o 0 para terminar).";
        resultadoSpan.className = "feedback-error";
    }

    input.value = "";
}



function ambiente4() {
    const resultadoSpan = document.getElementById('env4-codigo');
    const codigo = document.getElementById('env4-codigo').value;
    let tipo = "";

    switch (codigo) {
        case "1": tipo = "Orgánico"; break;
        case "2": tipo = "Plástico"; break;
        case "3": tipo = "Papel/Cartón"; break;
        case "4": tipo = "Vidrio"; break;
        default: tipo = "Código no reconocido (usa 1-4)";
    }
    resultadoSpan.innerHTML = `Código ${codigo}: <strong>${tipo}</strong>.`;
}



function ambiente5() {
    const input = document.getElementById('env5-nivel');
    const feedbackSpan = document.getElementById('env5-feedback');
    const resultadoSpan = document.getElementById('env5-resultado');
    const valorInput = input.value.trim();


    if (valorInput.toLowerCase() === 'no') {
        

        if (env5_niveles.length > 0) {
            resultadoSpan.innerHTML = `Registro finalizado. <br>
                                     Total de mediciones: ${env5_niveles.length}. <br>
                                     Alertas de inundación (> 3m): <strong>${env5_alertas}</strong>.`;
        } else {
            resultadoSpan.innerHTML = "No se registraron mediciones.";
        }
        
        feedbackSpan.innerHTML = "Listo para un nuevo registro.";
        feedbackSpan.className = "feedback-info"; 
        

        env5_niveles = [];
        env5_alertas = 0;
    } 

    else {
        const nivel = parseFloat(valorInput);
        if (!isNaN(nivel)) {
            env5_niveles.push(nivel);
            
            if (nivel > 3) {
                env5_alertas++;
                feedbackSpan.innerHTML = `<strong>¡ALERTA!</strong> Nivel (${nivel}m) supera los 3m. Registrado.`;
                feedbackSpan.className = "feedback-error";
            } else {
                feedbackSpan.innerHTML = `Nivel ${nivel}m registrado.`;
                feedbackSpan.className = "feedback-info"; 
            }
            resultadoSpan.innerHTML = "..."; 
        } else {
 
            feedbackSpan.innerHTML = "Error: Ingresa un número válido o escribe 'no' para terminar.";
            feedbackSpan.className = "feedback-error"; 
        }
    }
    
    input.value = "";
}