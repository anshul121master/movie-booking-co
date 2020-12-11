import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiPhoneNumber from "material-ui-phone-number";
import { signup } from "../../utils/api";
import Password from "./Password";
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorColor: {
    color: "red",
  },
});

class SignUp extends Component {
  state = {
    redirectTologin: false,
    firstName: "",
    lastName: "",
    phone: "",
    fnameIsValid: true,
    lnameIsValid: true,
    email: "",
    // phoneIsValid:false,
    birthday: "",
    password: "",
    passwordIsValid: true,
    confirmPasswordIsValid: true,
    loading: false,
    responseOnSuccess: "",
    responseOnError: "",
  };

  passwordsAreValid = (password, passwordIsValid, confirmPasswordIsValid) => {
    this.setState({
      password,
      passwordIsValid,
      confirmPasswordIsValid,
    });
  };

  validateName = (event) => {
    const field = event.target.name;
    const name = event.target.value;
    if (field === "firstName") {
      if (!(name.match(/^[A-Za-z]+$/) || name === ""))
        this.setState({
          firstName: name,
          fnameIsValid: false,
        });
      else
        this.setState({
          firstName: name,
          fnameIsValid: true,
        });
    } else {
      if (!(name.match(/^[A-Za-z]+$/) || name === ""))
        this.setState({
          lastName: name,
          lnameIsValid: false,
        });
      else
        this.setState({
          lastName: name,
          lnameIsValid: true,
        });
    }
  };

  //   validatePhone = (event) => {
  //     const phone = event.target.value;
  //     console.log(phone.length)  //15 for india
  //   };

  setBirthday = (event) => {
    const birthday = event.target.value;
    this.setState({
      birthday,
    });
  };

  setEmail = (event) => {
    const email = event.target.value;
    this.setState({
      email,
    });
  };

  setPhone = (event) => {
    const phone = event.target.value;
    this.setState({
      phone,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit clicked");
    const {
      firstName,
      lastName,
      fnameIsValid,
      lnameIsValid,
      email,
      phone,
      birthday,
      password,
      passwordIsValid,
      confirmPasswordIsValid,
    } = this.state;
    if (
      fnameIsValid === true &&
      lnameIsValid === true &&
      passwordIsValid === true &&
      confirmPasswordIsValid === true
    ) {
      console.log("all fields contain valid inputs");
      this.setState({
        loading: true,
      });
      //setting payload
      let userInfo = {
        email,
        name: `${firstName} ${lastName}`,
        password,
        phoneNumber: phone,
        dateOfBirth: birthday,
      };
      signup(userInfo).then((res) => {
        if (res.status === 200)
          this.setState({
            loading: false,
            responseOnError: "",
            responseOnSuccess: res.response,
            redirectToLogin: true,
          });
        else
          this.setState({
            loading: false,
            responseOnError: res.exception.errorMsg,
          });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      fnameIsValid,
      lnameIsValid,
      loading,
      redirectToLogin,
      responseOnSuccess,
      responseOnError,
    } = this.state;

    if (redirectToLogin)
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { responseOnSuccess },
          }}
        />
      );

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {responseOnError !== "" && (
            <Typography className={classes.errorColor}>
              {responseOnError}
            </Typography>
          )}

          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={fnameIsValid ? false : true}
                  helperText={
                    fnameIsValid ? "" : "Should contain only alphabets"
                  }
                  onBlur={this.validateName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  error={lnameIsValid ? false : true}
                  helperText={
                    lnameIsValid ? "" : "Should contain only alphabets"
                  }
                  onBlur={this.validateName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onBlur={this.setEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  defaultCountry={"in"}
                  autoComplete="phone"
                  onBlur={this.setPhone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="date"
                  label="Birthday"
                  name="date"
                  type="date"
                  autoComplete="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={this.setBirthday}
                />
              </Grid>
            </Grid>
            <Password passwordsAreValid={this.passwordsAreValid} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>

            {loading && (
              <Grid container spacing={5} justify="center">
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            )}
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(SignUp);
