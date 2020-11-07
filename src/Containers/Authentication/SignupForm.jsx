import React, { Component } from "react";
import Input from "./../../Form/Input/Input";
import Button from "./../../UserInterface/Button/Button";
import styles from "./signupForm.module.css";
import * as actions from "../../Store/Actions/index";
import { connect } from "react-redux";
import Spinner from "./../../UserInterface/Spinner/Spinner";
import Aux from "./../../HOC/Auxiliary/Auxiliary";
import { Redirect } from "react-router-dom";
import { updatedObject, checkValidity } from "./../../Store/Utility/utility";

class SignupForm extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Your Email" },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: { type: "password", placeholder: "Your Password" },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  swithAuthenticationHandler = () => {
    this.setState({
      isSignUp: !this.state.isSignUp,
    });
  };

  submitFormHandler = (event) => {
    event.preventDefault();
    this.props.onSignup(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  changeInputHandler = (event, inputName) => {
    const controls = updatedObject(this.state.controls, {
      [inputName]: updatedObject(this.state.controls[inputName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[inputName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls });
  };

  render() {
    const signUpFormArray = [];
    for (let key in this.state.controls) {
      signUpFormArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = signUpFormArray.map((formElement) => (
      <Input
        changeInput={(event) => this.changeInputHandler(event, formElement.id)}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;

    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }

    let authenticated = null;
    if (this.props.isAuthenticated) {
      authenticated = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <Aux>
        {authenticated}
        <div className={styles.SignupForm}>
          <h4>Please! enter your information</h4>
          {errorMsg}
          <form onSubmit={this.submitFormHandler}>
            {form}
            <Button buttonType={"Success"}>SUBMIT</Button>
          </form>
          <Button
            onButtonClick={this.swithAuthenticationHandler}
            buttonType={"Danger"}
          >
            Swith to {this.state.isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    loading: state.auth.loading,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
