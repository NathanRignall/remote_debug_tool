const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const socketio = require("socket.io");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const port_array = [];
const serial_array = [];

SerialPort.list().then(
  (ports) => ports.forEach((port, index) => {
    console.log(port.path)
    port_array[index] = new SerialPort(port.path, { baudRate: 115200 });
    serial_array[index] = port_array[index].pipe(new Readline({ delimiter: "\n" }));
    serial_array[index].on("data", (data) => {
      let packet = {
        uuid: uuidv4(),
        data: data,
        port: path.basename(port.path),
      }
      io.emit("serial", packet);
    });
  }),
  (err) => console.log(err)
);

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
