import React, { useState } from 'react';
import './CrcSimulador.css';

export const CrcSimulador = () => {
  const [datos, setDatos] = useState('');
  const [patron, setPatron] = useState('');
  const [crcEncontrado, setCrcEncontrado] = useState(null);
  const [mensajeFinal, setMensajeFinal] = useState('');
  const [valorHex, setValorHex] = useState('');
  const [resultado, setResultado] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Función para realizar la operación XOR entre dos cadenas binarias
  const xor = (a, b) => {
    let resultado = '';
    for (let i = 1; i < b.length; i++) {
      resultado += a[i] === b[i] ? '0' : '1';
    }
    console.log(resultado);
    return resultado;

  };

  // Función para realizar la división binaria y obtener el CRC
  const mod2div = (dividendo, divisor) => {
    let pick = divisor.length;
    let tmp = dividendo.slice(0, pick);
    
    while (pick < dividendo.length) {
      if (tmp[0] === '1') {
        tmp = xor(divisor, tmp) + dividendo[pick];
      } else {
        tmp = xor('0'.repeat(divisor.length), tmp) + dividendo[pick];
      }
      pick += 1;
    }

    if (tmp[0] === '1') {
      tmp = xor(divisor, tmp);
    } else {
      tmp = xor('0'.repeat(divisor.length), tmp);
    }
    // console.log(tmp);
    return tmp;
  };

  // Función para calcular el CRC
  const calcularCRC = () => {
    if (!datos || !patron ) {
      setMensaje('Por favor ingresa datos válidos y un patrón generador');
      return;
    }

    const datosExtendidos = datos + '0'.repeat(patron.length - 1);
    const crc = mod2div(datosExtendidos, patron);
    const mensajeConCRC = datos + crc;
    console.log('Datos:' + datos);
    console.log('Datos Extendidos:' + datosExtendidos);
    console.log('CRC:' + crc);
    console.log('Mensaje con CRC:' + mensajeConCRC);

    setCrcEncontrado(crc);
    setMensajeFinal(mensajeConCRC);
    setValorHex(parseInt(mensajeConCRC, 2).toString(16).toUpperCase());
    setResultado(0); // Resultado 0 indica éxito
    setMensaje('Mensaje Ok :)');
  };

  // Función para validar el mensaje con CRC
  const validarCRC = () => {
    const validacionCRC = mod2div(mensajeFinal, patron);
    console.log('Validación CRC: ' + validacionCRC);
    
    if (parseInt(validacionCRC) === 0) {
      setResultado(0);
      setMensaje('Mensaje Ok :)');
    } else {
      setResultado(1);
      setMensaje('Error en el mensaje :(');
    }
  };

  const limpiarResultado = () => {
    setDatos('');
    setPatron('');
    setCrcEncontrado(null);
    setMensajeFinal('');
    setValorHex('');
    setResultado('');
    setMensaje('');
  }
  return (
    <div className="crc-simulador">
      <h1>Simulador CRC</h1>
      <div className="grupo-entrada">
        <label>Datos a enviar</label>
        <input 
          type="text" 
          value={datos} 
          onChange={(e) => setDatos(e.target.value)} 
          placeholder="Ingresa los datos (Binario)" 
        />
      </div>

      <div className="grupo-entrada">
        <label>Patrón generador</label>
        <input 
          type="text" 
          value={patron} 
          onChange={(e) => setPatron(e.target.value)} 
          placeholder="Ingresa el patrón (Binario)" 
        />
      </div>

      <div className="grupo-botones">
        <button onClick={calcularCRC}>GENERAR</button>
        <button onClick={validarCRC}>VALIDAR</button>
        <button onClick={limpiarResultado}>LIMPIAR</button>
      </div>

      <div className="resultado">
        <p>CRC Encontrado: {crcEncontrado}</p>
        <p>Mensaje Final: {mensajeFinal}</p>
        <p>Hexadecimal: {valorHex}</p>
        <p>Resultado: {resultado}</p>
        <p>Mensaje: {mensaje}</p>
      </div>
    </div>
  );
};

