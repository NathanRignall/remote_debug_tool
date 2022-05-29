const Header = (props) => {
  const { children } = props;

  return <div className="w-full flex bg-gray-700 py-3 px-6">{children} </div>;
};

export { Header };
