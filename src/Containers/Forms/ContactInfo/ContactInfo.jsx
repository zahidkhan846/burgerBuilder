import React, { Component } from "react";
import styles from "../ContactInfo/ContactInfo.module.css";
import Button from "../../../UserInterface/Button/Button";
import Spinner from "../../../UserInterface/Spinner/Spinner";
import Input from "../../../Form/Input/Input";
import { connect } from "react-redux";
import * as orderAction from "../../../Store/Actions/index";
import withErrorHandler from "./../../../HOC/withErrorHandler/withErrorHandler";
import AxiosInstance from "./../../../AxiosInstance/InstanceOrder";
import { updatedObject, checkValidity } from "./../../../Store/Utility/utility";

class ContactInfo extends Component {
  state = {
    contactForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Name" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Street" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      pin: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your PIN" },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      phone: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Phone" },
        value: "",
        validation: {
          required: true,
          minLength: 10,
          maxLength: 10,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your CITY" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your eMail" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        value: "fastest",
        valid: false,
      },
    },
    loading: false,
    formIsValid: false,
  };

  changeInputHandler = (event, selectedId) => {
    const selectedElContactForm = updatedObject(
      this.state.contactForm[selectedId],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.contactForm[selectedId].validation
        ),
        touched: true,
      }
    );

    const contactForm = updatedObject(this.state.contactForm, {
      [selectedId]: selectedElContactForm,
    });

    let formIsValid = true;
    for (let selectedId in contactForm) {
      formIsValid = contactForm[selectedId].valid && formIsValid;
    }
    this.setState({ contactForm, formIsValid });
  };

  orderNowHandler = (event) => {
    event.preventDefault();
    const contactForm = {};
    for (let eachElement in this.state.contactForm) {
      contactForm[eachElement] = this.state.contactForm[eachElement].value;
    }
    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      orderData: contactForm,
      userId: this.props.userId,
    };
    this.props.onSubmitOrder(order, this.props.token);
  };

  render() {
    const contactFormArray = [];
    for (let key in this.state.contactForm) {
      contactFormArray.push({
        id: key,
        config: this.state.contactForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderNowHandler}>
        {contactFormArray.map((formElement) => {
          return (
            <Input
              changeInput={(event) =>
                this.changeInputHandler(event, formElement.id)
              }
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
            />
          );
        })}
        <Button disabled={!this.state.formIsValid} buttonType={"Success"}>
          Order Now
        </Button>
      </form>
    );
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <div className={styles.ContactInfo}>
        <h4>Please! enter your information</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitOrder: (orderData, token) =>
      dispatch(orderAction.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactInfo, AxiosInstance));
