const express = require('express');
const cors = require('cors');
const app = express();
let puerto = 3030;

app.use(cors());
app.use(express.json());

app.listen(puerto, function() {
  console.log("API ThermalCammera start at Port:" + puerto);
});

const routes_thermalcammera = require('./routes/dataRoutes');
routes_thermalcammera(app);

module.exports = app;
