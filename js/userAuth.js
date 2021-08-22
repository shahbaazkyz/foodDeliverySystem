var uName = document.getElementById("uName");
var uEmail = document.getElementById("uEmail");
var uEmailS = document.getElementById("uEmailS");
var uPass = document.getElementById("uPass");
var uPassS = document.getElementById("uPassS");

function uSignUp() {
  event.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(uEmail.value, uPass.value)
    .then((result) => {
      alert("Welcome! You're Signed In");
      window.location = "homepage.html";
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
    break;
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
