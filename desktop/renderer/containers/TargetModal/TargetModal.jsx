import { useState, useEffect } from "react";

import Modal, { Header, Body, Footer } from "../../components/Modal";
import Button from "../../components/Button";

const TargetModal = (props) => {
  // contain the state of the modal
  const [show, setShow] = useState(false);

  // set the state of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className="bg-blue-600 text-white">
        Add
      </Button>

      {show ? (
        <Modal>
          <Header>Add Connection</Header>

          <div className="px-10 py-4">
            <Body>
              <input
                type="text"
                className="form-input w-full px-4 py-2 mt-2 rounded-lg text-gray-300 bg-gray-800 "
              />
              <input
                type="text"
                className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
              />
              <input
                type="text"
                className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
              />
            </Body>

            <Footer>
              <Button
                onClick={handleClose}
                className="bg-gray-300 text-gray-900"
              >
                Close
              </Button>
              <Button className="bg-green-600 text-white">Save</Button>
            </Footer>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export { TargetModal };
