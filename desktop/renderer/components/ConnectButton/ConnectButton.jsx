import Link from 'next/link';

const ConnectButton = (props) => {
  return (
    <Link href={`/target/${props.id}`}>
      <button className="bg-green-600 text-white font-bold display-inline px-8 py-3 rounded-lg">
        Connect
      </button>
    </Link>
  );
};

export default ConnectButton;
