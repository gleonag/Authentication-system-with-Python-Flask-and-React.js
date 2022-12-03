import React, {useState} from 'react'

const Signup = () => {
  
  var info = []

  const sendInfo = () => {
    
    info.email = document.getElementById("email").value
    info.password = document.getElementById("password").value

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": "gleonag",
      "password": "contraseña1"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://3001-4geeksacade-reactflaskh-e1ryqu50zjo.ws-eu77.gitpod.io/signup", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
    <div>
        <h1>
            <input type="text" id="email"></input>
        </h1>
        <h1>
            <input type="password" id="password">Contraseña</input>
        </h1>
            <button onClick={()=>{sendInfo()}}>Enviar</button>
    </div>
  )
}

export default Signup