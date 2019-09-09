import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component.jsx' 
import CustomButton from '../custom-button/custom-button.components.jsx';
import {auth,signInWithGoogle} from '../../firebase/firebase.utils'

import './sign-in.styles.scss';


class SignIn extends Component {

    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:'',
        }
    }
    handleSubmit= async (e) => {
        e.preventDefault();
        const {email,password} =this.state;

        try {
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''})

        } catch (error) {
            console.error(error)            
        }
    }
    handleChange = (e) =>{
        const {name,value} = e.target;
        
        this.setState({[name]:value});
    }


    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>sign in with your email and password </span>
                <form onSubmit={ this.handleSubmit} >
                    <FormInput 
                        name="email" 
                        type ="email" 
                        value={this.state.email} 
                        handleChange ={this.handleChange}
                        label="email"
                        required
                    />
                    <FormInput 
                        name="password"
                        type="password" 
                        value={this.state.password} 
                        handleChange ={this.handleChange}
                        label="password"
                        required
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with google </CustomButton>
                    </div>
                </form>
            </div>

        )
    }
}


export default SignIn;