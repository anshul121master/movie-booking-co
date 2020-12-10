import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiPhoneNumber from "material-ui-phone-number";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { getProfile } from "../../utils/api";
import { uploadImage } from "../../utils/api";
import { updateProfile } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Copyright from '../../shared-components/Copyright'
import { userProfilePhoto } from '../../config'

const styles = (theme) => ({
  profileInfoDiv: {
    width: "100vw",
    height: "30vh",
    backgroundColor: "grey",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "50px",
  },
  cardStyle: {
    minWidth: "70vw",
    boxShadow: "5px 10px 18px #888888",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
  profileImg: {
    width: "126px",
    height: "126px",
    border: "4px solid #0A79DF",
    borderRadius: "100px",
    padding: "2px",
    marginBottom: "5px",
  },
  userIcon: {
    color: "grey",
    border: "4px solid #0A79DF",
    borderRadius: "100px",
    marginBottom: "5px",
  },
  successMessageColor: {
    color: "green",
  },
  failedMessageColor: {
    color: "red",
  },
  loadingPanel: {
    minHeight: "100vh",
    minWidth: "100vw",
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

class Profile extends Component {
  state = {
    fnameIsValid: true,
    lnameIsValid: true,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthday: "",
    imageUrl: "",
    infoMessage: "",
    loadProfileMessage: "",
    imageUploadErrorMessage: "",
    loading: false,
  };

  componentDidMount() {
    getProfile().then((res) => {
      if (res.status === 200) {
        let userProfile = res.response;
        const birthday = this.formatDate(userProfile.dateOfBirth);
        this.setState({
          loadProfileMessage: "",
          firstName: userProfile.fullName.split(" ")[0],
          lastName: userProfile.fullName.split(" ")[1],
          email: userProfile.email,
          phone: userProfile.phoneNumber,
          birthday,
          imageUrl: userProfile.imageUrl,
        });
      } else {
        this.setState({
          loadProfileMessage: res.exception.errorMsg,
        });
      }
    });
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

  onImageUpload = (event) => {
    console.log("onImageupload called");
    const imageObj = event.target.files[0];
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("profilePhoto", imageObj);

    uploadImage(formData).then((res) => {
      if (res.status === 200) {
        const imageUrl = res.response.imageUrl;
        this.setState({
          imageUploadErrorMessage: "",
          imageUrl,
        });
      } else
        this.setState({
          imageUploadErrorMessage: res.exception.errorMsg,
        });
    });
  };

  formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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
      fnameIsValid,
      lnameIsValid,
      firstName,
      lastName,
      email,
      phone,
      birthday,
      imageUrl,
    } = this.state;
    if (fnameIsValid === true && lnameIsValid === true) {
      console.log("all fields contains valid inputs");
      this.setState({
        loading: true,
      });
      let userInfo = {
        fullName: `${firstName} ${lastName}`,
        email,
        phoneNumber: phone,
        dateOfBirth: birthday,
        imageUrl,
      };
      updateProfile(userInfo).then((res) => {
        if (res.status === 200)
          this.setState({
            infoMessage: "Profile Updated Successfully",
            loading: false,
          });
        else
          this.setState({
            infoMessage: res.exception.errorMsg,
            loading: false,
          });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      fnameIsValid,
      lnameIsValid,
      firstName,
      lastName,
      email,
      phone,
      birthday,
      imageUrl,
      infoMessage,
      imageUploadErrorMessage,
      loadProfileMessage,
      loading,
    } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid container justify="center">
          <Card className={classes.cardStyle} variant="outlined">
            <CardContent>
              <div className={classes.paper}>
                {loadProfileMessage !== "" && (
                  <Typography className={classes.failedMessageColor}>
                    {loadProfileMessage}
                  </Typography>
                )}
                {imageUrl === "" ? (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="9x"
                    className={classes.userIcon}
                  />
                ) : (
                  <img
                    src={userProfilePhoto+imageUrl}
                    alt="profile image"
                    className={classes.profileImg}
                  />
                )}
                {imageUploadErrorMessage !== "" && (
                  <Typography className={classes.failedMessageColor}>
                    {imageUploadErrorMessage}
                  </Typography>
                )}
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={this.onImageUpload}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    className={classes.button}
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <Typography component="h1" variant="h5">
                  My Profile
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
                        value={firstName}
                        error={fnameIsValid ? false : true}
                        helperText={
                          fnameIsValid ? "" : "Should contain only alphabets"
                        }
                        onChange={this.validateName}
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
                        value={lastName}
                        autoComplete="lname"
                        error={lnameIsValid ? false : true}
                        helperText={
                          lnameIsValid ? "" : "Should contain only alphabets"
                        }
                        onChange={this.validateName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        disabled
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        type="email"
                        autoComplete="email"
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
                        value={phone}
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
                        defaultValue={birthday}
                        type="date"
                        autoComplete="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onBlur={this.setBirthday}
                      />
                    </Grid>
                  </Grid>
                  {loading && (
                    <Grid container spacing={5} justify="center">
                      <Grid item>
                        <CircularProgress />
                      </Grid>
                    </Grid>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Update Changes
                  </Button>
                  <Grid container justify="flex-start">
                    <Grid item>
                      <Typography
                        className={
                          infoMessage.includes("Successfully")
                            ? classes.successMessageColor
                            : classes.failedMessageColor
                        }
                      >
                        {infoMessage}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/" variant="body2">
                        Proceed to home
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);
