import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss'

const Authentication = () => {
    return(<div className='authentication-container'>
        {/* <button onClick={logGoogleUser}>Sign In With Google Popup</button> */}
        {/* <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button> */} 
        <SignInForm></SignInForm>
        <SignUpForm></SignUpForm>
    </div>)
}

export default Authentication;