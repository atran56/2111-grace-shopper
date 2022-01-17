import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllSuperheroes from "./components/AllSuperheroes";
import Cart from "./components/Cart";
import EditSuperhero from "./components/EditSuperhero";

import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Confirmation from "./components/Confirmation";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
            <Route path="/cart" component={Cart} />
            <Route exact path="/superheroes" component={AllSuperheroes} />
            <Route
              exact
              path="/superheroes/:id/edit"
              component={EditSuperhero}
            />
            <Route exact path="/confirmation" component={Confirmation} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/superheroes" component={AllSuperheroes} />
            <Route exact path="/confirmation" component={Confirmation} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
