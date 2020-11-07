import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Model from "../../UserInterface/Model/Model";

const initialState = {
  error: null,
};

const withErrorHandler = (WrappedComponent, AxiosInstance) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        ...initialState,
      };
    }

    componentDidMount() {
      this.reqInteceptors = AxiosInstance.interceptors.request.use(
        (request) => {
          this.setState({ error: null });
          return request;
        }
      );

      this.resInteceptors = AxiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      AxiosInstance.interceptors.request.eject(this.reqInteceptors);
      AxiosInstance.interceptors.response.eject(this.resInteceptors);
    }

    closeErrorMessageHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Model
            show={this.state.error}
            closeModel={this.closeErrorMessageHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
