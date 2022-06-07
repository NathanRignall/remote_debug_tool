import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { useEffect, useState, useRef } from "react";

const SerialContainer = (props) => {
  const { packets, port } = props;

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

  useEffect(scrollToBottom, [displayed]);

  return (
    <div className="grow w-full p-2 min-h-[15rem]">
      <div className="h-full bg-gray-800 text-gray-200 rounded-lg relative ">
        {arrival ? (
          <div className="absolute h-5 w-5 rounded-full bg-green-600 top-5 right-5" />
        ) : null}
        <div className="absolute top-0 bottom-0 left-0 right-0 p-5 overflow-hidden ">
          {displayed.map((packet) => (
            <div key={packet.uuid}>
              <span>{packet.data}</span>
            </div>
          ))}
          <div ref={serialEndRef} />
        </div>
      </div>
    </div>
  );
};

export { SerialContainer };
