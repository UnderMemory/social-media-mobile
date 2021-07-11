import "./sidebar.css";
import {RssFeed, Chat, Group, Bookmark, HelpOutline, WorkOutline, Event, School} from "@material-ui/icons";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend"

export default function Sidebar() {
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Feed 
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Chats 
                        </span>
                    </li> 
                    <li className="sidebarListItem">
                        <PlayCircleFilledIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Vidéos 
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Groupes 
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Enregistrements 
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Questions 
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Emplois 
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Évenements 
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Diplomes 
                        </span>
                    </li>
                </ul>
                <button className="sidebarButton">Voir Plus</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {Users.map(u=>(
                        <CloseFriend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}