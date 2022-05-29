import { useState, useEffect } from "react";
import Link from "next/link";

import Button from "../../components/Button";
import ListItem from "../../components/ListItem";

const TargetEntry = (props) => {
  return (
    <ListItem>
      <div className="flex-grow">
        <div className="text-xl text-gray-200">{props.name}</div>
        <div className="text-md text-blue-500">
          {props.host} - {props.user}
        </div>
      </div>

      <div>
        <Link href={`/target/${props.id}`}>
          <Button className="bg-green-600 text-white">Test</Button>
        </Link>
      </div>
    </ListItem>
  );
};

const TargetList = (props) => {
  const [targets, setTargets] = useState([
    { name: "test2", host: "192.168.0.1", user: "pi" },
  ]);

  const ListTargets = targets.map((target, index) => (
    <TargetEntry key={index} {...target} />
  ));

  return <> {ListTargets} </>;
};

export { TargetList };
