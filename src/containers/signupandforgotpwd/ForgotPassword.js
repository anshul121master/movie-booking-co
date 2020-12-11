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
import Password from "./Password";
import OtpInput from "react-otp-input";
import { sendOtp, resetPassword } from "../../utils/api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  otpBox: {
    minHeight: "50px",
    minWidth: "40px",
  },
  spacebetweenBoxes: {
    minWidth: "15px",
  },
  errorColor: {
    color: "red",
  },
  successColor: {
    color: "green",
  },
  cardStyle: {
    minWidth: 400,
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "green",
    color: "white",
    marginTop: 20,
    marginLeft: 30,
  },
  checkBoxIcon: {
    minWidth: 40,
    minHeight: 40,
    color: "green",
  },
});

class ForgotPassword extends Component {
  state = {
    email: "",
    otp: "",
    otpErrorMsg: "",
    emailDisabled: false,
    sendOtpOnSubmit: true,
    showNewPasswordPanel: false,
    password: "",
    passwordIsValid: true,
    confirmPasswordIsValid: true,
    redirectToLogin: false,
    passwordChangeSuccess: "",
    passwordChangeFailed: "",
    loading: false,
  };

  passwordsAreValid = (password, passwordIsValid, confirmPasswordIsValid) => {
    this.setState({
      password,
      passwordIsValid,
      confirmPasswordIsValid,
    });
  };
  handleChange = (event) => {
    let email = event.target.value;
    this.setState({
      email,
    });
  };

  handleOtp = (otp) => {
    this.setState({
      otp,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { sendOtpOnSubmit, email } = this.state;
    if (sendOtpOnSubmit) {
      this.setState({
        loading: true,
      });
      const emailObj = {
        email,
      };
      sendOtp(emailObj).then((res) => {
        if (res.status === 200)
          this.setState({
            loading: false,
            otp: "",
            passwordChangeFailed: "",
            otpErrorMsg: "",
            emailDisabled: true,
            showNewPasswordPanel: true,
            sendOtpOnSubmit: false,
          });
        else
          this.setState({
            loading: false,
            passwordChangeFailed: "",
            otpErrorMsg: res.exception.errorMsg,
          });
      });
    } else {
      const {
        password,
        passwordIsValid,
        confirmPasswordIsValid,
        otp,
        email,
      } = this.state;
      const otpLength = otp.length;
      if (passwordIsValid && confirmPasswordIsValid && otpLength === 6) {
        this.setState({
          loading: true,
        });
        const pwdDetails = {
          username: email,
          password,
          code: otp,
        };
        resetPassword(pwdDetails).then((res) => {
          if (res.status === 200) {
            this.setState({
              loading: false,
              passwordChangeSuccess: res.response,
            });
          } else {
            if (res.status >= 400 && res.status <= 499)
              this.setState({
                loading: false,
                otp: "",
                passwordChangeFailed: res.exception.errorMsg,
              });
            else
              this.setState({
                loading: false,
                passwordChangeFailed: res.exception.errorMsg,
                emailDisabled: false,
                showNewPasswordPanel: false,
                sendOtpOnSubmit: true,
              });
          }
        });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      showNewPasswordPanel,
      emailDisabled,
      otp,
      otpErrorMsg,
      passwordChangeFailed,
      passwordChangeSuccess,
      loading,
    } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          {passwordChangeSuccess !== "" ? (
            <Card className={classes.cardStyle} variant="outlined">
              <CheckBoxIcon className={classes.checkBoxIcon} />
              <CardContent>
                <Typography className={classes.successColor}>
                  Password Changed Successfully
                </Typography>
                <CardActions>
                  <Link to="/login">
                    <Button size="medium" className={classes.loginButton}>
                      Proceed to login
                    </Button>
                  </Link>
                </CardActions>
              </CardContent>
            </Card>
          ) : (
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
                disabled={emailDisabled ? true : false}
              />

              {showNewPasswordPanel && (
                <div>
                  <Password passwordsAreValid={this.passwordsAreValid} />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        Please enter OTP sent to your registered email id.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <OtpInput
                        value={otp}
                        onChange={this.handleOtp}
                        numInputs={6}
                        separator={
                          <span className={classes.spacebetweenBoxes}>
                            <hr />
                          </span>
                        }
                        inputStyle={classes.otpBox}
                        isInputNum={true}
                      />
                    </Grid>
                  </Grid>
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {showNewPasswordPanel ? "Change Password" : "Send OTP"}
              </Button>

              {loading && (
                <Grid container spacing={5} justify="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              )}

              {otpErrorMsg !== "" && (
                <Typography className={classes.errorColor}>
                  {otpErrorMsg}
                </Typography>
              )}
              {passwordChangeFailed !== "" && (
                <Typography className={classes.errorColor}>
                  {passwordChangeFailed}
                </Typography>
              )}

              <Grid container>
                <Grid item xs>
                  <Link to="/login">
                    Proceed to login
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(ForgotPassword);
