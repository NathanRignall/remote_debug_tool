import Button from "../../components/Button";
import Badge from "../../components/Badge";

const StatusBox = (props) => {
  const { tunnelConnected, socketConnected } = props;

  return (
    <div className="inline-block">
      <div className="flex items-center">
        <div className="pr-5 inline-block">
          {tunnelConnected ? (
            <Badge className="bg-green-600">Tunnel</Badge>
          ) : (
            <Badge className="bg-red-600">Tunnel</Badge>
          )}
        </div>
        <div className="pr-5 inline-block">
          {tunnelConnected ? (
            <Badge className="bg-green-600">Socket</Badge>
          ) : (
            <Badge className="bg-red-600">Socket</Badge>
          )}
        </div>

        <div>
          {true ? (
            <Button className="bg-gray-600 text-gray-300">Reset</Button>
          ) : (
            <Button className="bg-red-600 text-white">Error</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { StatusBox };
