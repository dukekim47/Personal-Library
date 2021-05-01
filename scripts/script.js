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

const body = document.getElementsByTagName("body");
const editModalForm = document.getElementById("edit-card");



//Brings Data from Firestore into DOM into main content container. Assigns Unique Id and content of each document into HTML
const renderCard = (changes) => {
    let html = "";
    changes.forEach(book => {
        let uniqueID = book.doc.id;
        let htmlID = `_${book.doc.id}`;
        const cards = book.doc.data();
        const outerDiv = document.createElement("div");
        outerDiv.setAttribute("data-toggle", "modal");
        outerDiv.setAttribute("data-target", "#openModal");
        outerDiv.classList.add("card");
        outerDiv.setAttribute("data-id", htmlID)
        outerDiv.addEventListener("click", (e) => {
            let thisCard = e.target.parentNode.parentNode;
            let thisID = thisCard.getAttribute("data-id").slice(1);
            db.collection("library").doc(thisID).get().then(snapshot => {
                let retrievedData = snapshot.data();
                editModalForm.title.value = retrievedData.title;
                editModalForm.content.value = retrievedData.content;
                editModalForm.footer.value = retrievedData.footer;
                editModalForm.checkbox.checked = retrievedData.read;
            });
        });
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

// Updating Data within Cards


function openCard(outerDiv) {
    outerDiv.addEventListener("click", () => {


    })

}

function editModalCard(cards) {
    let editCard = document.getElementById("edit-card");
    editCard.title.value = cards.title
    editCard.content.value = cards.content
    editCard.footer.value = cards.footer

    let checkbox = document.getElementById("update-read");
    if (cards.read) {
        let checkbox = document.getElementById("update-read");
        checkbox.checked = true;
    } else { checkbox.checked = false }
}

function removeEditModal() {
    let openModal = document.getElementById("openModal");
    body.removeChild = openModal;
}

function editCard(e) {
    let card = e.target.querySelector("div[data-id]");
    console.log(card)
}