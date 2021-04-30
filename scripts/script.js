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




//Brings Data from Firestore into DOM into main content container. Assigns Unique Id and content of each document into HTML
const setupCard = (changes) => {
    let html = "";
    changes.forEach(book => {
        let uniqueID = book.doc.id;
        const cards = book.doc.data();
        const outerDiv = document.createElement("div");
        outerDiv.classList.add("card");
        outerDiv.setAttribute("data-id", uniqueID)
        const innerDiv = document.createElement("div");
        innerDiv.classList.add("card-body");
        const heading = document.createElement("h5");
        heading.classList.add("card-title")
        heading.textContent = cards.title;
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("close-btn", "close-card");
        button.innerHTML = "&times;";
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            db.collection("library").doc(uniqueID).delete();
            mainContent.removeChild(outerDiv);
        })
        const text = document.createElement("p");
        text.classList.add("card-text");
        text.textContent = cards.content;
        const footer = document.createElement("div")
        footer.classList.add("card-footer");
        footer.textContent = cards.footer;
        
        if (book.type === "added") {
            console.log(book, book.type)
            mainContent.appendChild(outerDiv);
            outerDiv.appendChild(innerDiv);
            innerDiv.appendChild(heading);
            innerDiv.appendChild(button);
            innerDiv.appendChild(text);
            outerDiv.appendChild(footer);
        } else if (book.type ==="removed") {
            let removedCard = document.querySelector(`[data-id = ${uniqueID}]`);
            mainContent.removeChild(removedCard);
        } 
    }
);}

    //Event listener for close buttons assigned to each individual card.
    

//Adding Cards into Main Container
function addCard () {
    const form = document.getElementById("add-card")  
  }
