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


//------code de l'interface utilisateur---------
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


//------Modal---------

// Sélectionner les éléments nécessaires
var openModalBtn = document.getElementById('modifier');
var closeModalBtn = document.getElementById('closeModalBtn');
var closeModalBtn2 = document.getElementById('closeModalBtn2');
var modal1 = document.getElementById('myModal');
var modal2 = document.getElementById('myModal2');
const buttonFirstModal = document.querySelector(".button"); //bouton première modal
const arrow = document.querySelector(".arrow"); //récuperation de la flèche de la deuxième modale

// Ouvrir la modal
openModalBtn.addEventListener('click', function() {
  modal1.style.display = 'block';
});

// Fermer la modal
closeModalBtn.addEventListener('click', function() {
  modal1.style.display = 'none';
});
closeModalBtn2.addEventListener('click', function() {
  modal2.style.display = 'none';
});

// Fermer la modal si l'utilisateur clique en dehors du contenu de la modal
window.addEventListener('click', function(event) {
  if (event.target == modal1) {
    modal1.style.display = 'none';
  }
  if (event.target == modal2) {
    modal2.style.display = 'none';
  }
});

buttonFirstModal.addEventListener("click", openSecondModal); //ajout d'un gestionnaire d'évement qui exécute la fonction openSecondModal

function openSecondModal() {
  modal1.style.display = "none"; //première modal en none
  modal2.style.display = "block"; //seconde modal en block
}

//retourne à la première modal
arrow.addEventListener("click", backToFirstModal); //ajout d'un gestionnaire d'évement qui exécute la fonction backToFirstModal

function backToFirstModal() {
  modal1.style.display = "block"; //première modal en block
  modal2.style.display = "none"; //seconde modal en none
}


async function getworksModal() {
  const  reponseModal = await fetch(`http://localhost:5678/api/works`);
  const worksModal = await reponseModal.json();
 
  const sectionGalleryModal = document.querySelector(".workContainer");//Rentrer dans la balise gallery
  
  

  // Afficher la gallerie dans la Modal
  function display (travaux){
    sectionGalleryModal.innerHTML = ""; //Vider le contenu de la gallery existante
    travaux.forEach(worksModal => {
      const figureModal = document.createElement("figureModal");// Creer nouvelle balise figure
      figureModal.id = "figureModal" + worksModal.id;
      const imageElement = document.createElement("img");
      imageElement.src = worksModal.imageUrl;

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      const iconContainer = document.createElement('div');
      iconContainer.classList.add('icon-container');
      const deleteIcon = document.createElement('i');


      deleteIcon.classList.add('fa-solid');
      deleteIcon.classList.add('fa-trash-can');
   
 

      iconContainer.appendChild(deleteIcon);
      imageContainer.appendChild(iconContainer);
      sectionGalleryModal.appendChild(figureModal);
      figureModal.appendChild(imageContainer);
      imageContainer.appendChild(imageElement);
     
      
      
    });
  }
  display(worksModal);
  };
  getworksModal();