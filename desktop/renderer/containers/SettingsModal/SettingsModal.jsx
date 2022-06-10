import { useState } from "react";

import Modal, { Header, Body, Footer } from "../../components/Modal";
import Button from "../../components/Button";

const SettingsModal = (props) => {
  // hook to contain the state of the modal
  const [show, setShow] = useState(false);

  // set the state of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="inline-block">
      {/* Modal open button */}
      <Button onClick={handleShow} className="bg-gray-600 text-gray-300">
        Settings
      </Button>

      {/* Actually display the modal component */}
      {show ? (
        <Modal>
          <Header>Test</Header>

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
              {/* Close Button */}
              <Button
                onClick={handleClose}
                className="bg-gray-300 text-gray-900"
              >
                Close
              </Button>
              {/* Submit Button */}
              <Button className="bg-green-600 text-white">Save</Button>
            </Footer>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export { SettingsModal };
