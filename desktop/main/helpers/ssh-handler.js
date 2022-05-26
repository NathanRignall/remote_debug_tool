
import tunnel from "tunnel-ssh";

let gdb_tunnel;

export default function sshHandler(event, data) {
  const action = data.action;
  const payload = data.payload;

  switch (action) {
    case "connect":
      const host = payload.host;
      const username = payload.username;
      const password = payload.password;
      const port = payload.port;

      gdb_tunnel = tunnel(
        {
          host: host,
          username: username,
          password: password,
          port: port,
          dstPort: 80,
          localPort: 27000,
          keepAlive: true,
        },
        (error, server) => {
          if (error) {
            console.log("connect-error");
            event.sender.send("ssh", {
              action: "connect-error",
              payload: {
                error: error,
              },
            });
          } else {
            console.log("connect-success");
            event.sender.send("ssh", {
              action: "connect-success",
              payload: {},
            });
          }
        }
      );

      gdb_tunnel.on("error", (error) => {
        console.log("error", error);
        event.sender.send("ssh", {
          action: "error",
          payload: {
            error: error,
          },
        });
      });

      break;
    case "end":
      gdb_tunnel.close();

      break;
    default:
  }

}
