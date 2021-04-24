# Public API Requests
## Techdegree Project 5

Live Version: https://simonfeu.github.io/techdegree-project-5/

## About the project
In this project I build an contact information app for the fictonal company "Awesome Startup".
I used JavaScript and created an employee directory by communicating with a third-party API.
I used the Random User Generator API (https://randomuser.me/) to grab data for 12 random “employees”.
To get the data from the database and to use it in my project I requested a JSON object from the API.

## Tech Stack / Techniques used
* JavaScript
* Fetch (API / JSON)
* Promises
* async/await

## Code Examples

### fetchData function
 * This function fetches the data from the API
 * Then parses the data to JSON and returns the data as a JSON object
 * @param {url} url is the placeholder for the API address

```javascript
async function fetchData(url) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data.results;
  } catch (error) {
    console.log("Error", error);
  }
}
```

### createDataArray function
 * This function loops through the fetched API data
 * For each loop one object is created which then is pushed to the array "database"
 * At the end the array "database" which then contains all the data is returned
 * @param {data} data will take the data from the fetched API

```javascript
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
```

### createContext function
 * This function creates the card with employee information
 * @param {database} database - through this parameter the function gets the data from the  array "database"

```javascript
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
```

### Calling all functions and creating the website

```javascript
fetchData("https://randomuser.me/api/?results=12&nat=us")
  .then(data => createDataArray(data))
  .then(database => createContext(database))
  .catch(err => {
    console.log(err);
  })
  .finally(() => eListener());
```
