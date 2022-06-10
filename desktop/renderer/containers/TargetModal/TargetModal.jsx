import { useState } from "react";
import { ipcRenderer } from "electron";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Modal, { Header, Body, Footer } from "../../components/Modal";
import Button from "../../components/Button";

// form schema for validation
const TargetSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  host: Yup.string().min(3, "Too Short!").required("Required"),
  port: Yup.number().required().positive().integer(),
  user: Yup.string().required("Required"),
});

const TargetModal = (props) => {
  // get the component props and expand the vars
  const { reloadTargets, edit, index, name, host, port, user } = props;

  // hook to contain the state of the modal
  const [show, setShow] = useState(false);

  // set the state of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // send request to the server to delete the
  const handleDelete = () => {
    ipcRenderer.send("target-delete", {
      index: index,
    });

    reloadTargets();
    handleClose();
  };

  return (
    <div className="inline-block">
      {/* Modal open button */}
      <Button onClick={handleShow} className="bg-blue-600 text-white mr-2">
        {edit ? "Edit" : "Add"}
      </Button>

      {/* Actually display the modal component */}
      {show ? (
        <Modal>
          <Header>{edit ? "Edit" : "Add"} Connection</Header>

          {/* Main Form */}
          <Formik
            initialValues={{
              name: name ? name : "",
              host: host ? host : "",
              port: port ? port : 22,
              user: user ? user : "",
            }}
            validationSchema={TargetSchema}
            onSubmit={(values) => {
              // check if edit or add mode
              if (edit === false) {
                // send the details to the server to add the target
                ipcRenderer.send("target-add", {
                  name: values.name,
                  host: values.host,
                  port: values.port,
                  user: values.user,
                });
              } else {
                // send the details to the server to edit the target
                ipcRenderer.send("target-edit", {
                  name: values.name,
                  host: values.host,
                  port: values.port,
                  user: values.user,
                  index: index,
                });
              }

              // update the targets on screen
              reloadTargets();
              handleClose();
            }}
          >
            {({ errors, touched, handleSubmit }) => (
              <div className="px-10 py-4">
                <Body>
                  <Form>
                    {/* Name Feild */}
                    <Field
                      name="name"
                      placeholder="Name"
                      className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
                    />

                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}

                    {/* Host Feild */}
                    <Field
                      name="host"
                      placeholder="Host"
                      className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
                    />

                    {errors.host && touched.host ? (
                      <div>{errors.host}</div>
                    ) : null}

                    {/* Port Feild */}
                    <Field
                      name="port"
                      type="number"
                      placeholder="Port"
                      className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
                    />

                    {errors.port && touched.port ? (
                      <div>{errors.port}</div>
                    ) : null}

                    {/* User Feild */}
                    <Field
                      name="user"
                      placeholder="user"
                      className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
                    />

                    {errors.user && touched.user ? (
                      <div>{errors.user}</div>
                    ) : null}
                  </Form>
                </Body>

                <Footer>
                  {/* Close Button */}
                  <Button
                    onClick={handleClose}
                    className="bg-gray-300 text-gray-900 mr-2"
                  >
                    Close
                  </Button>

                  {/* Delete Button */}
                  {edit ? (
                    <Button
                      onClick={handleDelete}
                      className="bg-red-600 text-white mr-2"
                    >
                      Delete
                    </Button>
                  ) : null}

                  {/* Save Button */}
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white"
                  >
                    Save
                  </Button>
                </Footer>
              </div>
            )}
          </Formik>
        </Modal>
      ) : null}
    </div>
  );
};

export { TargetModal };
