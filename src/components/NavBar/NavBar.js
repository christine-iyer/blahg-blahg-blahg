import { Link } from 'react-router-dom'
import UserLogOut from '../UserLogOut/UserLogOut'
import NavBarOption from '../NavBarOption/NavBarOption';
// Finialize above line later
import styles from './NavBar.module.scss'

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


export default function NavBar({ user, setUser }) {
    return (
        <nav className={styles.NavBar}>
            {/* <Link to='/'>Home</Link> */}
            {/* &nbsp; */}
            {/* <NavBarOption /> */}
            <NavBarOption  active Icon={HomeIcon} text={<Link to='/'>Home</Link>} /> 
            <NavBarOption Icon={SearchIcon} text="Explore" />
            <NavBarOption Icon={NotificationsNoneIcon} text="Notifications" />
            <NavBarOption Icon={MailOutlineIcon} text="Messages" />
            <NavBarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
            <NavBarOption Icon={ListAltIcon} text="Lists" />
            <NavBarOption Icon={PermIdentityIcon} text={<Link to="/profile">Profile</Link>} />
            {/* <NavBarOption Icon={MoreHorizIcon} text="More" /> */}
            <UserLogOut user={user} setUser={setUser} />
            {/* | &nbsp; */}
            {/* <Link to="/posts/new">New Posts</Link> */}
        </nav>
    )
}