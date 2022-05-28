import { useState } from "react";

const Background = () => (
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-70 z-10"></div>
);

const ModalBody = (props) => (
  <div className="min-h-[8rem]">{props.children}</div>
);

const ModalHeader = (props) => (
  <div className="bg-gray-800 px-10 py-6 text-2xl">{props.children}</div>
);

const ModalFooter = (props) => (
  <div className="flex justify-end mt-4">
    <div
      className="inline-block px-8 py-3 cursor-pointer rounded-lg bg-gray-300 text-gray-900 mr-2"
      onClick={props.handleClose}
    >
      Close
    </div>

    <div
      className="inline-block px-8 py-3 cursor-pointer rounded-lg bg-green-600"
      onClick={props.handleSave}
    >
      {props.save}
    </div>
  </div>
);

const SystemModal = (props) => {
  // contain the state of the modal
  const [show, setShow] = useState(false);

  // set the state of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow} {...props}>{props.button}</button>

      {show ? (
        <>
          <Background />
          <div className="fixed top-0 bottom-0 left-0 right-0 z-20 ">
            <div class="max-w-3xl mx-auto">
              <div className="flex h-screen items-center">
                <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
                  <ModalHeader>{props.title}</ModalHeader>

                  <div className="px-10 py-4">
                    <ModalBody>{props.children}</ModalBody>
                    <ModalFooter handleClose={handleClose} save={props.save}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SystemModal;
