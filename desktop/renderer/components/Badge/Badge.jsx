const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Badge = (props) => {
  const { children, className } = props;

  return (
    <div
      onClick={props.onClick}
      className={classNames(
        "inline-block px-2 py-1 rounded-full cursor-pointer text-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Badge };
