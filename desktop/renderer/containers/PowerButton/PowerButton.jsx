import { useEffect, useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";

import Button from "../../components/Button";

const fetcher = async (url) => {
  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await res;
    error.status = res.status;

    throw error;
  }

  return res.json();
};

const PowerButton = () => {
  const { data, error } = useSWR("http://localhost:3080/relay/1", fetcher);

  const [loading, setLoading] = useState(true);

  const [power, setPower] = useState(0);

  const togglePower = () => {
    if (power) {
      sendPower(1);
    } else {
      sendPower(0);
    }
    console.log("toggle power!")
  };

  const sendPower = (state) => {
    setLoading(true);

    // axios play track
    axios
      .post(
        "http://localhost:3080/relay/1",
        { state: state },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        mutate("http://localhost:3080/relay/1");
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (data) {
      setLoading(false);

      console.log("daata ;)")

      if (data.state == 0) {
        setPower(1);
      } else {
        setPower(0);
      }
    }
  }, [data]);

  return (
    <Button
      onClick={togglePower}
      className={
        power
          ? "bg-red-600 text-white w-48 text-center"
          : "bg-green-600 text-white  w-48 text-center"
      }
    >
      {power ? "Power Off" : "Power On"}{" "}
      {loading ? (
        <div className="inline-block align-middle">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : null}
    </Button>
  );
};

export { PowerButton };
