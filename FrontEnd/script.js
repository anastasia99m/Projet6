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
      const sectionGalleryModal = document.querySelector(".workContainer");//Rentrer dans la balise gallery

      travaux.forEach(works => {
        const figure = document.createElement("figure");// Creer nouvelle balise figure
        figure.classList.add('image-container');
        figure.id = "figure" + works.id;
        figure.setAttribute("data-gallery", works.id)
        const imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;
        const figcaption = document.createElement("figcation");
        figcaption.innerHTML = works.title;

   
        sectionGallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(figcaption);

        
          const imageElementModal = document.createElement("img");
          imageElementModal.src = works.imageUrl;
    
          const imageContainer = document.createElement('div');
          imageContainer.classList.add('image-container');
          imageContainer.id = "figureModal" + works.id;
          imageContainer.setAttribute("data-gallery", works.id)
          const iconContainer = document.createElement('div');
          iconContainer.classList.add('icon-container');
          const deleteIcon = document.createElement('i');
    
          iconContainer.addEventListener('click', function() {
            supprimerImage(this);
          });
    
          deleteIcon.classList.add('fa-solid');
          deleteIcon.classList.add('fa-trash-can');
       
     
    
          iconContainer.appendChild(deleteIcon);
          imageContainer.appendChild(iconContainer);
          sectionGalleryModal.appendChild(imageContainer);
          imageContainer.appendChild(imageElementModal);
         
          
          
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
        //---Liste des categories dans modal2
        const categorieSelect = document.getElementById("categorie");

        btn.textContent = category.name;
        btn.id = category.id;

        filtres.appendChild(btn);

        
          //création des catégories
          const optionElement = document.createElement("option");
          optionElement.value = category.id;
          optionElement.textContent = category.name;

          //mettre les catégories des les options du formulaire
          categorieSelect.appendChild(optionElement);
        
      })
      
      //-----Fin d'ajout de la liste des categories dans la modal2  


        
        
        

       

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


      var images = document.querySelectorAll('.image-container');

      //L'evenement click a chaque icone poubelle
      document.querySelectorAll('icon-container').forEach(function(icon) {
          icon.addEventListener('click', function() {
              supprimerImage(this);
          });
      });

      
      //Supprimer l'image
      function supprimerImage(element) {
          // Récupérer le conteneur d'image parent
          const token = localStorage.getItem("token");
          var container = element.parentNode;

          // Récupérer la galerie 
          var gallery = container.getAttribute('data-gallery');

          const id = gallery.id;
          const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          fetch("http://localhost:5678/api/works/" + id, options)
            .then((response) => {
              if (!response.ok) {
                // Si la réponse n'est pas OK, on lance une erreur qui sera capturée dans le bloc catch
                throw new Error(`Erreur, status = ${response.status}`);
              }
              return response.text();
            })
            .then(() => {
              // Si la suppression reussit, on affiche un message dans la console
              console.log("Suppression réussie");
            })
            // Capture des erreurs lors de la requête
            .catch((error) => {
              console.error(error);
            });
            
          // Supprimer toutes les images avec le même attribut data-gallery
          document.querySelectorAll('.gallery [data-gallery="' + gallery + '"]').forEach(function(image) {
            image.parentNode.removeChild(image);
          });
          
          document.querySelectorAll('.workContainer [data-gallery="' + gallery + '"]').forEach(function(image) {
            image.parentNode.removeChild(image);
          });

          
      }
      



/// Ajout de l'image dans la modal

const contentAddImg = document.querySelector(".case");

const contentPreview = document.querySelector(".content-preview");
// bouton qui permet de mettre une image
const addImgBtn = document.getElementById("add-img-btn");

//création d'un element image
const previewImgSelected = document.createElement("img");

//event sur le boutton d'ajout d'image
addImgBtn.addEventListener("input", () => {
  //on vérifie qu'un fichier est sélectionné
  if (addImgBtn.files.length > 0) {
    //récupération du fichier
    const selectedImage = addImgBtn.files[0];

    //vérifications de la taille de l'image (en octets)
    const maxSizeInBytes = 4 * 1024 * 1024; // 4 Mo
    if (selectedImage.size > maxSizeInBytes) {
      //la span pour afficher un message d'erreur image trop grande
      const errorSizeImg = document.getElementById("message-erreur-taille-image");
      //ajout du texte dans la span
      errorSizeImg.textContent =
        "La taille de l'image ne doit pas dépasser 4 mo.";
      //reinialisation du champs image
      addImgBtn.value = "";
    } else {
      //creation d'un objet URL pour l'image sélectionné
      const selectedImageUrl = URL.createObjectURL(selectedImage);

      //ajout de l'image selectionne dans l'element image creer
      previewImgSelected.src = selectedImageUrl;

      //masque le boutton d'ajout d'image pour affchier la preview
      contentAddImg.style.display = "none";

      //affchier la preview
      contentPreview.style.display = "block";

      //mettre l'image sélectionné dans "content preview"
      contentPreview.appendChild(previewImgSelected);
    }
    }
  });
  




    /////add work  
      function addWork() {
        //récupération du formulaire
        const form = document.getElementById("addWorkForm");
        const token = localStorage.getItem("token");
        //récupérer de la span "erreur un champ n'est pas remplie"
        const erreurChampVide = document.getElementById("error-messageChamp");
      
        form.addEventListener("submit", (e) => {
          e.preventDefault();
      
          //récupération des champs du formulaire
          const titleChamp = document.getElementById("title").value.trim();
          const selectCategoriesChamp = document.getElementById("categorie").value;
      
          //vérification du remplisage des champs
          if (
            titleChamp === "" ||
            selectCategoriesChamp === "" ||
            addImgBtn.files.length === 0
          ) {
            erreurChampVide.textContent = "Remplissez les champs s-il vous plait !!";
          } else {
            //remplisage de form
            const formData = new FormData();
            formData.append("image", addImgBtn.files[0]);
            formData.append("title", titleChamp);
            formData.append("category", selectCategoriesChamp);
      
            fetch("http://localhost:5678/api/works", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            })
              //traitement de la réponse
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Erreur lors de l'ajout de l'œuvre");
                }
                return response.text();
              })
              .then(() => {
                console.log("Ajout réussie");

              })
              
          }
        });
      }
      
      addWork();