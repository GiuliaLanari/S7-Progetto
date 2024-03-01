const URL = "https://striveschool-api.herokuapp.com/api/product/";

const AuthenticationKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc2MTRjNTllYzAwMTk5MGQ2ZTYiLCJpYXQiOjE3MDkyODMxNjksImV4cCI6MTcxMDQ5Mjc2OX0.KZCHGXqImKcqGr7zGKXszDY9su3m0Y3NGYP9AEzZhdU";

fetch(URL, {
  method: "GET",
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

  .then((objArry) => {
    //const ul = document.getElementById("listaProdotti");
    const row = document.getElementById("row");

    objArry.forEach((objFoto) => {
      console.log(objFoto);

      const col = document.createElement("div");
      col.classList.add("col-sm-9", "mb-5", "col-md-6", "col-lg-4");

      const Card = document.createElement("div");
      Card.classList.add("card");

      const img = document.createElement("img");
      img.src = objFoto.imageUrl;
      img.alt = objFoto.description;
      img.style = "object-fit: cover; height:15rem";
      img.classList.add("card-img-top");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const TitoloH5 = document.createElement("h5");
      TitoloH5.classList.add("card-title");
      TitoloH5.innerText = objFoto.name;

      const prezzo = document.createElement("p");
      prezzo.classList.add("badge", "me-5", "text-bg-success", "card-text");
      prezzo.innerText = objFoto.price + " £";

      const btnDiv = document.createElement("div");
      btnDiv.classList.add("d-flex", "justify-content-center", "align-items-center");

      const btnModifica = document.createElement("button");
      btnModifica.classList.add("btn", "me-5", "btn-primary");
      btnModifica.innerText = "Modifica";

      const dettagliBtn = document.createElement("a");
      dettagliBtn.classList.add("btn", "btn-info");
      dettagliBtn.innerText = "Informazioni";
      dettagliBtn.href = "./details.html";

      const postId = objFoto._id;
      console.log(objFoto._id);

      cardBody.appendChild(TitoloH5);
      cardBody.appendChild(prezzo);
      btnDiv.appendChild(btnModifica);
      btnDiv.appendChild(dettagliBtn);
      cardBody.appendChild(btnDiv);
      Card.appendChild(img);
      Card.appendChild(cardBody);

      col.appendChild(Card);
      row.appendChild(col);
    });
  })
  .catch((error) => console.log(error));
