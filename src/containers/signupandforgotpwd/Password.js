import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default class Password extends Component {
  state = {
    password: "",
    confirmPassword: "",
    passwordIsValid: true,
    confirmPasswordIsValid: true,
  };

  validatePassword = (event) => {
    let pwd = event.target.value;
    if (
      !(
        pwd === "" ||
        pwd.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/
        )
      )
    ) {
      this.props.passwordsAreValid(pwd, false, true);
      this.setState({
        password: pwd,
        confirmPassword: "",
        passwordIsValid: false,
        confirmPasswordIsValid: true,
      });
    } else {
      this.props.passwordsAreValid(pwd, true, true);
      this.setState({
        password: pwd,
        confirmPassword: "",
        passwordIsValid: true,
        confirmPasswordIsValid: true,
      });
    }
  };

  validateConfirmPassword = (event) => {
    const cpwd = event.target.value;
    const { password } = this.state;
    if (cpwd !== password) {
      this.props.passwordsAreValid(
        this.state.password,
        this.state.passwordIsValid,
        false
      );
      this.setState({
        confirmPassword: cpwd,
        confirmPasswordIsValid: false,
      });
    } else {
      this.props.passwordsAreValid(
        this.state.password,
        this.state.passwordIsValid,
        true
      );
      this.setState({
        confirmPassword: cpwd,
        confirmPasswordIsValid: true,
      });
    }
  };

  render() {
    const {
      passwordIsValid,
      confirmPasswordIsValid,
      confirmPassword,
      password,
    } = this.state;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label={this.props.label}
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordIsValid ? false : true}
            helperText={
              passwordIsValid
                ? ""
                : "*Password should be min 8 characters long, must contain atleast one uppercase letter, one lowercase letter, one number and one special character."
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
            disabled={password === "" ? true : passwordIsValid ? false : true}
            error={confirmPasswordIsValid ? false : true}
            helperText={
              confirmPasswordIsValid
                ? ""
                : "Password do not Match. Please check."
            }
            onChange={this.validateConfirmPassword}
          />
        </Grid>
      </Grid>
    );
  }
}
