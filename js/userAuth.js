var uName = document.getElementById("uName");
var uEmail = document.getElementById("uEmail");
var uEmailS = document.getElementById("uEmailS");
var uPass = document.getElementById("uPass");
var uPassS = document.getElementById("uPassS");
var userName = document.getElementById("userName");
var userCountry = document.getElementById("userCountry");
var userCity = document.getElementById("userCity");

function uSignUp() {
  event.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(uEmail.value, uPass.value)
    .then((result) => {
      alert("Welcome! You're Signed In");
      let obj = {
        UserName: userName.value,
        UserEmail: uEmail.value,
        UserCountry: userCountry.value,
        UsertCity: userCity.value,
      };
      firebase
        .database()
        .ref("Users of Website/")
        .push(obj, () => {
          console.log("Save to Firebase");
          window.location = "homepage.html";
        });
    })

    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function uSignIn() {
  event.preventDefault();
  if (uEmailS.value.length < 6) {
    alert("Please Fill email Correctly!");
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(uEmailS.value, uPassS.value)
    .then(() => {
      localStorage.setItem("name", uEmailS.value);
      alert("login Successfully");
      window.location = "./homepage.html";
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(errorMessage);
    });
}

function rLogOut() {
  alert("User signed out!");
  window.location = "../index.html";
}
