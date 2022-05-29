import ElectronStore from "electron-store";

const schema = {
  conenctions: {
    type: "array",
    default: [],
    items: [
      {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          host: {
            type: "string",
          },
          user: {
            type: "string",
          },
        },
        required: ["id", "name", "host", "user"],
      },
    ],
  },
  settings: {
    type: "object",
    properties: {
      dark_mode: {
        type: "boolean",
        default: true,
      },
    },
    required: ["dark_mode"],
  },
};

const store = new ElectronStore({ schema });

export default function dataHandler(event, data) {
  const action = data.action;
  const payload = data.payload;

  switch (action) {
    case "get-connections":
      event.sender.send("data", {
        action: "get-connections",
        message: "success",
        payload: store.get("connections"),
      });
      break;

    case "get-connection":
    // get details on a specific connection

    case "get-settings":
      event.sender.send("data", {
        action: "get-settings",
        message: "success",
        payload: store.get("settings"),
      });
      break;

    case "set-settings":

    default:
      event.sender.send("data", {
        action: "error",
        message: "invalid data",
      });
  }
}
