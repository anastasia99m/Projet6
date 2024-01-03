

async function getworks() {
    const  reponse = await fetch(`http://localhost:5678/api/works`);
    const works = await reponse.json();
    console.log(works);

    /*const sectionGallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    sectionGallery.appendChild(figure);*/
    const image = document.createElement("img");
    for(let i = 0; i < image.lenght; i++){
        const sectionGallery = document.querySelector(".gallery");//je rentre dans la balise gallery
        const figure = document.createElement("figure");// je cree nouvelle balise figure 
        sectionGallery.appendChild(figure);
        const image = document.createElement("img");
        figure.appendChild(image);
        const figcaption = document.createElement("figcation");
        figcaption.innerHTML = "Abajour Tahina";
        figure.appendChild(figcaption);}
    //image.src="http://localhost:5678/images/abajour-tahina1651286843956.png";
    //figure.appendChild(image);
    
}
getworks();

