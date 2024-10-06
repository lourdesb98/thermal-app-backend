// In your model file (dataModel.js)
'use strict';
const dbSettings = require('../dbconfig/db');
const sql = require('mssql');

var Cammera = function (cammera) { };

// GET ALL REAL TIME DATA
Cammera.getData = async function getData(result) {

  let dataRaw;

  try {
    const pool = await sql.connect(dbSettings);
    const respuesta = await pool.request().query(`SELECT id, [timestamp], [data], averageTemperatureC, highestTemperatureC
FROM falarmia.dbo.temperaturas ORDER BY [timestamp] DESC;`);
    dataRaw = respuesta.recordset;

    // console.log("SQL Query Result:", dataRaw); // Add this line
    result(null, dataRaw);
  } catch (error) {
    // console.log("SQL Query Error:", error); // Add this line
    result(null, error);
  }
};

//GET LAST RECORD
Cammera.getLastData = async function getLastData(result) {
  let dataRaw;

  try {
    const pool = await sql.connect(dbSettings);
    const respuesta = await pool.request().query(`
      SELECT TOP 1 id, [timestamp], [data], averageTemperatureC, highestTemperatureC
      FROM falarmia.dbo.temperaturas
      ORDER BY [timestamp] DESC;
    `);
    dataRaw = respuesta.recordset;

    result(null, dataRaw);
  } catch (error) {
    result(null, error);
  }
};


Cammera.putThermalData = async function putThermalData(Datos, result) {
  console.log("Received PUT request with data: ", Datos);
  const maxRetries = 3;
  let attempts = 0;
  let success = false;

  const sendData = async () => {
      try {
          const dataJsonString = JSON.stringify(Datos.thermalData);
          const averageTemperatureC = Datos.averageTemperatureC;
          const highestTemperatureC = Datos.highestTemperatureC;
          const pool = await sql.connect(dbSettings);

          // Call the stored procedure with new parameters
          const queryResult = await pool.request()
              .input('data', sql.NVarChar(sql.MAX), dataJsonString)
              .input('averageTemperatureC', sql.Float, averageTemperatureC)
              .input('highestTemperatureC', sql.Float, highestTemperatureC)
              .execute('PutThermalDataRT');

          console.log("Data successfully inserted into the database.");
          result(null, { message: "Data received and processed successfully." });
          success = true;
      } catch (error) {
          console.error('Error processing data:', error);
          if (attempts < maxRetries) {
              attempts++;
              console.log(`Retrying (${attempts}/${maxRetries})...`);
              await sendData(); // Retry sending data
          } else {
              result(error, null);
          }
      }
  };

  await sendData();
};


// Cammera.putThermalData = async function putThermalData(Datos, result) {
//   console.log("Received PUT request with data: ", Datos);
//   const maxRetries = 3;
//   let attempts = 0;
//   let success = false;

//   const sendData = async () => {
//       try {
//           const dataJsonString = JSON.stringify(Datos);
//           const pool = await sql.connect(dbSettings);
          
//           // Call the stored procedure
//           const queryResult = await pool.request()
//               .input('data', sql.NVarChar(sql.MAX), dataJsonString)
//               .execute('PutThermalDataRT');

//           console.log("Data successfully inserted into the database.");
//           result(null, { message: "Data received and processed successfully." });
//           success = true;
//       } catch (error) {
//           console.error('Error processing data:', error);
//           if (attempts < maxRetries) {
//               attempts++;
//               console.log(`Retrying (${attempts}/${maxRetries})...`);
//               await sendData(); // Retry sending data
//           } else {
//               result(error, null);
//           }
//       }
//   };

//   await sendData();
// };



//funciona
// Cammera.putThermalData = async function putThermalData(Datos, result) {
//   console.log("Received PUT request with data: ", Datos);
//   const maxRetries = 3;
//   let attempts = 0;
//   let success = false;

//   const sendData = async () => {
//       const timestamp = new Date(Datos.timestamp);
//       if (isNaN(timestamp)) {
//           throw new Error('Invalid timestamp format');
//       }

//       const dataJsonString = JSON.stringify(Datos.data);
//       const pool = await sql.connect(dbSettings);

//       try {
//           const queryResult = await pool.request()
//               .input('id', sql.Int, Datos.id)
//               .input('timestamp', sql.DateTime, timestamp)
//               .input('data', sql.NVarChar(sql.MAX), dataJsonString)
//               .execute('PutThermalDataRT');

//           console.log("Data successfully inserted into the database.");
//           result(null, { message: "Data received and processed successfully." });
//           success = true;
//       } catch (error) {
//           console.error('Error processing data:', error);
//           if (attempts < maxRetries) {
//               attempts++;
//               console.log(`Retrying (${attempts}/${maxRetries})...`);
//               await sendData(); // Retry sending data
//           } else {
//               result(error, null);
//           }
//       }
//   };

//   await sendData();
// };













module.exports = Cammera;
