const URL = "https://striveschool-api.herokuapp.com/api/product/";

const AuthenticationKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc2MTRjNTllYzAwMTk5MGQ2ZTYiLCJpYXQiOjE3MDkyODMxNjksImV4cCI6MTcxMDQ5Mjc2OX0.KZCHGXqImKcqGr7zGKXszDY9su3m0Y3NGYP9AEzZhdU";

const parametri = new URLSearchParams(window.location.search);
const postId = parametri.get(_id);

console.log(postId);

window.onload = () => {
  const sottoTitoloVariabile = document.getElementById("title-alt");
  const aggiungiBtn = document.getElementById("aggiungiBtn");
  const cancellaBtn = document.getElementById("cancellaBtn");

  if (selezionatoId) {
    sottoTitoloVariabile.innerText = "- Modifica foto";
    aggiungiBtn.innerText = "Modigica Foto";
    aggiungiBtn.classList.add("btn-secondary");

    cancellaBtn.classList.remove("d-none");

    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dati");
        }
      })
      .then((post) => {
        document.getElementById("nome").value;
        document.getElementById("descrizione").value;
        document.getElementById("brand").value;
        document.getElementById("foto").value;
        document.getElementById("prezzo").value;
      });
  } else {
    sottoTitoloVariabile.innerText = "Crea nuovo Post";
    aggiungiBtn.innerText = "Crea Post";
    aggiungiBtn.classList.add("btn-primary");
  }
};

const submitFunzione = (e) => {
  e.preventDefault();

  const newPost = {
    name: document.getElementById("nome").value,
    description: document.getElementById("descrizione").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("foto").value,
    price: document.getElementById("prezzo").value,
  };

  fetch(URL, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + AuthenticationKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel reperimento dati");
      }
    })

    .then((newPost) => {
      console.log(newPost);
      alert("Post Salvato: " + newPost.name);
      e.target.reset();
    })
    .catch((error) => console.log(error));
};

const cancellaPost = () => {
  const conferma = confirm("Sei sicuro di voler elliminare il Post?");
  if (conferma) {
    fetch(URL, {
      method: "DELETE",
    })
      .then((risposta) => risposta.json())
      .then((cancelPost) => {
        alert("Post elliminato " + cancelPost.name);
        setTimeout(() => {
          window.location.assign("//home-page.html");
        });
      });
  }
};
