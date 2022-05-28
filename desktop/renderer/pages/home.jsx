import electron from "electron";
import React from "react";
import SystemModal from "../components/SystemModal/SystemModal";

import TargetEntry from "../components/TargetEntry";

const ipcRenderer = electron.ipcRenderer || false;

function Home() {
  const targets = [
    {
      id: "abc1234",
      name: "Test 1",
      host: "localhost",
      user: "pi",
    },
    {
      id: "def1234",
      name: "Test 2",
      host: "10.18.0.1",
      user: "admin",
    },
    {
      id: "abc5678",
      name: "Admin PC",
      host: "nathanrignall.uk",
      user: "user",
    },
    {
      id: "def5678",
      name: "Raspberry pi",
      host: "192.168.3.10",
      user: "pi",
    },
  ];

  const ListTargets = targets.map((target, index) => (
    <TargetEntry key={index} {...target} />
  ));

  const onClickWithIpc = () => {
    ipcRenderer.send("ssh", {
      action: "connect",
      payload: {
        host: "10.18.5.10",
        username: "pi",
        password: "raspberry",
        port: "22",
      },
    });
  };

  return (
    <>
      <div className="w-full bg-gray-700 px-12 py-6 text-gray-100 text-2xl text-bold">
        Remote Debug Tool
      </div>

      <div className="max-w-xl mx-auto">{ListTargets}</div>

      <div className="fixed bottom-5 right-5">
        <SystemModal
          className="bg-blue-600 inline-block px-8 py-3 rounded-lg cursor-pointer"
          button="Add"
          title="Add Connection"
          save="Add"
        >
          Add Connection Body
        </SystemModal>{" "}
        <SystemModal
          className="bg-gray-600 inline-block px-8 py-3 rounded-lg cursor-pointer"
          button="Settings"
          title="Settings"
          save="Save"
        >
          Settings Body
        </SystemModal>
      </div>
{/* 
      <button onClick={onClickWithIpc}>TEST SSH</button> */}
    </>
  );
}

export default Home;
