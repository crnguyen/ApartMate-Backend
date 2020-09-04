import React from 'react'
import {NavLink, Link} from 'react-router-dom'

const NavBar = (props) => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">MERN Auth</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="#navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample07">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                    </ul>
                    {
                        props.isAuth ? 
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/profile">Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link logout-link" onClick={props.handleLogout}>Logout</span>
                            </li>
                        </ul>
                        : <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/register">Create Account</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/login">Login</NavLink>
                            </li>
                          </ul>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar

