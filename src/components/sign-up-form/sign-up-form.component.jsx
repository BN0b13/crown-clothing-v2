import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils';

import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('Passwords Do Not Match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(err) {
            if(err.code === 'auth/email-already-in-use') {
                alert('Email already in use - cannot create user');
            } else {
                console.log('There was an error: ', err);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up With Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text" 
                    name="displayName" 
                    value={displayName} 
                    onChange={handleChange} 
                    required 
                />

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

                <FormInput 
                    label="Confirm Password" 
                    type="password" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange} 
                    required 
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;