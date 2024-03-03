const AuthenticationKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc2MTRjNTllYzAwMTk5MGQ2ZTYiLCJpYXQiOjE3MDkyODMxNjksImV4cCI6MTcxMDQ5Mjc2OX0.KZCHGXqImKcqGr7zGKXszDY9su3m0Y3NGYP9AEzZhdU";

const cardID = new URLSearchParams(window.location.search).get("postId");

const URL = "https://striveschool-api.herokuapp.com/api/product/" + cardID;

fetch(URL, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + AuthenticationKey,
  },
})
  .then((response) => {
    console.log(response);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nel reperimento dati");
    }
  })
  .then((postFoto) => {
    console.log(postFoto);
    const row = document.getElementById("row");

    const colTesto = document.createElement("div");
    colTesto.classList.add("col-sm-12", "col-md-5");
    const h2 = document.createElement("h2");
    h2.classList.add("mt-3", "mb-3", "display-6");
    h2.innerText = "Dettagli";
    const h1 = document.createElement("h1");
    h1.classList.add("mt-3", "mb-3", "display-4");
    h1.innerText = postFoto.name;
    const descrizione = document.createElement("p");
    descrizione.classList.add("fs-5");
    descrizione.innerText = "Descrisione: " + postFoto.description;

    const userId = document.createElement("p");
    userId.classList.add("fs-6");
    userId.innerText = "ID: " + postFoto._id;

    const createdAt = document.createElement("p");
    createdAt.classList.add("fs-6", "font-monospace");
    createdAt.innerText = "CreatedAt: " + new Date(postFoto.createdAt).toLocaleString();

    const updatedAt = document.createElement("p");
    updatedAt.classList.add("fs-6", "font-monospace");
    updatedAt.innerText = "UpdatedAt: " + new Date(postFoto.updatedAt).toLocaleString();

    const btnModifica = document.createElement("a");
    //btnModifica.classList.add("btn", "btn-secondary", "mt-5");
    //btnModifica.innerText = "Modifica Post";
    //btnModifica.href = `./back-office-page.html?postId=${postFoto._id}`;
    //btnModifica.onclick = modificaBtn("event");
    btnModifica.innerHTML = `<a class="btn btn-secondary" onclick="modificaBtn(event)">Modifica Post</a>`;

    colTesto.appendChild(h2);
    colTesto.appendChild(h1);
    colTesto.appendChild(descrizione);
    colTesto.appendChild(userId);
    colTesto.appendChild(createdAt);
    colTesto.appendChild(updatedAt);
    colTesto.appendChild(btnModifica);
    row.appendChild(colTesto);

    const colImg = document.createElement("div");
    colImg.classList.add("col-sm-12", "col-md-7");
    const img = document.createElement("img");
    img.src = postFoto.imageUrl;
    img.alt = postFoto.description;
    img.classList.add("mt-3", "w-100", "object-fit-cover", "rounded");
    img.style = "object-fit: cover";

    colImg.appendChild(img);
    row.appendChild(colImg);
  })
  .catch((error) => console.log(error));

const modificaBtn = (e) => {
  window.location.assign("./back-office-page.html?postId=" + cardID);
  console.log(modificaBtn);
};
