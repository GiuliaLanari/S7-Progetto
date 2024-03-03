//const URL = "https://striveschool-api.herokuapp.com/api/product/";

const AuthenticationKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc2MTRjNTllYzAwMTk5MGQ2ZTYiLCJpYXQiOjE3MDkyODMxNjksImV4cCI6MTcxMDQ5Mjc2OX0.KZCHGXqImKcqGr7zGKXszDY9su3m0Y3NGYP9AEzZhdU";

const cardID = new URLSearchParams(window.location.search).get("postId");
const URL = cardID
  ? "https://striveschool-api.herokuapp.com/api/product/" + cardID
  : "https://striveschool-api.herokuapp.com/api/product/";

const method = cardID ? "PUT" : "POST";

//console.log(cardID);

window.onload = () => {
  const sottoTitoloVariabile = document.getElementById("title-alt");
  const aggiungiBtn = document.getElementById("aggiungiBtn");
  const cancellaBtn = document.getElementById("cancellaBtn");
  const resetBtn = document.getElementById("resetBtn");

  if (cardID) {
    sottoTitoloVariabile.innerText = "Modifica foto";
    aggiungiBtn.innerText = "Modifica Foto";
    aggiungiBtn.classList.add("btn-secondary");
    cancellaBtn.classList.remove("d-none");
    /////prova

    fetch(URL, {
      method,
      headers: {
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

      .then((post) => {
        document.getElementById("nome").value = post.name;
        document.getElementById("descrizione").value = post.description;
        document.getElementById("brand").value = post.brand;
        document.getElementById("foto").value = post.imageUrl;
        document.getElementById("prezzo").value = post.price;
      });
  } else {
    sottoTitoloVariabile.innerText = "Crea nuovo Post";
    aggiungiBtn.innerText = "Crea Post";
    aggiungiBtn.classList.add("btn-primary");
    resetBtn.classList.remove("d-none");
    resetBtn.innerText = "Reset form";
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
    method, //POST Sottinteso
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
      alert("Il Post: " + newPost.name + (cardID ? " è stato modificato" : " è stato creato"));
      e.target.reset();
      setTimeout(() => {
        window.location.assign("./home-page.html");
      }, 1000);
    })
    .catch((error) => console.log(error));
};

const cancellaPost = () => {
  const conferma = confirm("Sei sicuro di voler elliminare?");
  if (conferma) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + AuthenticationKey,
      },
    })
      .then((risposta) => risposta.json())
      .then((cancelPost) => {
        alert("Post elliminato " + cancelPost.name);
        setTimeout(() => {
          window.location.assign(".//home-page.html");
        });
      });
  }
};

const resetForm = () => {
  const conferma = confirm("Sei sicuro di voler resettare il for?");
  if (conferma) {
    document.getElementById("nome").value = "";
    document.getElementById("descrizione").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("prezzo").value = "";
  }
};
