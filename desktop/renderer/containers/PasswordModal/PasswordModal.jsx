import { ipcRenderer } from "electron";
import Link from "next/link";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Modal, { Header, Body, Footer } from "../../components/Modal";
import Button from "../../components/Button";

// form schema for validation
const TargetSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
});

const PasswordModal = (props) => {
  // get the component props and expand the vars
  const { setConnected, index, name, host, port, user } = props;

  return (
    <div className="inline-block">
      <Modal>
        <Header>Enter Password</Header>

        {/* Main Form */}
        <Formik
          initialValues={{
            password: "",
          }}
          validationSchema={TargetSchema}
          onSubmit={(values) => {
            // send the connection details to the server to start the tunnel
            ipcRenderer.send("ssh-web-connect", {
              host: host,
              port: port,
              user: user,
              password: values.password,
              index: index,
            });
            
            // update the application state
            setConnected(true);
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <div className="px-10 py-4">
              <Body>
                {/* Password feild */}
                <Form>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-input w-full px-4 py-2  mt-2  rounded-lg text-gray-300 bg-gray-800 "
                  />

                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </Form>
              </Body>

              <Footer>
                {/* Close Button */}
                <Link href="/home">
                  <div className="inline-block">
                    <Button className="bg-gray-300 text-gray-900 mr-2">
                      Cancel
                    </Button>
                  </div>
                </Link>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white"
                >
                  Connect
                </Button>
              </Footer>
            </div>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export { PasswordModal };
