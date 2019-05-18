import React, { Component, CSSProperties } from "react";
import { Spring, animated } from "react-spring/renderprops";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "./Header";
import "./Home.scss";

class Home extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <section className="signup-section">
        <Header />

        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Doesn't look like an email to me")
              .required("Sorry, but you need to fill this out")
          })}
        >
          {(formikProps: any) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit
            } = formikProps;
            return (
              <form onSubmit={handleSubmit}>
                <Spring
                  native
                  from={{ height: 0, opacity: 0 }}
                  to={{
                    height: 40,
                    opacity: 1
                  }}
                  delay={1000}
                >
                  {(SpringProps?: CSSProperties) => (
                    <animated.input
                      id="email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={SpringProps}
                      placeholder="your email"
                      autoFocus
                      className={errors.email && touched.email && "error"}
                    />
                  )}
                </Spring>

                <div className="input-feedback">{errors.email}</div>
              </form>
            );
          }}
        </Formik>
      </section>
    );
  }
}
export default Home;
