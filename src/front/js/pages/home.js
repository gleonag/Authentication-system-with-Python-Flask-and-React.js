import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword ] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(true);
	const[isValidPassword, setIsValidPassword] = useState(true);
	const navigate = useNavigate();

	const handeClick = async () => {
		//agregar validaciones
		if(isValidEmail && isValidPassword){
			if(actions.login(email, password)){
				navigate("/demo")
			}
		}else{
			alert("Email o contraseña invalido");
		};
		
	};

	let schemaPassword = yup.object().shape({
		
		password: yup
			.string()
			.min(6, 'Too Short')
			.max(10, 'Too Long!')
			.required('Required')
	})

	let schemaEmail = yup.object().shape({
		email: yup.string().email()
			.required('Required')
	})

	const handleBlurEmail = (e) => {
		
		schemaEmail
		.validate({email: e.target.value})
		.then((value) => setIsValidEmail(true))
		.catch((error) => {
			setIsValidEmail(false);
		});
	}

	const handleBlurPassword = (e) => {
		schemaPassword
			.validate({password: e.target.value})
			.then((value)=> setIsValidPassword(true))
			.catch((error) => {
				setIsValidPassword(false);
			});
	};

	return (
		<div className="text-center mt-5">
			
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				
				{store.message || 
					"Loading message from the backend (make sure your python backend is running)..."}
			</div>

			<label className="form-label"></label>
			<input 
				id="email"
				required
				className={`form-control ${isValidEmail ? "" : "is-invalid"}`}
				onBlur={handleBlurEmail} 
				onChange={(e)=> setEmail(e.target.value)}
				placeholder="Ingresa tu correo"
				></input>
				{!isValidEmail ? (
					<div id="emailFeedback" class="invalid-feedback">
						Please provide a valid Email.
					</div>
				) : null}
			<input 
				required
				className={`form-control ${isValidPassword ? "" : "is-invalid"}`}
				onBlur={handleBlurPassword}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Ingresa tu contraseña"
				></input>
				{!isValidPassword ? (
					<div id="passwordFeedback" class="invalid-feedback">
						Please provide a valid Password.
					</div>
				):null}
				
					<button onClick={handeClick}>Logeate</button>
					<button onClick={(e) => actions.logout}>Logout</button>
			
		</div>
	);
};
