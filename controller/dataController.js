const ThermalData = require('../model/dataModel.js');

exports.getData = function (request, response) {
  console.log("Get Real Time Data");
  ThermalData.getData(function (error, ThermalData) {
    if (error) {
      console.log("Error in getData:", error); // Add this line
      response.status(500).send(error);
    } else {
      // console.log("Machine Data:", ThermalData);
      response.json(ThermalData);
    }
  });
};

//GET LAST DATA
exports.getLastData = function (request, response) {
  console.log("Get LAST Real Time Data");
  ThermalData.getLastData(function (error, ThermalData) {
    if (error) {
      console.log("Error in getLastData:", error); // Add this line
      response.status(500).send(error);
    } else {
      // console.log("Machine Data:", ThermalData);
      response.json(ThermalData);
    }
  });
};

//PUT request for thermal data
exports.putThermalData = function (req, res) {
  let data = req.body; // Assuming data is sent in the body of the PUT request
  console.log("Data received in controller:", data);

  ThermalData.putThermalData(data, function (error, result) {
      if (error) {
          res.status(500).send(error); // Send error response
      } else {
          res.json(result); // Send success response
      }
  });
};



// exports.putThermalData = function (req, res) {
//   let data = req.query; // Assuming data is sent via query parameters
//   console.log("Data received in controller:", data);

//   ThermalData.putThermalData(data, function (error, result) {
//       if (error) {
//           res.status(500).send(error); // Send error response
//       } else {
//           res.json(result); // Send success response
//       }
//   });
// };


// exports.putThermalData = function (request, response) {
// 	let Dato = request.query
// 	// console.log("Dato: ", Dato)
// 	// console.log("Put Data")

// 	ThermalData.putThermalData(Dato, function (error, ThermalData) {

// 		if (error) {
// 			response.send(error);
// 		} else {
// 			response.json(ThermalData);
// 		}
// 	});
// };

// exports.putThermalData = function (request, response) {
//   console.log("Put Data");

//   // Handle parameters from both query string and request body
//   let Dato = {
//     id: request.body.id || request.query.id,
//     timestamp: request.body.timestamp || request.query.timestamp,
//     data: request.body.data || request.query.data
//   };
  
//   console.log("Received Data: ", Dato); // Ensure data is being received correctly

//   Cammera.putThermalData(Dato, function (error, ThermalData) {
//     if (error) {
//       response.send(error);
//     } else {
//       response.json(ThermalData);
//     }
//   });
// };