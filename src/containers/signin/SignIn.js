import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { handleAuthedUser } from "../../store/actions/authedUser";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import Copyright from '../../shared-components/Copyright'


const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  },
  errorColor: {
    color: "red",
  },
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
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
  };

  render() {
    const { classes, loading, authedUser, location } = this.props;
    const { email, password } = this.state;

    if (authedUser !== null && authedUser.exception === null) {
      if (location.state === undefined) return <Redirect to="/" />;
      else if(location.state.from === undefined) return <Redirect to="/" />;
      else{
        const { from } = location.state;
        return <Redirect to={from} />;
      }
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {authedUser !== null && authedUser.exception !== null && (
            <Typography className={classes.errorColor}>
              {authedUser.exception.errorMsg}
            </Typography>
          )}

          {location.state !== undefined &&
            location.state.responseOnSuccess !== undefined && (
              <Typography>{location.state.responseOnSuccess}</Typography>
            )}

          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

            {loading && (
              <Grid container spacing={5} justify="center">
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            )}

            <Grid container>
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

function mapStateToProps({ loading, authedUser }, ownProps) {
  return {
    loading,
    authedUser,
  };
}

export default compose(withStyles(styles), connect(mapStateToProps))(SignIn);
