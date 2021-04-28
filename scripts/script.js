//Firebase Sign Up - Email and Passowrd//
const signUpBtn = document.getElementById("sign-up-user");
signUpBtn.addEventListener("click", signUp);

//Firebase Login - Email and Password//
const loginBtn = document.getElementById("signIn");
loginBtn.addEventListener("click", login);

//Firebase Sign Out - Email and Password//
const signOut = document.getElementById("sign-out");
signOut.addEventListener("click", logout)

//The main content container
const mainContent = document.querySelector(".main-content"); 

//Form for Cards
const form = document.getElementById("add-card");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection("library").add({
        title: form.title.value,
        content: form.content.value,
        footer: form.footer.value
    })
})


//Brings Data from Firestore into DOM into main content container
const setupCard = (data) => {
    let html = "";
    data.forEach(book => {
        const cards = book.data();
        const li = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${cards.title}</h5>
            <button type="button" class="close-btn">
                <span class="text-dark close-x">&times;</span>
            </button>
            <p class="card-text">${cards.content}</p>
        </div>
          <div class="card-footer">${cards.footer}</div>
          </div>
        </div>`
        html += li;
    });
    mainContent.innerHTML = html;
}

//Adding Cards into Main Container
function addCard () {
    const form = document.getElementById("add-card")  
  }