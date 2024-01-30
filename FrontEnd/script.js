async function getworks() {
    const  reponse = await fetch(`http://localhost:5678/api/works`);
    const works = await reponse.json();
    console.log(works);

    const getCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await getCategories.json();
    console.log(categories);

    
    const sectionGallery = document.querySelector(".gallery");//Rentrer dans la balise gallery
    
    

    // Afficher la gallerie
    function display (travaux){
      sectionGallery.innerHTML = ""; //Vider le contenu de la gallery existante
      travaux.forEach(works => {
        const figure = document.createElement("figure");// Creer nouvelle balise figure
        figure.id = "figure" + works.id;
        const imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;
        const figcaption = document.createElement("figcation");
        figcaption.innerHTML = works.title;

   
        sectionGallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(figcaption);
      });
    }
    display(works);

    
    //filtrage(3);
   
    
    
    // Creer les buttons de filtres
    const filtres = document.querySelector(".filtres");
    // Le button Tous
    const btnTous = document.createElement("button");
      btnTous.textContent = "Tous";
      btnTous.id = 0;
      filtres.appendChild(btnTous);
      
    // Les buttons des categories
    categories.forEach((category) => {
        const btn = document.createElement("button");
        
        btn.textContent = category.name;
        btn.id = category.id;

        filtres.appendChild(btn);
        
        }); 

       

        const buttons = document.querySelectorAll(".filtres button");
      console.log(buttons);
        // Pour chaque bouton de filtre - ecouteur d'evenement de clic
        buttons.forEach((button) => {
          button.addEventListener("click",async function(cat){
            
            const categoryId = cat.target.id;
            console.log(categoryId);
            
            // Changer la couleur de button
            buttons.forEach((button) => {
              button.style.backgroundColor = "#ffffff";
              button.style.color = "#1D6154";
            });
            cat.target.style.backgroundColor = "#1D6154";
            cat.target.style.color = "#ffffff";
      
            // Filtrer en fonction de la categorie sélectionne
            const filteredGallery =
              categoryId !== "0"
                ? works.filter((api) => api.categoryId == categoryId)
                : works;

          
           
           
           
        
            // Afficher les projets filtrees dans la galerie
            display(filteredGallery);

          
        });

        
        
       
    });

      
      
      
}
getworks();


function login(){
  var token = window.localStorage.getItem("token");
  console.log(token);
  if(token != null){
    hideElement();
  }
  
}
login();

function hideElement(){
  document.getElementsByClassName("filtres")[0].style.display = "none";

  // Basculer entre les login et logout
  var isLoggedIn = false;
  

  const loginStateElement = document.getElementById("log");
  if (isLoggedIn) {
    // Si connecté, changer l'état à déconnecté (logout)
    loginStateElement.textContent = "login";
    isLoggedIn = false;
  
} else {
    // Si déconnecté, changer l'état à connecté (login)
    loginStateElement.textContent = "logout";
    var elementVisible = document.getElementById('modifier');
    elementVisible.classList.remove('invisible');
    
    

    loginStateElement.addEventListener("click",async function logout(){
      localStorage.removeItem("token");
      location.href='./index.html';
      isLoggedIn = true;
      loginStateElement.textContent = "login";
    });
   
}
}

// Sélectionner les éléments nécessaires
var openModalBtn = document.getElementById('modifier');
var closeModalBtn = document.getElementById('closeModalBtn');
var modal = document.getElementById('myModal');

// Ouvrir la modal
openModalBtn.addEventListener('click', function() {
  modal.style.display = 'block';
});

// Fermer la modal
closeModalBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Fermer la modal si l'utilisateur clique en dehors du contenu de la modal
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});




  

    
