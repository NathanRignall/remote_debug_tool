import { app, ipcMain } from "electron";
import serve from "electron-serve";
import Store from "electron-store";
import { createWindow } from "./helpers";

import tunnel from "tunnel-ssh";

let web_tunnel;
let web_tunnel_last = -1;
let gdb_tunnel;
let gdb_tunnel_last = -1;

const store = new Store({ name: "targets" });

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  if (web_tunnel) {
    web_tunnel.close();
  }

  // if (gdb_tunnel) {
  //   gdb_tunnel.close();
  // }

  app.quit();

});

/// 


ipcMain.on("target-get", (event, arg) => {
  event.returnValue = store.get("targets") || [];
});

ipcMain.on("target-get-id", (event, arg) => {
  const targets = store.get("targets") || [];
  event.returnValue = targets[arg.index];
});

ipcMain.on("target-add", (event, arg) => {
  const targets = store.get("targets") || [];
  targets.push(arg);
  store.set("targets", targets);
});

ipcMain.on("target-edit", (event, arg) => {
  const targets = store.get("targets") || [];
  targets[arg.index] = arg;
  store.set("targets", targets);
});

ipcMain.on("target-delete", (event, arg) => {
  const targets = store.get("targets") || [];
  targets.splice(arg.index, 1)
  store.set("targets", targets);
});

ipcMain.on("ssh-web-connect", (event, arg) => {
  const host = arg.host;
  const port = arg.port;
  const user = arg.user;
  const password = arg.password;
  const index = arg.index;

  web_tunnel_last = index;

  if (web_tunnel) {
    console.log("web RESET");
    web_tunnel.close();
  }

  web_tunnel = tunnel(
    {
      host: host,
      username: user,
      password: password,
      port: port,
      dstHost: '127.0.0.1',
      dstPort: 4000,
      localHost: '127.0.0.1',
      localPort: 3080,
      keepAlive: true,
    },
    (error, server) => {

      if (error) {
        console.log(error);
        event.sender.send("ssh-web-error", { error: error.level });
      } else {
        console.log("web success");
        event.sender.send("ssh-web-connect-success");
      }
    }
  );

  web_tunnel.on("error", (error) => {
    console.log(error.level);
    if (error.level == "client-authentication") {
      web_tunnel_last = -1;
    }
    event.sender.send("ssh-web-error", { error: error.level });
  });


});

ipcMain.on("ssh-web-connect-status", (event, arg) => {
  const index = arg.index;

  if (web_tunnel_last == index) {
    event.returnValue = web_tunnel ? true : false;
  } else {
    event.returnValue = false;
  }

});

ipcMain.on("ssh-gdb-connect", (event, arg) => {
  const host = arg.host;
  const port = arg.port;
  const gdbPort = arg.gdbPort;
  const user = arg.user;
  const password = arg.password;
  const index = arg.index;

  gdb_tunnel_last = index;

  if (gdb_tunnel) {
    console.log("RESET");
    gdb_tunnel.close();
  }

  gdb_tunnel = tunnel(
    {
      host: host,
      username: user,
      password: password,
      port: port,
      dstHost: '127.0.0.1',
      dstPort: gdbPort,
      localHost: '127.0.0.1',
      localPort: 3333,
      keepAlive: true,
    },
    (error, server) => {

      if (error) {
        console.log(error);
        event.sender.send("ssh-gdb-error", { error: error.level });
      } else {
        console.log("gdb success");
        event.sender.send("ssh-gdb-connect-success");
      }
    }
  );

  gdb_tunnel.on("error", (error) => {
    console.log(error.level);
    if (error.level == "client-authentication") {
      web_tunnel_last = -1;
    }
    event.sender.send("ssh-gdb-error", { error: error.level });
  });


});

ipcMain.on("ssh-gdb-connect-status", (event, arg) => {
  const index = arg.index;

  if (web_tunnel_last == index) {
    event.returnValue = gdb_tunnel ? true : false;
  } else {
    event.returnValue = false;
  }

});
