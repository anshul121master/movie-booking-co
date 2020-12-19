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
import MuiPhoneNumber from "material-ui-phone-number";
import { signup } from "../../utils/api";
import Password from "./Password";
import { Redirect } from "react-router-dom";
import Loader from "../../shared-components/Loader"
import Header from "../../shared-components/header/Header"
import Footer from "../../shared-components/footer/Footer"
import { header } from "../../theme";

const styles = (theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorColor: {
    marginTop:20,
    color: "red",
  },
});

class SignUp extends Component {
  state = {
    redirectTologin: false,
    firstName: "",
    lastName: "",
    phone: "",
    phoneErrorMsg: false,
    fnameIsValid: true,
    lnameIsValid: true,
    email: "",
    phoneIsValid:true,
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

    validatePhone = (phone) => {
      console.log(phone)
      if(phone.substring(1,3) === '91' && phone.length === 15)
        this.setState({
          phone,
          phoneIsValid:true,
          phoneErrorMsg:false
        })
        else
          this.setState({
            phone,
             phoneIsValid:false,
             phoneErrorMsg:false
          })
    };

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

  // setPhone = (event) => {
  //   const phone = event.target.value;
  //   console.log(phone)
  //   this.setState({
  //     phone,
  //   });
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit clicked");
    const {
      firstName,
      lastName,
      fnameIsValid,
      lnameIsValid,
      phoneIsValid,
      email,
      phone,
      phoneErrorMsg,
      birthday,
      password,
      passwordIsValid,
      confirmPasswordIsValid,
    } = this.state;
    if (
      fnameIsValid === true &&
      lnameIsValid === true &&
      phoneIsValid === true &&
      phone !== "" &&
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
    }else{
      if(phone === "")
        this.setState({
          phoneErrorMsg: true
        })
    }
  };

  render() {
    const { classes } = this.props;
    const {
      fnameIsValid,
      lnameIsValid,
      phoneIsValid,
      loading,
      redirectToLogin,
      responseOnSuccess,
      responseOnError,
      phoneErrorMsg
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
      <div>
      <Header />
      <Container style={{backgroundColor:"white", marginTop:30, marginBottom:30}} component="main" maxWidth="xs">
        <CssBaseline />
        {loading && <Loader />}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

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
                 // onBlur={this.setPhone}
                  onlyCountries={['in']}
                  error={phoneIsValid ? false : true}
                  helperText={
                    phoneIsValid ? "" : "Must begin with +91 and should be 10 digits in length."
                  }
                  onChange={this.validatePhone}

                />
              </Grid>
              {phoneErrorMsg && <Typography style={{color:"red", fontSize:"0.8rem"}}>Please enter a valid Phone number.</Typography>}
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

            {responseOnError !== "" && (
              <Typography className={classes.errorColor}>
                {responseOnError}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>

            <Grid container justify="flex-end" style={{marginBottom:20}}>
              <Grid item>
                <Link to="/login" style={{ textDecoration: "none", color: header }}>
                  Already have an account? Sign in
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

export default withStyles(styles)(SignUp);
