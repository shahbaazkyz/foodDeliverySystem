var firebaseConfig = {
  apiKey: "AIzaSyAZU8yqLRzxdVE3SaRdaDtmFJTEP2sf1dQ",
  authDomain: "hackathonfoodapp.firebaseapp.com",
  databaseURL: "https://hackathonfoodapp-default-rtdb.firebaseio.com/",
  projectId: "hackathonfoodapp",
  storageBucket: "hackathonfoodapp.appspot.com",
  messagingSenderId: "466946474",
  appId: "1:466946474:web:2ac15450e72bcfa80143d3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function rLogOut() {
  alert("Restaurant signed out!");
  localStorage.clear();
  window.location = "./rSignIn.html";
}
