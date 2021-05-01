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
        footer: form.footer.value,
        read: form.read.checked
    })
})




//Brings Data from Firestore into DOM into main content container. Assigns Unique Id and content of each document into HTML
const renderCard = (changes) => {
    let html = "";
    changes.forEach(book => {
        let uniqueID = book.doc.id;
        let htmlID = `_${book.doc.id}`;
        const cards = book.doc.data();
        const outerDiv = document.createElement("div");
        outerDiv.classList.add("card");
        outerDiv.setAttribute("data-id", htmlID)
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
        })
        const text = document.createElement("p");
        text.classList.add("card-text");
        text.textContent = cards.content;
        const footer = document.createElement("div")
        footer.classList.add("card-footer");
        footer.textContent = cards.footer;
        const readStatus = document.createElement("p");
        

        if (book.type === "added") {
            console.log(book, book.type)
            mainContent.appendChild(outerDiv);
            outerDiv.appendChild(innerDiv);
            innerDiv.appendChild(heading);
            innerDiv.appendChild(button);
            innerDiv.appendChild(text);
            outerDiv.appendChild(footer);
            if (cards.read) {
                readStatus.textContent = "Complete";
                readStatus.classList.add("read-card");
                footer.appendChild(readStatus);
            } else {
                readStatus.textContent = "Incomplete";
                readStatus.classList.add("not-read-card");
                footer.appendChild(readStatus);
            }
        } else if (book.type === "removed") {
            let removedCard = document.querySelector(`[data-id = _${uniqueID}]`);
            mainContent.removeChild(removedCard);
        }
    }
    );
}
