const Background = () => (
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-70 z-10"></div>
);

const Body = (props) => <div className="min-h-[8rem]">{props.children}</div>;

const Header = (props) => (
  <div className="bg-gray-800 px-10 py-6 text-2xl">{props.children}</div>
);

const Footer = (props) => (
  <div className="flex justify-end mt-4">{props.children}</div>
);

const Modal = (props) => {
  const { children, close } = props;

  return (
    <div>
      <Background onClick={close}/>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-20 ">
        <div class="max-w-3xl mx-auto">
          <div className="flex h-screen items-center">
            <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal, Body, Header, Footer };
