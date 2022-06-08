import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { useEffect, useState, useRef } from "react";

const SerialContainer = (props) => {
  const { packets, port } = props;

  const [autoScroll, setAutoScroll] = useState(true);

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  const [arrival, setArrival] = useState(false);

  const [displayed, setDisplayed] = useState([]);

  const serialEndRef = useRef(null);

  const scrollToBottom = () => {
    serialEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    const tempDisplayed = [];

    packets.map((packet) => {
      if (packet.port == port) {
        tempDisplayed.push(packet);
      }
    });

    if (tempDisplayed.length != displayed.length) {
      setDisplayed(tempDisplayed);
      setArrival(!arrival);
    }
  }, [packets]);

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [displayed]);

  return (
    <div className="grow w-full p-2 min-h-[15rem]">
      <div className="h-full bg-gray-800 text-gray-200 rounded-lg relative overflow-hidden">
        {arrival ? (
          <div className="absolute h-7 w-7 rounded-full bg-green-600 top-6 right-36 z-20" />
        ) : null}
        <div className="absolute top-0 bottom-0 left-0 right-0 p-5 overflow-hidden overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-600 ">
          {displayed.map((packet) => (
            <div key={packet.uuid}>
              <span>{packet.data}</span>
            </div>
          ))}
          <div ref={serialEndRef} />
        </div>

        <div
          onClick={toggleAutoScroll}
          className={`${autoScroll ? "bg-blue-600 text-gray-100" : "bg-gray-900 text-gray-100" } absolute px-3 py-1 rounded-full top-5 right-7 border-2 cursor-pointer`}
        >
          Auto Scroll
        </div>
      </div>
    </div>
  );
};

export { SerialContainer };
