const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Button = (props) => {
  const { children, className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(
        "inline-block px-8 py-3 rounded-lg cursor-pointer font-bold ",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Button };
