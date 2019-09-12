import React from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'

import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component.jsx';
import CartDropdown from '../cart-dropdown/cart-dropdown.component.jsx';    
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect';

import './header.styles.scss';


const Header = ({currentUser,hidden}) => {
    return (
        <div className="header">
            <Link to="/" className="logo-container">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link to="shop" className="option">
                    Shop
                </Link>
                <Link to="shop" className="option">
                    Contact
                </Link>
               
               {
                   currentUser ? 
                   <div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
                   :
                   <Link className="option" to='/signin'>SIGN IN</Link>
               }
               <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown />
            }
            
        </div>
    )
}

const mapStateToProps =createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})

export default connect(mapStateToProps)(Header)
