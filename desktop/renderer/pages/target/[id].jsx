import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { io } from "socket.io-client";

import Button from "../../components/Button";
import Header from "../../components/Header";
import StatusBox from "../../containers/StatusBox";

export default function Target() {
  const router = useRouter();
  const { id } = router.query;

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header>
          <div className="grow bg-gray-700 py-3">
            {id}{" "}
            {socket ? (socket.connected ? "connected" : "not connected") : null}
          </div>

          <div>
            <StatusBox
              tunnelConnected={false}
              socketConnected={
                socket ? (socket.connected ? true : false) : false
              }
            />{" "}
            <Button className="bg-gray-300 text-gray-900">GDB</Button>{" "}
            <Link href="/home">
              <div className="inline-block">
                <Button className="bg-blue-600 text-white">Back</Button>
              </div>
            </Link>
          </div>
        </Header>

        <div className="grow flex flex-col mx-2 my-3">
          <div className="w-full p-2 "></div>
          <div className="grow w-full p-2 min-h-[15rem]">
            <div className="h-full bg-gray-800 text-gray-200 p-5 rounded-lg">
              SOME DATA HERE
            </div>
          </div>

          <div className="grow w-full p-2 min-h-[15rem]">
            <div className="h-full bg-gray-800 text-gray-200 p-5 rounded-lg">
              SOME DATA HERE
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
