function CalcularFactura() {
  function validarNombre(nombre) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nombre);
  }

  const PRECIO_BASE_DIA = 35000;
  const nombre = document.getElementById('nombre').value;
  const equipos = parseInt(document.getElementById('numero_equipos').value);
  const diasIni = parseInt(document.getElementById('numero_dias_iniciales').value);
  const diasExtra = parseInt(document.getElementById('numero_dias_adicionales').value) || 0;
  const tipo = document.getElementById('tipo_servicio').value; 
  const telefonoInput = document.getElementById("telefono").value;
  const correo = document.getElementById('email').value;

  if (isNaN(diasIni) || diasIni <= 0) {
    alert("Error: Los días iniciales deben ser un número válido y mayor a 0.");
    return;
  }

  if (equipos < 2 || isNaN(equipos)) {
    alert("Error: Debe alquilar al menos 2 equipos para generar la factura.");
    return;
  }

  if (!validarNombre(nombre)) {
    alert("Error: El nombre solo puede contener letras y espacios.");
    return;
  }

  if (!telefonoInput || isNaN(telefonoInput) || telefonoInput.trim() === '') {
    alert("Error: El teléfono debe contener solo números.");
    return;
  }

  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexCorreo.test(correo)) {
    alert("Error: Debe ingresar un correo electrónico válido");
    return; 
  }

  let subtotalBase = equipos * diasIni * PRECIO_BASE_DIA;
  let recargoDiasExtra = 0;

  if (diasExtra > 0) {
    recargoDiasExtra = equipos * diasExtra * (PRECIO_BASE_DIA * 1.10);
  }

  let totalParcial = subtotalBase + recargoDiasExtra;
  let ajusteServicio = 0;

  if (tipo === "Fuera de la ciudad") {
    ajusteServicio = totalParcial * 0.05;
  } else if (tipo === "Dentro del establecimiento") {
    ajusteServicio = -(totalParcial * 0.10);
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
    <strong>Total a Pagar: $${Math.round(totalFinal).toLocaleString()}</strong>
  `;
} 

//Se uso I.A(Gemini) para corregir errores y estructurar el código de manera más clara, además de agregar validaciones para asegurar que el número de equipos sea al menos 2 y manejar casos donde los días adicionales no sean proporcionados.
