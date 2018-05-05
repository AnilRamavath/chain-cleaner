import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import LoginwithGoogle from './LoginwithGoogle';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
            <div className="limiter">
                <div className="container-login100 back-login">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={this.onSubmit}>
                            <span className="login100-form-title p-b-1" style={{marginTop:"-40px", color:'#52595b', fontSize:'16px',fontFamily: 'Poppins-Regular'}}>
                                Welcome to the
                            </span>
                            <span className="login100-form-title p-b-48">
                                <img src={require('../../public/images/l.jpeg')} style={{width:'240px'}} alt="true" />
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                <input
                                  value={email}
                                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                                  type="text"
                                  className="input100"
                                  placeholder="Email"
                                />
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Enter password">
                                <span className="btn-show-pass">
                                    <i className="zmdi zmdi-eye" />
                                </span>
                                 <input
                                  value={password}
                                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                                  type="password"
                                  className="input100"
                                  placeholder="Password"
                                />
                            </div>

                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"/>
                                    <button className="login100-form-btn" disabled={isInvalid} type="submit">
                                      Sign In
                                    </button>
                                </div>
                            </div>


                             <div className="text-center p-t-10">
                                <span className="txt1">
                                     { error && <p style={{color:'#aa1d1d'}}>{error.message}</p> }
                                </span>
                            </div>

                            <div className="text-center p-t-10">
                                <span className="txt1">
                                     <PasswordForgetLink />
                                </span>
                            </div>

                            <div className="text-center p-t-15">
                                <span className="txt1">
                                    <SignUpLink />
                                </span>
                            </div>

                            <hr />
                            <div className="text-center p-t-15">
                                <span className="txt1">
                                    <LoginwithGoogle />
                                </span>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};