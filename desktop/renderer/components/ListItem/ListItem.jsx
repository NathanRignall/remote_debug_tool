const ListItem = (props) => {
  const { children } = props;

  return (
    <div className="w-full px-8 py-4 bg-gray-800 rounded-md align-middle mt-4">
      <div className="flex">{children}</div>
    </div>
  );
};

export { ListItem };
