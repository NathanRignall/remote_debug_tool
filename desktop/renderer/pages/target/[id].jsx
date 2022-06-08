import { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import Link from "next/link";

import { io } from "socket.io-client";

import Button from "../../components/Button";
import Header from "../../components/Header";
import StatusBox from "../../containers/StatusBox";
import PasswordModal from "../../containers/PasswordModal";
import SerialContainer from "../../containers/SerialContainer";
import PowerButton from "../../containers/PowerButton";
import GDBPopOver from "../../containers/GDBPopOver";

const Main = (props) => {
  const { children, socket, index, name, host, port, user } = props;

  const [packets, setPackets] = useState([]);

  useEffect(() => {
    const serialListener = (packet) => {
      setPackets((oldArray) => [...oldArray, packet]);
    };

    if (socket) {
      socket.on("serial", serialListener);
    }

    return () => {
      if (socket) {
        socket.off("serial", serialListener);
      }
    };
  }, [socket]);

  const [GDBInfo, setGDBInfo] = useState(false);

  const handleCloseGDB = () => setGDBInfo(false);
  const handleShowGDB = () => setGDBInfo(true);

  const toggleGDBInfo = () => {
    setGDBInfo(!GDBInfo);
    console.log("toggle gdb!");
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header>
          <div className="grow bg-gray-700 text-xl font-bold my-auto">
            {name}{" "}
            {socket ? (socket.connected ? "connected" : "not connected") : null}
          </div>

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
                className={GDBInfo ? "bg-gray-300 text-gray-900" : "bg-gray-600 text-gray-300"}
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

        <div className="gow flex h-full p-2">
          <div className="grow flex flex-col ">
            <SerialContainer packets={packets} port="ttyACM0" />

            <SerialContainer packets={packets} port="ttyACM1" />
          </div>

          {GDBInfo ? (
            <div className="w-96">
              <div className="w-full p-2 h-full">
                <div className="h-full bg-gray-800 text-gray-200 rounded-lg relative p-5">
                  <div className="text-center text-xl font-bold">GDB Info</div>
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

export default function Target() {
  const router = useRouter();
  const { id } = router.query;

  const [target, setTarget] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    reloadTarget();
  }, [id]);

  const reloadTarget = () => {
    setTarget(ipcRenderer.sendSync("target-get-id", { index: id }));
    setConnected(ipcRenderer.sendSync("ssh-web-connect-status", { index: id }));
  };

  const [socket, setSocket] = useState(null);

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
        {connected ? null : (
          <PasswordModal setConnected={setConnected} index={id} {...target} />
        )}
      </Main>
    </>
  );
}
