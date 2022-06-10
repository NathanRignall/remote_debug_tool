import { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { io } from "socket.io-client";

import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Header from "../../components/Header";
import StatusBox from "../../containers/StatusBox";
import PasswordModal from "../../containers/PasswordModal";
import SerialContainer from "../../containers/SerialContainer";
import PowerButton from "../../containers/PowerButton";

// Whole application component
const Main = (props) => {
  // get the component props and expand the vars
  const { children, socket, index, name, host, port, user } = props;

  // hook to contain all packets that have arrived
  const [packets, setPackets] = useState([]);

  // when the socket is set init the liseners
  useEffect(() => {
    const serialListener = (packet) => {
      setPackets((oldArray) => [...oldArray, packet]);
    };

    if (socket) {
      socket.on("serial", serialListener);
    }

    // if the socket changes close the listener
    return () => {
      if (socket) {
        socket.off("serial", serialListener);
      }
    };
  }, [socket]);

  // hook to state of the GDB info box is open or not
  const [GDBInfo, setGDBInfo] = useState(false);

  // toggle the GDB info box open and close
  const toggleGDBInfo = () => {
    setGDBInfo(!GDBInfo);
    console.log("toggle gdb!");
  };

  // hook to state if the GDB info box is open or not
  const [GDBState, setGDBState] = useState(false);

  // set the state of the GDB
  const handleStart = () => setGDBState(true);
  const handleStop = () => setGDBState(false);

  return (
    <>
      <Head>
        <title>Remote Debug</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="h-screen flex flex-col">
        {/* Page header */}
        <Header>
          {/* Title */}
          <div className="grow bg-gray-700 text-xl font-bold my-auto">
            {name}
          </div>

          {/* Action Buttons */}
          <div>
            <StatusBox
              tunnelConnected={false}
              socketConnected={
                socket ? (socket.connected ? true : false) : false
              }
            />{" "}
            <PowerButton />{" "}
            <div className="inline-block">
              <Button
                onClick={toggleGDBInfo}
                className={
                  GDBInfo
                    ? "bg-gray-300 text-gray-900"
                    : "bg-gray-600 text-gray-300"
                }
              >
                GDB Info
              </Button>
            </div>{" "}
            <Link href="/home">
              <div className="inline-block">
                <Button className="bg-blue-600 text-white">Back</Button>
              </div>
            </Link>
          </div>
        </Header>

        {/* Page Body */}
        <div className="gow flex h-full p-2">
          {/* Serial boxes */}
          <div className="grow flex flex-col ">
            <SerialContainer packets={packets} port="ttyACM0" />

            <SerialContainer packets={packets} port="ttyACM1" />
          </div>

          {/* GDB info box only open if button pressed */}
          {GDBInfo ? (
            <div className="w-96">
              {/* test gdb window */}
              <div className="w-full p-2 h-full ">
                <div className="h-full bg-gray-800 text-gray-200 rounded-lg relative p-5 text-center flex flex-col">
                  <div className="text-center text-xl font-bold">
                    GDB Info <Badge className="bg-green-600">Running</Badge>
                  </div>

                  <div className="grow p-5 my-4 rounded-lg bg-gray-900">
                    Data from console
                  </div>

                  <div>
                    <div className="inline-block">
                      <Button onClick={handleStart} className={GDBState ? "bg-gray-600 text-gray-300" : "bg-green-600 text-white"}>Start</Button>
                    </div>{" "}
                    <div className="inline-block">
                      <Button onClick={handleStop} className={GDBState ? "bg-red-600 text-white" : "bg-gray-600 text-gray-300"}>
                        Stop
                      </Button>
                    </div>{" "}
                    <div className="inline-block">
                      <Button className="bg-gray-600 text-gray-300">
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {children}
      </div>
    </>
  );
};

// Target application page
export default function Target() {
  // get the page url for target id
  const router = useRouter();
  const { id } = router.query;

  // hook to contain the details of the currently open target
  const [target, setTarget] = useState(null);

  // hook to contain the connection status
  const [connected, setConnected] = useState(false);

  // when the target id changes reload
  useEffect(() => {
    reloadTarget();
  }, [id]);

  // send command to backend to refresh target info
  const reloadTarget = () => {
    setTarget(ipcRenderer.sendSync("target-get-id", { index: id }));
    setConnected(ipcRenderer.sendSync("ssh-web-connect-status", { index: id }));
  };

  // hook to contain the websocket
  const [socket, setSocket] = useState(null);

  // load the websocket
  useEffect(() => {
    const newSocket = io(`http://localhost:3080`);
    setSocket(newSocket);

    newSocket.on("connect_failed", function () {
      console.log("Sorry, there seems to be an issue with the connection!");
    });

    return () => newSocket.close();
  }, [setSocket]);

  return (
    <>
      <Main socket={socket} {...target}>
        {/* only show the password modal if not connected */}
        {connected ? null : (
          <PasswordModal setConnected={setConnected} index={id} {...target} />
        )}
      </Main>
    </>
  );
}
