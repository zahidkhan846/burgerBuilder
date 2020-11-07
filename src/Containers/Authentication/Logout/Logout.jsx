import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/auth";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
