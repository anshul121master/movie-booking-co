import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, authedUser, selectedMovie, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authedUser !== null ? (
        authedUser.response !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

function mapStateToProps({ authedUser, selectedMovie }, ownProps) {
  return {
    ...ownProps,
    authedUser,
    selectedMovie
  };
}

export default connect(mapStateToProps)(ProtectedRoute);
