import React ,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import {auth,createUserProfileDocument} from './firebase/firebase.utils.js';
import { connect } from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'

class App extends Component{
  
  unSubscribeFromAuth = null;

  componentDidMount(){

    const {setCurrentUser} = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
            });
        });

      } else{
          setCurrentUser(userAuth);
      }
     })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render (){
    return(
      <div >
        <Header/>
        <Switch>
          <Route exact path="/" component={Homepage} /> 
          <Route  path="/shop" component={ShopPage} /> 
          <Route  path="/signin" component={SignInAndSignUpPage} /> 
        </Switch>
      </div>
    )
  }
    
  
}


const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(null,mapDispatchToProps)(App);
