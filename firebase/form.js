  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCwwqK3_ZSTidDRwNEE-T50j9PKQ6wX0Ws",
    authDomain: "personal-library-c5a4b.firebaseapp.com",
    projectId: "personal-library-c5a4b",
    storageBucket: "personal-library-c5a4b.appspot.com",
    messagingSenderId: "396802370606",
    appId: "1:396802370606:web:43cc8dd374e4a8c4a083bf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();


  function signUp() {
      let email = document.getElementById("email-input-su");
      let password = document.getElementById("password-input-su");
      auth.createUserWithEmailandPassword(email.value, password.value)
      .then((userCredential) => {
          let user = userCredential.user;
      })
      .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
      });
  }
