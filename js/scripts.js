const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");

/***********************************
 * Getting data from API
 **********************************/

/**
 * database is an array which saves the fetched data for later use
 */
let database = [];

/**
 * function "fetchData"
 * This function fetches the data from the API
 * Then parses the data to JSON and returns the data as a JSON object
 * @param {url} url is the placeholder for the API address
 */

async function fetchData(url) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data.results;
  } catch (error) {
    console.log("Error", error);
  }
}

/**
 * function "createDataArray"
 * This function loops through the fetched API data
 * For each loop one object is created which then is pushed to the array "database"
 * At the end the array "database" which then contains all the data is returned
 * @param {data} data will take the data from the fetched API
 */

function createDataArray(data) {
  for (let i = 0; i < data.length; i++) {
    let date = data[i].dob.date;
    const obj = {
      picture: data[i].picture,
      name: `${data[i].name.first} ${data[i].name.last}`,
      email: data[i].email,
      city: data[i].location.city,
      state: data[i].location.state,
      phone: data[i].phone,
      street:
        data[i].location.street.number + " " + data[i].location.street.name,
      postcode: data[i].location.postcode,
      day: `${date[8]}${date[9]}`,
      month: `${date[5]}${date[6]}`,
      year: `${date[0]}${date[1]}${date[2]}${date[3]}`
    };
    database.push(obj);
  }
  return database;
}

/***********************************
 * Create web content
 **********************************/

/**
 * function "createContext"
 * This function creates the card with employee information
 * @param {database} database - through this parameter the function gets the data from the  array "database"
 */
function createContext(database) {
  let galleryHTML = "";
  for (let i = 0; i < database.length; i++) {
    galleryHTML += `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${database[i].picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${database[i].name}</h3>
        <p class="card-text">${database[i].email} </p>
        <p class="card-text cap">${database[i].city} , ${database[i].state} </p>
    </div>
</div>`;
  }
  gallery.innerHTML = galleryHTML;
}

/***********************************
 * Helper function
 **********************************/

/**
 * function eListener
 * puts a event Listener on every element with the class "card"
 * This function will be called after all card elements are created
 */
function eListener() {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
      const email =
        cards[i].firstElementChild.nextElementSibling.firstElementChild
          .nextElementSibling.innerHTML;

      for (let ii = 0; ii < database.length; ii++) {
        if (database[ii].email == email.trim()) {
          createModal(database[i]);
        }
      }
    });
  }
}

/***********************************
 * MODAL
 **********************************/

/**
 * function "createModal"
 * This function creates the modal element and adds it to the body element
 * @param {obj} obj represents a single object out of the array database
 */

function createModal(obj) {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
  modalContainer.innerHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${obj.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${obj.name}</h3>
            <p class="modal-text">${obj.email}</p>
            <p class="modal-text cap">${obj.city}</p>
            <hr>
            <p class="modal-text">${obj.phone}</p>
            <p class="modal-text">
            ${obj.street},
            ${obj.city}, 
            ${obj.state} ${obj.postcode}
            </p>
           <p class="modal-text">Birthday: 
           ${obj.day}/${obj.month}/${obj.year}
           </p>
    </div>`;

  body.appendChild(modalContainer);
}

/**
 * function "removeModal"
 * This function removes the modal element from the DOM
 */

body.addEventListener("click", e => {
  const elem = e.target;

  if (elem.id == "modal-close-btn") {
    body.removeChild(elem.parentNode.parentNode);
  } else if (elem.parentNode.id == "modal-close-btn") {
    body.removeChild(elem.parentNode.parentNode.parentNode);
  }
});

/***********************************
 * Calling all functions and creating the website
 **********************************/

fetchData("https://randomuser.me/api/?results=12&nat=us")
  .then(data => createDataArray(data))
  .then(database => createContext(database))
  .catch(err => {
    console.log(err);
  })
  .finally(() => eListener());
