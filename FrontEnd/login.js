let submit = document.getElementById("submit");
    submit.addEventListener("click", async function(){
        
            let inputEmail = document.querySelector("#email").value;
            let inputPassword = document.querySelector("#password").value;
            
        
            let user = {
                email: inputEmail,
                password: inputPassword
              };
        
            const reponse= await fetch('http://localhost:5678/api/users/login',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
              });
        
              
            const reponseuser = await reponse.json();
            console.log(reponseuser);

            if(reponse.ok){
              location.href='./index.html';
              }
              else if(reponse.status === 401) {
                alert("Email ou mot de passe incorrecte");
            } else {
              alert("Remplissez les champs s'il vous plait!");

            }
          
        
          
    });


