const dbConfig = {
  user: 'sa',
  password: 'sa123',
  // server: 'localhost',  
  server: '192.168.140.1',  
  database: 'falarmia',
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
     
  },
};

module.exports = dbConfig
 


