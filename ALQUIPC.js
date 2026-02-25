function CalcularFactura() {
  const nombre = document.getElementById('nombre').value;
  const equipos = parseInt(document.getElementById('numero_equipos').value);
  const diasIni = parseInt(document.getElementById('numero_dias_iniciales').value);
  const diasExtra = parseInt(document.getElementById('numero_dias_adicionales').value) || 0;
  const tipo = document.getElementById('tipo_servicio').value;

  if (equipos < 2 || isNaN(equipos)) {
    alert("Error: Debe alquilar al menos 2 equipos para generar la factura.");
    return;
  }

  const PRECIO_BASE_DIA = 35000;
  let subtotal = equipos * diasIni * PRECIO_BASE_DIA;

  let recargoDiasExtra = 0;
  if (diasExtra > 0) {
    recargoDiasExtra = subtotal * (0.02 * diasExtra);
  }

  let totalParcial = subtotal + recargoDiasExtra;

  let ajusteServicio = 0;
  if (tipo === "Fuera de la ciudad") {
    ajusteServicio = totalParcial * 0.05; 
  } else if (tipo === "Dentro del establecimiento") {
    ajusteServicio = -(totalParcial * 0.05); 
  }

  const totalFinal = totalParcial + ajusteServicio;

  let resultadoDiv = document.getElementById('resultado');
  
  if (!resultadoDiv) {
    resultadoDiv = document.createElement('div');
    resultadoDiv.id = 'resultado';
    resultadoDiv.className = 'resultado';
    document.body.appendChild(resultadoDiv);
  }

  resultadoDiv.innerHTML = `
    <h3>Factura generada por el SENA</h3>
    <p><strong>Cliente:</strong> ${nombre}</p>
    <p>Equipos: ${equipos}</p>
    <p>Días Iniciales: ${diasIni}</p>
    <p>Días Adicionales: ${diasExtra}</p>
    <p>Servicio: ${tipo}</p>
    <hr>
    <strong>Total a Pagar: $${totalFinal.toLocaleString()}</strong>
    `;
}

//Se uso I.A(Gemini) para corregir errores y estructurar el código de manera más clara, además de agregar validaciones para asegurar que el número de equipos sea al menos 2 y manejar casos donde los días adicionales no sean proporcionados.