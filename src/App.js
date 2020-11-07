import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Layout from "./HOC/Layout/Layout";
import Logout from "./Containers/Authentication/Logout/Logout";
import asyncComponent from "./HOC/LazyLoading/asyncComponent";
import * as actions from "./Store/Actions/index";

const SecureCheckout = asyncComponent(() => {
  return import("./Containers/Checkout/Checkout");
});
const SecureOrders = asyncComponent(() => {
  return import("./Containers/Orders/Orders");
});
const SecureAuth = asyncComponent(() => {
  return import("./Containers/Authentication/SignupForm");
});

class App extends Component {
  componentDidMount() {
    this.props.checkAuthStatus();
  }

  render() {
    let Routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/signup" component={SecureAuth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      Routes = (
        <Switch>
          <Route path="/checkout" component={SecureCheckout} />
          <Route path="/orders" component={SecureOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={SecureAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{Routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthStatus: () => dispatch(actions.checkAuthExpState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
