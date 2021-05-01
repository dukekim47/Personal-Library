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

  //Sign Up in Firebase with email and password//
  const auth = firebase.auth();
  const db = firebase.firestore();

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("logged in")
    } else console.log("not logged in");
})


  function signUp() {
      let email = document.getElementById("email-input-su").value;
      let password = document.getElementById("password-input-su").value;
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          let user = userCredential.user;
          alert("You have been successfully signed up")
      })
      .catch((error) => {
          alert("Oops, something went wrong")
          let errorCode = error.code;
          let errorMessage = error.message;
      });
  }



//Login in Firebase with email and password//

  function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        let user = userCredential.user;
        alert("You have been successfully logged in")
    })
    .catch((error) => {
        alert("You were unable to login, please double check your email and password");
        let errorCode = error.code;
        let errorMessage = error.message;
    });
}


//Sign Out 

function logout () {
    if(auth.currentUser !== null) {
auth.signOut().then(() => {
    alert("You have successfuly signed Out. See you again!")
  }).catch((error) => {
    alert("Oops, Something went wrong")
    // An error happened.
  });
    } else alert("You are not signed in");
}



db.settings({timestampsInSnapshots: true});
/*
db.collection("library").get().then(snapshot => {
    setupCard(snapshot.docs);
})
*/

//Real Time listener
db.collection("library").orderBy("title").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  renderCard(changes);
})


