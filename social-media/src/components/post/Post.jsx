import "./post.css";
import {MoreVert} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../comment/Comment"

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.lenght);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);
    const [displayComment, setDisplayComment] = useState(false);
    const [contain, setContain] = useState("");

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);
    
    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUser(res.data);
        };
        fetchUser();
        }, [post.userId]);
    
        const likeHandler = () => {
            try {
                axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
            } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    const handleClick = () => {
        console.log(displayComment)
        setDisplayComment(!displayComment)
    }

    // destructuration {target}
    const handleChange = ({target}) => {
        setContain(target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newComment = {
            UserId: user._id,
            PostId: post._id,
            contain: contain,
            date: new Date("now")
        };
        console.log(newComment)
        console.log(post)
        console.log(event)
        await axios.post("http://localhost:8800/api/comments/", newComment);
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="photo_de_profil" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF+post.img} alt="post_image" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="like" />
                        <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="heart" />
                        <span className="postLikeCounter">{like} ont aimé</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText" onClick={handleClick}>{post.comment} commentaires</span>
                    </div>
                </div>
            </div>
            {/* Quand on creer un commentaire il faut recharger pour voir son enregistrement */}
            {displayComment && 
                <>
                    <Comment postId={post._id}/>
                    <form onSubmit={handleSubmit}> 
                        <input type="text" placeholder="Votre commentaire" onChange={handleChange} className="comment-form"/>
                        <button type="submit" className="comment-form-submit">Envoyer</button>
                    </form>
                </>
            }
        </div>
    )
}
