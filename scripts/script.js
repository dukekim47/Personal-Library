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
const openModal = document.getElementById("openModal");
const editModalForm = document.getElementById("edit-card");
const editModal = document.getElementById("edit-container");



//Brings Data from Firestore into DOM into main content container. Assigns Unique Id and content of each document into HTML
const renderCard = (changes) => {
    changes.forEach(book => {
        let uniqueID = book.doc.id;
        let htmlID = `_${book.doc.id}`;
        const cards = book.doc.data();

        //Below Creates A Bootstrap Modal to Main Content
        const outerDiv = document.createElement("div");
        outerDiv.setAttribute("data-toggle", "modal");
        outerDiv.setAttribute("data-target", "#openModal");
        outerDiv.classList.add("card");
        outerDiv.setAttribute("data-id", htmlID);

        //Event Listener to Retrieve Data from Selected Card for Editting 
        outerDiv.addEventListener("click", (e) => {
            let thisCard = e.target.parentNode.parentNode;
            let thisID = thisCard.getAttribute("data-id").slice(1);
            editModal.setAttribute("data-id", thisID);
            db.collection("library").doc(thisID).get().then(snapshot => {
                let retrievedData = snapshot.data();
                editModalForm.title.value = retrievedData.title;
                editModalForm.content.value = retrievedData.content;
                editModalForm.footer.value = retrievedData.footer;
                editModalForm.checkbox.checked = retrievedData.read;
            });
        });
        //Event Listener to Retrieve Data from Selected Card for Editting (End)

        const innerDiv = document.createElement("div");
        innerDiv.classList.add("card-body");
        const heading = document.createElement("h5");
        heading.classList.add("card-title")
        heading.textContent = cards.title;
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("close-btn", "close-card");
        button.innerHTML = "&times;";

        //Event Listener to Delete Data from Firestore
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            db.collection("library").doc(uniqueID).delete();
        })
        ////Event Listener to Delete Data from Firestore (End)

        const text = document.createElement("p");
        text.classList.add("card-text");
        text.textContent = cards.content;
        const footer = document.createElement("div")
        footer.classList.add("card-footer");
        footer.textContent = cards.footer;
        const readStatus = document.createElement("p");

        //Realtime Database Interaction
        //Added Situation / On load of page
        if (book.type === "added") {
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
            // Removed Situation where data is manually removed by user
        } else if (book.type === "removed") {
            let removedCard = document.querySelector(`[data-id = _${uniqueID}]`);
            mainContent.removeChild(removedCard);
            // Modified Situation where data is mutated by user
        } else if (book.type === "modified") {
            let updatedCard = document.querySelector(`[data-id = _${uniqueID}]`);
            console.log(updatedCard);
            updatedCard.childNodes[0].childNodes[0].textContent = cards.title;
            updatedCard.childNodes[0].childNodes[2].textContent = cards.content;
            updatedCard.childNodes[1].childNodes[0].textContent = cards.footer;
            if (cards.read) {
                updatedCard.childNodes[1].childNodes[1].textContent = "Complete";
                updatedCard.childNodes[1].childNodes[1].className = "read-card";
            } else {
                updatedCard.childNodes[1].childNodes[1].textContent = "Incomplete";
                updatedCard.childNodes[1].childNodes[1].className = "not-read-card";
            }
        }
    }
    );
}

// Updating Data within Cards

const edit = document.getElementById("edit-card");
edit.addEventListener("submit", (e) => {
    e.preventDefault();
    let uniqueID = edit.parentElement.getAttribute("data-id");
    db.collection("library").doc(uniqueID).update({
        title: edit.title.value,
        content: edit.content.value,
        footer: edit.footer.value,
        read: edit.checkbox.checked
    });
    closeModal("openModal");  
})



function closeModal(modalId) {
    // Retrieves the modal
    const modal = document.getElementById(modalId);

    // Alters bootsrap hidden modal
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');

     // Retrieves Backdrop from Bootstrap
     const modalBackdrops = document.getElementsByClassName('modal-backdrop');

     // remove opened modal backdrop
      document.body.removeChild(modalBackdrops[0]);
  }

