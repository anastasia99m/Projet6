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
            console.log(reponseuser.token);

            
            var errorMessage = document.querySelector('.error');
            if(reponse.ok){
              
              window.localStorage.setItem("token", reponseuser.token);
              location.href='./index.html';
             
              }
              else if(reponse.status === 401) {
                errorMessage.textContent = 'Email ou mot de passe incorrecte !!';
               
            } else {
              errorMessage.textContent = 'Remplissez les champs s"il vous plait! !!';

            }
          
      
          
          
    });

