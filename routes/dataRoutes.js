module.exports = function (app) {
    const ThermalData = require('../controller/dataController');


    app.route('/realTimeData').get(ThermalData.getData);
    app.route('/LastData').get(ThermalData.getLastData);

    app.route('/putThermalData').put(ThermalData.putThermalData)
    // app.put('/putThermalData', ThermalData.putThermalData);

  };
  