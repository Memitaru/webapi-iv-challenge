const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// built in middleware
server.use(express.json());

// third party middleware
server.use(helmet());
server.use(morgan('dev'));

// custom middleware

server.use(typeLogger);
server.use(addName);
// server.use(lockout);
// server.use(moodyGatekeeper);

server.use((req, res, next) => {
  // asynchronous call to an external weather api
  // attach info to the req object
  next();
})

// router
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function typeLogger(req, res, next){
  console.log(`${req.method} Request`)
  next();
}

function addName(req, res, next) {
  req.name = req.name || "Cassandra";
  next();
}

function lockout(req, res, next) {
  res.status(403).json({message: 'API lockout!'})
}

function moodyGatekeeper(req, res, next) {
  // it keeps you out 1/3 of the time
  // when it decides to keep you out it sends back a 403 message: "you shall not pass"
  const chance = Math.random();
  if (chance <= .3){
    res.status(403).json({message: 'you shall not pass'})
  } else {
    next();
  }
}

// we want this imediately before our export
server.use((err, req, res, next)=>{
  res.status(500).json({
    message: "Bad panda",
    err
  })
})

module.exports = server;
