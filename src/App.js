import React ,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import {auth,createUserProfileDocument} from './firebase/firebase.utils.js';


class App extends Component{
  constructor() {
    super();

    this.state ={
      currentUser:null
    }
  }

  unSubscribeFromAuth = null;

  componentDidMount(){
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else{
        this.setState({currentUser:userAuth});
      }
     })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render (){
    return(
      <div >
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={Homepage} /> 
          <Route  path="/shop" component={ShopPage} /> 
          <Route  path="/signin" component={SignInAndSignUpPage} /> 
        </Switch>
      </div>
    )
  }
    
  
}

export default App;
