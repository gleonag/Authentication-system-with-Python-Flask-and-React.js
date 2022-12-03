export const signup = async(user, pass) => {
    const response = await fetch(
        "https://3000-4geeksacade-reactflaskh-e1ryqu50zjo.ws-eu77.gitpod.io/signup",
        {
            method: "POST",
            headers: JSON.stringify({email: email, password: pass}) 
        }
    );
    if (response.status === 201){
        return "User registered"
    }
    throw new Error(`Couldn't register user. Status: ${response.status}`);
};