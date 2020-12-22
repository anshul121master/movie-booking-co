import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiPhoneNumber from "material-ui-phone-number";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { getProfile } from "../../utils/api";
import { uploadImage } from "../../utils/api";
import { updateProfile } from "../../utils/api";
import { userProfilePhoto } from '../../config/apiConfig'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../shared-components/Loader";
import Footer from "../../shared-components/footer/Footer"
import Header from "../../shared-components/header/Header"
import { header, footer } from "../../theme";
import { setAuthedUser } from "../../store/actions/authedUser"
import { connect } from "react-redux"

const styles = (theme) => ({
  profileInfoDiv: {
    width: "100vw",
    height: "30vh",
    backgroundColor: "grey",
  },
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "50px",
  },
  cardStyle: {
    minWidth: "70vw",
    margin: '30px 0',
    backgroundColor: "white"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    height: 45,
    borderRadius: 0
  },

  imageContainer: {
    minWidth: "100%",
    backgroundColor: "#0A3D62",
    minHeight: "30vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cameraIcon: {
    position: "absolute",
    top: "75%",
    right: "-20px",
    size: 20,
    backgroundColor: "#d81b60",
    padding: "9px",
    "&:hover":{
      backgroundColor: "white"
    }
  },

  input: {
    display: "none",
  },
  profileImg: {
    width: "100%",
    height: "100%",
    padding: "2px",
    marginBottom: "5px",
  },
  userIcon: {
    color: "grey",
    marginBottom: "5px",
  },
  successMessageColor: {
    color: "green",
    marginTop: 10
  },
  failedMessageColor: {
    color: "red",
    marginTop: 10
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
    phoneIsValid: true,
    email: "",
    birthday: "",
    imageUrl: null,
    infoMessage: "",
    loadProfileMessage: "",
    imageUploadErrorMessage: "",
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true
    })
    getProfile().then((res) => {
      if (res.status === 200) {
        let userProfile = res.response;
        const birthday = this.formatDate(userProfile.dateOfBirth);
        this.setState({
          loading: false,
          loadProfileMessage: "",
          firstName: userProfile.fullName.split(" ")[0],
          lastName: userProfile.fullName.split(" ")[1],
          email: userProfile.email,
          phone: userProfile.phoneNumber,
          birthday: birthday,
          imageUrl: userProfile.imageUrl,
        });
      } else {
        this.setState({
          loading: false,
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
        let { authedUser } = this.props;
        let authedUserImage = {
          ...authedUser,
          imageUrl

        }
        this.props.dispatch(setAuthedUser(authedUserImage))
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

  setBirthday = (event) => {
    const birthday = event.target.value;
    this.setState({
      birthday,
    });
  };

  validatePhone = (phone) => {
    console.log(phone);
    if (phone.substring(1, 3) === "91" && phone.length === 15)
      this.setState({
        phone,
        phoneIsValid: true,
      });
    else
      this.setState({
        phone,
        phoneIsValid: false,
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
      phoneIsValid,
      birthday,
      imageUrl,
    } = this.state;
    if (fnameIsValid === true && lnameIsValid === true && phoneIsValid === true) {
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
      updateProfile(userInfo).then(res => {
        if (res.status === 200){
          this.setState({
            infoMessage: "Profile Updated Successfully",
            loading: false,
          });
          let authedUser = {
            response:userInfo,
            exception:null
          }
          this.props.dispatch(setAuthedUser(authedUser))
        }
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
      phoneIsValid,
      birthday,
      imageUrl,
      infoMessage,
      imageUploadErrorMessage,
      loadProfileMessage,
      loading,
    } = this.state;

    let today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    return (
      <div>
      {loading && <Loader />}
      <Header />
        <Container className={classes.imageContainer}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {imageUploadErrorMessage !== "" && (
              <Typography
                style={{ marginTop: 5, marginBottom: 5 }}
                className={classes.failedMessageColor}
              >
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
            {imageUrl === null ? (
              <div
                style={{ position: "relative", width: 100, marginBottom: 20 }}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  size="7x"
                  className={classes.userIcon}
                />

                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    className={classes.cameraIcon}
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            ) : (
                <div style={{ position: "relative", width: 110, height: 110, marginBottom: 10 }}>
                  <img
                    src={userProfilePhoto + imageUrl}
                    alt="profile image"
                    className={classes.profileImg}
                  />

                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      className={classes.cameraIcon}
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
              )}
          </div>

          <Typography variant="h5" style={{ color: footer, marginRight: 20 }}>
           {phone}
          </Typography>
        </Container>
        <Container
          className={classes.cardStyle}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <Grid container justify="center">
            <div className={classes.paper}>
              {loadProfileMessage !== "" && (
                <Typography className={classes.failedMessageColor}>
                  {loadProfileMessage}
                </Typography>
              )}
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
                      onlyCountries={["in"]}
                      autoComplete="phone"
                      error={phoneIsValid ? false : true}
                      helperText={
                        phoneIsValid
                          ? ""
                          : "Must begin with +91 and should be 10 digits in length."
                      }
                      onChange={this.validatePhone}
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
                      value={birthday}
                      type="date"
                      autoComplete="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{ max:date}}
                      onChange={this.setBirthday}
                      onKeyPress={(event) => event.preventDefault()}
                    />
                  </Grid>
                </Grid>
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
            

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Update Changes
                </Button>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/" style={{ textDecoration: "none", color: header }}>Proceed to home</Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Container>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ authedUser }){
  return {
    authedUser
  }
}
export default withStyles(styles)(connect(mapStateToProps)(Profile));

