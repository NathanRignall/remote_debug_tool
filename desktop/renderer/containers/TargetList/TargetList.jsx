import Link from "next/link";

import Button from "../../components/Button";
import ListItem from "../../components/ListItem";
import TargetModal from "../TargetModal";

const TargetEntry = (props) => {
  return (
    <ListItem>
      <div className="flex-grow">
        <div className="text-xl text-gray-200">{props.name}</div>
        <div className="text-md text-blue-500">
          {props.host} - {props.user} - {props.index}
        </div>
      </div>

      <div>
        <TargetModal
          reloadTargets={props.reloadTargets}
          edit={true}
          {...props}
        />
        <Link href={`/target/${props.index}`}>
          <div className="inline-block">
            <Button className="bg-green-600 text-white">Connect</Button>
          </div>
        </Link>
      </div>
    </ListItem>
  );
};

const TargetList = (props) => {
  // get the component props and expand the vars
  const { reloadTargets, targets } = props;

  // map each target to UI
  const ListTargets = targets.map((target, index) => {
    return (
      <TargetEntry reloadTargets={reloadTargets} key={index} index={index} {...target} />
    );
  });

  return <> {ListTargets} </>;
};

export { TargetList };
