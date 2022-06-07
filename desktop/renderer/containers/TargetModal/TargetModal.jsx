import { useState, useEffect } from "react";
import { ipcRenderer } from "electron";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Modal, { Header, Body, Footer } from "../../components/Modal";
import Button from "../../components/Button";

const TargetSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  host: Yup.string().min(3, "Too Short!").required("Required"),
  port: Yup.number().required().positive().integer(),
  user: Yup.string().required("Required"),
});

const TargetModal = (props) => {
  // get props
  const { reloadTargets, edit, index, name, host, port, user } = props;

  // contain the state of the modal
  const [show, setShow] = useState(false);

  // set the state of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    ipcRenderer.send("target-delete", {
      index: index,
    });

    reloadTargets();
    handleClose();
  };

  return (
    <div className="inline-block">
      <Button onClick={handleShow} className="bg-blue-600 text-white mr-2">
        {edit ? "Edit" : "Add"}
      </Button>

      {show ? (
        <Modal>
          <Header>{edit ? "Edit" : "Add"} Connection</Header>

          <Formik
            initialValues={{
              name: name ? name : "",
              host: host ? host : "",
              port: port ? port : 22,
              user: user ? user : "",
            }}
            validationSchema={TargetSchema}
            onSubmit={(values) => {
              if (edit === false) {
                ipcRenderer.send("target-add", {
                  name: values.name,
                  host: values.host,
                  port: values.port,
                  user: values.user,
                });
              } else {
                ipcRenderer.send("target-edit", {
                  name: values.name,
                  host: values.host,
                  port: values.port,
                  user: values.user,
                  index: index,
                });
              }

              reloadTargets();
              handleClose();
            }}
          >
            {({ errors, touched, handleSubmit }) => (
              <div className="px-10 py-4">
                <Body>
                  <Form>
                    <Field
                      name="name"
                      placeholder="Name"
                      className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
                    />

                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}

                    <Field
                      name="host"
                      placeholder="Host"
                      className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
                    />

                    {errors.host && touched.host ? (
                      <div>{errors.host}</div>
                    ) : null}

                    <Field
                      name="port"
                      type="number"
                      placeholder="Port"
                      className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
                    />

                    {errors.port && touched.port ? (
                      <div>{errors.port}</div>
                    ) : null}

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
                  <Button
                    onClick={handleClose}
                    className="bg-gray-300 text-gray-900 mr-2"
                  >
                    Close
                  </Button>
                  {edit ? <Button
                    onClick={handleDelete}
                    className="bg-red-600 text-white mr-2"
                  >
                    Delete
                  </Button> : null}
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
