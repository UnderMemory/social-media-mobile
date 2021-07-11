import axios from "axios";
import { format } from "timeago.js";
import React from 'react'
import "./comment.css";
import { Cancel } from "@material-ui/icons";


// test de composant class 
class Comment extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comments: [],
        };
    }

    // initialisation de mon composant
    async componentDidMount(){
        try {
            this.getComments()
        } catch(err) {
            console.log(err)
        }
    }

    getComments = async() => {
        const postId = this.props.postId
        const res = await axios.get(`/comments/${postId}`);
        console.log(res.data)
        this.setState({comments: res.data});
        console.log(this.state.comments)
        this.state.comments.map((comment) => {console.log(comment)})
    }

    removeComment(id){
        axios.delete(`/comments/${id}`);
    }

    render() {
        return (
           <div className="comments">
               {this.state.comments.map((comment) => {
                   return (<div className="comment-container" key={comment._id}> 
                        <div className="comment-header">
                            {/* TODO: recuperer le pseudo de l'utilisateur grâce à son ID, ne pas afficher son ID en clair*/}
                            <div className="comment-username"> {comment.UserId} </div>
                            <div className="comment-date"> {comment.date} </div>
                            <div className="comment-remove" onClick={this.removeComment(comment._id)}><Cancel/></div>
                        </div>
                        <div className="comment-body">
                            {comment.contain}
                        </div>
                   </div>)
               })}
           </div>
        );
    }
}

export default Comment;