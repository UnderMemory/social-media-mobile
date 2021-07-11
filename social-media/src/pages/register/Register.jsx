import axios from "axios";
import {useRef} from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    // Permet de vérifier si les 2 MDP sont identiques pour établir l'inscription
    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
          passwordAgain.current.setCustomValidity("Mot de passe non identique au premier !");
        } else {
          const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
          };
          try {
            await axios.post("http://localhost:8800/api/auth/register", user);
            history.push("/login");
          } catch (err) {
            console.log(err);
          }
        }
      };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Memory Share</h3>
                    <span className="loginDesc">Connecte toi avec tes amis et le monde entier sur Memory Share</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                           placeholder="Pseudo" 
                           required 
                           ref={username} 
                           className="loginInput" 
                        />
                        <input
                            placeholder="Email"
                            required 
                            ref={email} 
                            className="loginInput"
                            type="email" 
                        />
                        <input
                            placeholder="Mot de passe" 
                            required 
                            ref={password} 
                            className="loginInput" 
                            type="password"
                            minLength="6"
                        />
                        <input
                            placeholder="Vérification du mot de passe" 
                            required 
                            ref={passwordAgain} 
                            className="loginInput" 
                            type="password"
                        />
                        <button className="loginButton" type="submit">S'inscrire</button>
                        <button className="loginRegisterButton">Déjà un compte ?</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
