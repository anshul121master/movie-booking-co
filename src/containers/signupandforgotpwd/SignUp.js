import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiPhoneNumber from "material-ui-phone-number";
import { signup } from "../../utils/api";
import  Password  from "./Password"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        MovieBooking
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
});

class SignUp extends Component {
  state = {
    redirectToSignin: false,
    firstName: "",
    lastName: "",
    phone: "",
    fnameIsValid: true,
    lnameIsValid: true,
    email: "",
    // phoneIsValid:false,
    birthday: "",
    password: "",
  //  confirmPassword: "",
    passwordIsValid: true,
    confirmPasswordIsValid: true,
  };

  passwordsAreValid = (password, passwordIsValid, confirmPasswordIsValid) =>{
    this.setState({
        password,
        passwordIsValid,
        confirmPasswordIsValid
    })
  }

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
//   validatePassword = (event) => {
//     let pwd = event.target.value;
//     if (
//       !(
//         pwd.length >= 6 &&
//         (pwd.includes("@") || pwd.includes("$") || pwd.includes("#"))
//       )
//     )
//       this.setState({
//         password: pwd,
//         confirmPassword: "",
//         passwordIsValid: false,
//         confirmPasswordIsValid: true,
//       });
//     else
//       this.setState({
//         password: pwd,
//         confirmPassword: "",
//         passwordIsValid: true,
//         confirmPasswordIsValid: true,
//       });
//   };

//   validateConfirmPassword = (event) => {
//     const cpwd = event.target.value;
//     const { password } = this.state;
//     if (cpwd !== password)
//       this.setState({
//         confirmPassword: cpwd,
//         confirmPasswordIsValid: false,
//       });
//     else
//       this.setState({
//         confirmPassword: cpwd,
//         confirmPasswordIsValid: true,
//       });
//   };

//   clearConfirmPwd = () => {
//     this.setState({
//       confirmPassword: "",
//     });
//   };

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
      console.log("all fields contains valid inputs");
      let userInfo = {
        email,
        name: `${firstName} ${lastName}`,
        password,
        phoneNumber: phone,
        dateOfBirth: birthday,
      };
      signup(userInfo).then((res) => {
        if (res === "success")
          this.setState({
            redirectToLogin: true,
          });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      fnameIsValid,
      lnameIsValid,
    //   passwordIsValid,
    //   confirmPasswordIsValid,
    //   confirmPassword,
      // password,
      redirectToSignin,
    } = this.state;

    //if(redirectToSignin) return <Redirect to="/signin" />

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
              <Password passwordsAreValid={this.passwordsAreValid}/>
             {/* <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={passwordIsValid ? false : true}
                  helperText={
                    passwordIsValid
                      ? ""
                      : "Password should be min 6 characters long and must include atleast one special character (@, $, #)"
                  }
                  onChange={this.validatePassword}
                  //onFocus={this.clearConfirmPwd}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  autoComplete="current-password"
                  disabled={
                    password === "" ? true : passwordIsValid ? false : true
                  }
                  error={confirmPasswordIsValid ? false : true}
                  helperText={
                    confirmPasswordIsValid
                      ? ""
                      : "Password do not Match. Please check."
                  }
                  onChange={this.validateConfirmPassword}
                />
                </Grid> */}
            
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
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
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
