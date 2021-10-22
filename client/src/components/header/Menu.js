import React from 'react'
import { Link , NavLink} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'
// import NotifyModal from '../NotifyModal'

const Menu = () => {
    

    const { auth, theme
        // , notify
    } = useSelector(state => state)
    const dispatch = useDispatch()

    return ( 
        <ul className="navbar-nav menu ms-auto">
            
            <NavLink exact to='/get_appointments' class="main-nav" activeStyle={{
    fontWeight: "bold",
    color: "black"
  }}>Get Appoinments</NavLink>
            <NavLink exact to='/find_video_consult' class="main-nav" activeStyle={{
    fontWeight: "bold",
    color: "black"
  }}>Video Consult</NavLink>
            <NavLink exact to='/find_lab_test' class="main-nav" activeStyle={{
    fontWeight: "bold",
    color: "black"
  }}>Lab tests</NavLink>
                
                <li className="nav-item dropdown"
                    // style={{ opacity: 1 }}
                >
                    {/* <span className="nav-link position-relative" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
User */}
                        {/* <span className="material-icons" 
                        style={{color: notify.data.length > 0 ? 'crimson' : ''}}>
                            favorite
                        </span>

                        <span className="notify_length">{notify.data.length}</span> */}

                    {/* </span> */}

                     <div className="dropdown-menu" aria-labelledby="navbarDropdown" 
                     style={{transform: 'translateX(75px)'}} 
                   > 
                        {/* <NotifyModal /> */}
                   </div>
                        
                </li> 
           
            
           <li className="nav-item dropdown" style={{opacity: 1}} > 
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                    <Avatar src={auth.user.avatar} size="medium-avatar" /> 
                   </span> 

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to=
                        {`/profile/${auth.user._id}`}
                    >Profile</Link>

                    <label htmlFor="theme" className="dropdown-item"
                    onClick={() => dispatch({
                        type: GLOBALTYPES.THEME, payload: !theme
                    })}>
                        {theme ? 'Light mode' : 'Dark mode'}
                    </label>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/"
                    onClick={() => dispatch(logout())}>
                        Logout
                    </Link>
                </div>
            </li>
        </ul>
 

    )
}

export default Menu