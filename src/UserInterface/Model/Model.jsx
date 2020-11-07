import React, { Component } from "react";
import styles from "./Modal.module.css";
import Aux from "./../../HOC/Auxiliary/Auxiliary";
import Backdrop from "./../Backdrop/Backdrop";

class Model extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          closeBackdrop={this.props.closeModel}
        />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
          className={styles.Modal}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Model;
