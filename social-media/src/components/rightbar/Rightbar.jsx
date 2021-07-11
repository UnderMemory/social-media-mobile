import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(
        currentUser.followings.includes(user?.id)
    );
   
  
    useEffect(() => {
        console.log(AuthContext)
        const getFriends = async ()=> {
            try{
                console.log(user._id)
                console.log(user)
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        }
        getFriends();
        console.log(currentUser)
    }, [user])

  

    const handleClick = async () => {
        try {
          if (followed) {
            await axios.put(`/users/${user._id}/unfollow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
          } else {
            await axios.put(`/users/${user._id}/follow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "FOLLOW", payload: user._id });
          }
          setFollowed(!followed);
        } catch (err) {
        }
      };

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}gift.png`} alt="anniversaire" />
                    <span className="birthdayText">
                        <b>Prénom Nom</b> et <b>3 autres amis</b> sont nés aujourd'hui !
                    </span>
                </div>
                <img src={`${PF}ad.png`} alt="ad" className="rightbarAd" />
                <h4 className="rightbarTitle">Amis en ligne</h4>
                <ul className="rightbarFriendList">
                   {Users.map(u=>(
                       <Online key={u.id} user={u}/>
                   ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbarTitle">A Propos</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Ville : </span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">De : </span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Genre : </span>
                        <span className="rightbarInfoValue">
                            {user.genre === 1 
                            ? "Femme" 
                            : user.genre === 1 
                            ? "Homme" 
                            : "Non-genré"}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">Amis</h4>
                <div className="rightbarFollowings">
                    {friends.map(friend => (
                        <Link to={"/profile/" + friend.username} style={{textDecoration:"none"}}>
                            <div className="rightbarFollowing">
                                <img 
                                    src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} 
                                    alt="photo_amis" 
                                    className="rightbarFollowingImg" 
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
    ) 
}
