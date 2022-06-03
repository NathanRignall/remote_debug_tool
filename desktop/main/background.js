import { app, ipcMain } from "electron";
import serve from "electron-serve";
import Store from "electron-store";
import { createWindow } from "./helpers";

let web_tunnel;
let gdb_tunnel;

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
  app.quit();
});

const store = new Store({ name: "targets" });

ipcMain.on("target-get", (event, arg) => {
  event.returnValue = store.get("targets") || [];
});

ipcMain.on("target-add", (event, arg) => {
  const targets = store.get("targets") || [];
  targets.push(arg);
  store.set("targets", targets);
});

ipcMain.on("ssh-web-connect", (event, arg) => {
  const host = arg.host;
  const username = arg.username;
  const password = arg.password;
  const port = arg.port;

  web_tunnel = tunnel(
    {
      host: host,
      username: username,
      password: password,
      port: port,
      dstPort: 80,
      localPort: 3080,
      keepAlive: true,
    },
    (error, server) => {
      if (error) {
        event.sender.send("ssh-web-connect-error");
      } else {
        event.sender.send("ssh-web-connect-success");
      }
    }
  );

  web_tunnel.on("error", (error) => {
    event.sender.send("ssh-web-error");
  });
});

ipcMain.on("ssh-gdb-connect", (event, arg) => {
  const host = arg.host;
  const username = arg.username;
  const password = arg.password;
  const port = arg.port;
  const gdb = arg.gdb;

  gdb_tunnel = tunnel(
    {
      host: host,
      username: username,
      password: password,
      port: port,
      dstPort: gdb,
      localPort: 3000,
      keepAlive: true,
    },
    (error, server) => {
      if (error) {
        event.sender.send("ssh-gdb-connect-error");
      } else {
        event.sender.send("ssh-gdb-connect-success");
      }
    }
  );

  gdb_tunnel.on("error", (error) => {
    event.sender.send("ssh-gdb-error");
  });
});
