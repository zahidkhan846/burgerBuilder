import React, { Component } from "react";
import Aux from "../../HOC/Auxiliary/Auxiliary";
import Burger from "./../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Model from "../../UserInterface/Model/Model";
import OrderSummary from "./../../Components/Burger/OrderSummary/OrderSummary";
import AxiosInstance from "./../../AxiosInstance/InstanceOrder";
import Spinner from "./../../UserInterface/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchasableHandler = (ingredients) => {
    const ingValueSum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((ingValueSum, el) => {
        return ingValueSum + el;
      }, 0);
    return ingValueSum > 0;
  };

  onPuchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/signup");
    }
  };

  orderCloseHandler = () => {
    this.setState({ purchasing: false });
  };

  orderContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    let disableButton = { ...this.props.ings };
    for (let key in disableButton) {
      disableButton[key] = disableButton[key] <= 0;
    }
    let disableAddButton = { ...this.props.ings };
    for (let key in disableAddButton) {
      disableAddButton[key] = disableAddButton[key] >= 3;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <div style={{ alignItems: "center", fontSize: "30px" }}>
        <p>
          Sorry! We are currently having problems in updating "Ingredients",
          Please try later!
        </p>
      </div>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            isAuth={this.props.isAuthenticated}
            addIngredients={this.props.addIngredient}
            removeIngredients={this.props.removeIngredient}
            disableBtn={disableButton}
            disableAddBtn={disableAddButton}
            price={this.props.price}
            onPurchase={this.onPuchaseHandler}
            purchasable={this.purchasableHandler(this.props.ings)}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          continueOrder={this.orderContinueHandler}
          cancelOrder={this.orderCloseHandler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Model show={this.state.purchasing} closeModel={this.orderCloseHandler}>
          {orderSummary}
        </Model>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ing) => dispatch(actions.addIngredient(ing)),
    removeIngredient: (ing) => dispatch(actions.removeIngredient(ing)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseBurgerInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, AxiosInstance));
