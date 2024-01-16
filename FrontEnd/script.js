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
      btnTous.categoryId === 0;
      filtres.appendChild(btnTous);
      
    // Les buttons des categories
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;

        const buttons = document.querySelectorAll(".filtres button");

        // Pour chaque bouton de filtre - ecouteur d'evenement de clic
        buttons.forEach((button) => {
          btn.addEventListener("click",async function(cat){
            const categoryId = cat.target.id;

            // Filtrer en fonction de la categorie sélectionne
            const filteredGallery =
              categoryId !== "0"
                ? works.filter((api) => api.categoryId == categoryId)
                : works;

            // Changer la couleur de button 
            cat.target.style.backgroundColor = "#1D6154";
            cat.target.style.color = "#ffffff";
        
            // Afficher les projets filtrees dans la galerie
            display(filteredGallery);

          });
        });

        filtres.appendChild(btn);
        
       
    });

      
      
      
}
getworks();



