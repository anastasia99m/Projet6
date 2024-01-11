async function getworks() {
    const  reponse = await fetch(`http://localhost:5678/api/works`);
    const works = await reponse.json();
    console.log(works);

    const getCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await getCategories.json();
    console.log(categories);

    
    const sectionGallery = document.querySelector(".gallery");//Rentrer dans la balise gallery
    sectionGallery.innerHTML = ""; //Vider le contenu de la gallery existante

    // Afficher la gallerie
    works.forEach(works => {
        const figure = document.createElement("figure");// Creer nouvelle balise figure 
        const imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;
        const figcaption = document.createElement("figcation");
        figcaption.innerHTML = works.title;

   
        sectionGallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(figcaption);
    });

    // Creer les buttons de filtres
    const filtres = document.querySelector(".filtres");
    // Le button Tous
    const btnTous = document.createElement("button");
      btnTous.textContent = "Tous";
      filtres.appendChild(btnTous);
    // Les buttons des categories
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        filtres.appendChild(btn);
      });

      
}
getworks();



