const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const socketio = require("socket.io");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

SerialPort.list().then(
  (ports) => ports.forEach((port) => console.log(port.path)),
  (err) => console.log(err)
);

const port1 = new SerialPort("/dev/serial0", { baudRate: 115200 });
const port2 = new SerialPort("/dev/ttyACM0", { baudRate: 115200 });
const serial0 = port1.pipe(new Readline({ delimiter: "\n" }));
const serial1 = port2.pipe(new Readline({ delimiter: "\n" }));

serial0.on("data", function (data) {
  io.emit("serial0", {
    uuid: uuidv4(),
    data: data,
    port: "serial0",
  });
});

serial1.on("data", function (data) {
  io.emit("serial1", {
    uuid: uuidv4(),
    data: data,
    port: "ttyACM0",
  });
});

var app = express();

// set the cors allowed all
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));

var relayRouter = require("./routes/relay");

// Create the http server
const server = require("http").createServer(app);

// Create the Socket IO server on the top of http server
const io = socketio(server, {
  cors: {
    origin: "http://localhost:8888",
    methods: ["GET", "POST"],
  },
});

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/relay", relayRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// socket stuff
io.on("connection", (socket) => {
  console.log("a user connected");
});

module.exports = { app: app, server: server };
