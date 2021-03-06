import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { handleAuthedUser } from "../../store/actions/authedUser";
import { Redirect } from "react-router-dom";
import Loader from "../../shared-components/Loader";
import { header } from "../../theme";
import Footer from "../../shared-components/footer/Footer";
import Header from "../../shared-components/header/Header";

const styles = (theme) => ({
  textInput: {
    borderColor: "red",
  },
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "red",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: header,
    height: 45,
    borderRadius: 0,
  },
  errorColor: {
    color: "red",
  },
  infoMsg: {
    backgroundColor: "#BDE5F8",
    color: "#00529B",
    padding: 6,
    borderLeft: "5px solid blue",
    marginTop: 10,
  },
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    showErrorMessage: false,
  };

  handleChange = (event) => {
    if (event.target.name === "email") {
      let email = event.target.value;
      this.setState({
        email,
      });
    } else {
      let password = event.target.value;
      this.setState({
        password,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { dispatch } = this.props;
    const userCredentials = {
      email,
      password,
    };
    dispatch(handleAuthedUser(userCredentials));
    this.setState({
      showErrorMessage: true,
    });
  };

  render() {
    const {
      classes,
      loading,
      authedUser,
      location,
      selectedMovie,
    } = this.props;
    const { email, password, showErrorMessage } = this.state;

    if (authedUser !== null && authedUser.exception === null) {
      if (location.state === undefined || location.state.from === undefined)
        return <Redirect to="/" />;
      else {
        const { from } = location.state;
        if (
          from.pathname === "/purchase" &&
          Object.keys(selectedMovie).length === 0
        )
          return <Redirect to="/" />;
        return <Redirect to={from} />;
      }
    }
    return (
      <div>
        <Header />
        <Container
          style={{ backgroundColor: "white", marginTop: 30, marginBottom: 30 }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          {loading && <Loader />}
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            {location.state !== undefined &&
              location.state.responseOnSuccess !== undefined && (
                <Typography className={classes.infoMsg}>
                  {location.state.responseOnSuccess}
                </Typography>
              )}

            {location.state !== undefined &&
              location.state.from !== undefined &&
              location.state.from.pathname === "/purchase" && (
                <Typography className={classes.infoMsg}>
                  Please Signin before proceeding to purchase.
                </Typography>
              )}

            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                className={classes.textInput}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />

              {authedUser !== null &&
                authedUser.exception !== null &&
                showErrorMessage && (
                  <Typography className={classes.errorColor}>
                    {authedUser.exception.errorMsg}
                  </Typography>
                )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>

              <Grid container style={{ marginBottom: 30 }}>
                <Grid item xs>
                  <Link
                    style={{ textDecoration: "none", color: header }}
                    to={{
                      pathname: "/forgotPassword",
                      state: { 
                        from: location.state === undefined ? "/" : location.state.from
                      },
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    style={{ textDecoration: "none", color: header }}
                    to={{
                      pathname: "/signup",
                      state: { 
                        from: location.state === undefined ? "/" : location.state.from
                      },
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ loading, authedUser, selectedMovie }, ownProps) {
  return {
    loading,
    authedUser,
    selectedMovie,
  };
}

export default compose(withStyles(styles), connect(mapStateToProps))(SignIn);
