import React, { Component } from "react";
import CheckoutSummery from "./../../Components/Order/CheckoutSummery/CheckoutSummery";
import { Route, Redirect } from "react-router-dom";
import ContactInfo from "../Forms/ContactInfo/ContactInfo";
import { connect } from "react-redux";

class Checkout extends Component {
  cancelOrderHandler = () => {
    this.props.history.goBack("/");
  };

  buyOrderHandler = () => {
    this.props.history.replace("/checkout/contact-info");
  };

  render() {
    let checkoutSummery = <Redirect to="/" />;

    if (this.props.ings) {
      const purchased = this.props.purchased ? <Redirect to="/" /> : null;
      checkoutSummery = (
        <div>
          {purchased}
          <CheckoutSummery
            onCancel={this.cancelOrderHandler}
            onBuy={this.buyOrderHandler}
            ingredients={this.props.ings}
          />
          <Route
            path={this.props.match.path + "/contact-info"}
            component={ContactInfo}
          />
        </div>
      );
    }

    return checkoutSummery;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
