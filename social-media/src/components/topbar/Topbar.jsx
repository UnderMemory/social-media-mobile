import "./topbar.css";
import { Search, Person, Chat, Notifications, ExitToApp} from "@material-ui/icons";
import {Link, Redirect} from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";

export default function Topbar() {

    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const handleClick = (event) => {
        localStorage.removeItem('user');
    }

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Memory Share</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Rechercher des amis ou des posts !" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Accueil</span>
                    <span className="topbarLink">Fil d'actualité</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">3</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img 
                    src={
                        user.profilePicture 
                        ? PF + user.profilePicture 
                        : PF + "person/noAvatar.png"
                    } 
                        alt="" 
                        className="topbarImg" 
                    />
                </Link>
                <button onClick={handleClick} className="deconnection">
                    <ExitToApp/>
                </button>
            </div>
        </div>
    )
}