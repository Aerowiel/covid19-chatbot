const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // cross-origin
  app.use(cors({
    origin : "*",
  }));

  // protection against vulnerabilities
  app.use(helmet());

  // encode args
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // routes
  require("./routes/covid.routes")(app);

  const server = http.createServer(app)

  server.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
