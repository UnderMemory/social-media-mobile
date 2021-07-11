import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    // Permet de ne pas rafraichir la page lorqu'on clique sur le bouton
    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
          );
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Memory Share</h3>
                    <span className="loginDesc">
                        Connecte toi avec tes amis et le monde entier sur Memory Share
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" on onSubmit={handleClick}>
                        <input 
                            placeholder="Email" 
                            type="email" required 
                            className="loginInput" 
                            ref={email}
                        />
                        <input 
                            placeholder="Password" 
                            type="password" 
                            required 
                            minLenght="6" 
                            className="loginInput" 
                            ref={password}
                        />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Se connecter"
                            )}
                        </button>
                        <span className="loginForgot">Mot de passe oublié ?</span>
                        <button className="loginRegisterButton">
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Créer un nouveau compte !"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
