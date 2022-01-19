import React, { Component } from "react";
import { connect } from "react-redux";
import Carousel from "./Carousel";

/**
 * COMPONENT
 */
export class Home extends Component {
  render() {
    const { email } = this.props;

    return (
      <div className="container mt-3">
        <div className="row mt-1">
          {this.props.email ? (
            <h5>Welcome! You are logged in as: {email}.</h5>
          ) : null}
        </div>
        <div className="row mt-1">
          <Carousel />
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.auth.email,
  };
};

export default connect(mapState)(Home);
