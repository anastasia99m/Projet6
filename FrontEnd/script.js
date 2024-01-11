async function getworks() {
    const  reponse = await fetch(`http://localhost:5678/api/works`);
    const works = await reponse.json();
    console.log(works);


    works.forEach(works => {
        const sectionGallery = document.querySelector(".gallery");//je rentre dans la balise gallery
        const figure = document.createElement("figure");// je cree nouvelle balise figure 
        const imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;
        const figcaption = document.createElement("figcation");
        figcaption.innerHTML = works.title;

   
        sectionGallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(figcaption);
    
    });
}
getworks();



