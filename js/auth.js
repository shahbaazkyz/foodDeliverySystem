var rName = document.getElementById("rName");
var rEmail = document.getElementById("rEmail");
var rEmailS = document.getElementById("rEmailS");
var rCountry = document.getElementById("rCountry");
var rCity = document.getElementById("rCity");
var rPass = document.getElementById("rPass");
var rPassS = document.getElementById("rPassS");

function rSignUp() {
  event.preventDefault();
  localStorage.setItem("restaurantName", rName.value);
  firebase
    .auth()
    .createUserWithEmailAndPassword(rEmail.value, rPass.value)
    .then((result) => {
      alert("Welcome! You're Signed In");
      let obj = {
        restaurantName: rName.value,
        restaurantEmail: rEmail.value,
        restaurantCountry: rCountry.value,
        restaurantCity: rCity.value,
      };
      firebase
        .database()
        .ref("Restaurants/")
        .push(obj, () => {
          console.log("Save to Firebase");
          window.location = "./admin.html";
        });
    })

    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function rSignIn() {
  event.preventDefault();

  firebase
    .database()
    .ref("Restaurants/")
    .on("value", function checkRestaurant(data) {
      if (data) {
        $.each(data.val(), function (key, value) {
          let rEmailDB = value["restaurantEmail"],
            rNameDB = value["restaurantName"];

          if (rEmailDB == rEmailS.value) {
            firebase
              .auth()
              .signInWithEmailAndPassword(rEmailS.value, rPassS.value)
              .then(() => {
                localStorage.setItem("restaurantName", rNameDB);
                window.location = "./admin.html";
              });
          } else {
            setTimeout(() => {
              alert("You're not restaurant owner");
            }, 1500);
          }
        });
      }
    });
}
