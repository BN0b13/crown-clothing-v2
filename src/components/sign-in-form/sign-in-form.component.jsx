import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(err) {
            if(err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                alert('Incorrect Sign In Information. Please Try Again.');
            } else {
                console.log('There was an error signing in user: ', err);
            }
        }
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In With Your Email and Password</span>
            <form onSubmit={() => handleSubmit}>
                <FormInput
                    label="Email"
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={handleChange} 
                    required 
                />

                <FormInput 
                    label="Password" 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handleChange} 
                    required 
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type ="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;