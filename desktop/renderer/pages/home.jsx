import electron from "electron";
import React from "react";

const ipcRenderer = electron.ipcRenderer || false;

const Target = (props) => {
  return (
    <div className="w-full px-8 py-4 bg-gray-800 rounded-md align-middle mt-4">
      <div className="flex">
        <div className="flex-grow">
          <div className="text-xl text-gray-200">{props.name}</div>
          <div className="text-md text-blue-500">
            {props.host} - {props.user}
          </div>
        </div>

        <div>
          <button className="bg-green-600 text-white font-bold display-inline px-8 py-3 rounded-lg">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

function Home() {
  const targets = [
    {
      name: "Test 1",
      host: "localhost",
      user: "pi",
    },
    {
      name: "Test 2",
      host: "10.18.0.1",
      user: "admin",
    },
    {
      name: "Admin PC",
      host: "nathanrignall.uk",
      user: "user",
    },
    {
      name: "Raspberry pi",
      host: "192.168.3.10",
      user: "pi",
    },
  ];

  // get list async fromn the backend

  const ListTargets = targets.map((target, index) => (
    <Target key={index} {...target} />
  ));



  return (
    <>
      <div className="w-full bg-gray-700 px-12 py-6 text-gray-100 text-2xl text-bold">
        Remote Debug Tool{" "}
      
      </div>

      <div className="max-w-xl mx-auto">{ListTargets}</div>
    </>
  );
}

export default Home;
