import React, { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "./../../Components/NavigationBar/Toolbar/Toolbar";
import Aux from "../Auxiliary/Auxiliary";
import SideDrawer from "../../Components/NavigationBar/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };
  closeSideDrawerHandler = () => {
    this.setState({ showSidedrawer: false });
  };
  showSidedrawerHandler = () => {
    this.setState((prevState) => {
      return { showSidedrawer: !prevState.showSidedrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          showSide={this.showSidedrawerHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          showSidedrawer={this.state.showSidedrawer}
          closeSidedrawer={this.closeSideDrawerHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
