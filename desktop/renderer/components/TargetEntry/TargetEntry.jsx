import ConnectButton from "../ConnectButton";

const TargetEntry = (props) => {
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
          <ConnectButton id={props.id}/>
        </div>
      </div>
    </div>
  );
};

export default TargetEntry;
