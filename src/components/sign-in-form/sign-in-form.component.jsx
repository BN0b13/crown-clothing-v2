import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import {
    SignInContainer,
    ButtonsContainer,
} from './sign-in-form.styles';

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
        await signInWithGooglePopup();
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign In With Your Email and Password</span>
            <form onSubmit={handleSubmit}>
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
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button 
                        type ="button" 
                        buttonType={BUTTON_TYPE_CLASSES.google} 
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;