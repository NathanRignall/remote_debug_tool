import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { useEffect, useState, useRef } from "react";

const SerialContainer = (props) => {
  // get the component props and expand the vars
  const { packets, port } = props;

  // hook to contain the state of the scroll functionalty
  const [autoScroll, setAutoScroll] = useState(true);

  // toggle between the auto scroll states
  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  // hook to contain the state of the data arrival icon
  const [arrival, setArrival] = useState(false);

  // hook to contain the packets that are to be displayed
  const [displayed, setDisplayed] = useState([]);

  // reference for the auto scroll functionality
  const serialEndRef = useRef(null);

  // function to scroll to reference
  const scrollToBottom = () => {
    serialEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  // when the packets update go through each packet and add to displayed packet
  useEffect(() => {
    const tempDisplayed = [];

    packets.map((packet) => {
      // only add packet that is specified
      if (packet.port == port) {
        tempDisplayed.push(packet);
      }
    });

    if (tempDisplayed.length != displayed.length) {
      setDisplayed(tempDisplayed);
      setArrival(!arrival);
    }
  }, [packets]);

  // when the displayed packets changes auto scroll
  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [displayed]);

  return (
    <div className="grow w-full p-2 min-h-[15rem]">
      <div className="h-full bg-gray-800 text-gray-200 rounded-lg relative overflow-hidden">
        {/* Arrival status icon */}
        {arrival ? (
          <div className="absolute h-7 w-7 rounded-full bg-green-600 top-6 right-[15.5rem] z-20" />
        ) : null}

        {/* Packets to display */}
        <div className="absolute top-0 bottom-0 left-0 right-0 p-5 overflow-hidden overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-600 ">
          {displayed.map((packet) => (
            <div key={packet.uuid}>
              <span>{packet.data}</span>
            </div>
          ))}
          <div ref={serialEndRef} />
        </div>

        {/* Auto scroll icon */}
        <div
          onClick={toggleAutoScroll}
          className={`${
            autoScroll
              ? "bg-blue-600 text-gray-100"
              : "bg-gray-900 text-gray-100"
          } absolute px-3 py-1 rounded-lg top-5 right-7 border-2 cursor-pointer`}
        >
          Auto Scroll
        </div>

        {/* Port name */}
        <div className="bg-gray-900 absolute px-3 py-1 rounded-full top-5 right-36 border-2 ">{props.port}</div>
      </div>
    </div>
  );
};

export { SerialContainer };
