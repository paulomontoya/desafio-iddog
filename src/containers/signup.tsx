import "./signup.scss";
import React, { Component, CSSProperties } from "react";
import { Spring, animated } from "react-spring/renderprops";
import { Formik } from "formik";
import * as Yup from "yup";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { signup } from "../modules/user";
import Header from "../components/header";
import LoadingSpinner from "../components/loading-spinner";

export interface IProps {
  user: {
    isLoading: boolean;
    error?: string;
    token: any;
  };
  signup: Function;
}

class SignupPage extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <section className="signup-page">
        <Header />

        {this.props.user.error && (
          <div className="signup-error">
            The server returned an error :/ <br /> Please, try again later!
          </div>
        )}

        {this.props.user.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                this.props.signup(values.email);
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
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ user }: any) => ({
  user: {
    isLoading: user.isLoading,
    error: user.error,
    token: user.token
  }
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      signup
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
