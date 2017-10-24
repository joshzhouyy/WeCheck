import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, input } from 'react-bootstrap';
import * as authActions from '../actions/authActions';
import autoBind from 'react-autobind';

class Login extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            userAccount: '',
            password: ''
        };
        autoBind(this);
    }

    componentDidMount() {
        if (this.state.userAccount.length) {
            this.refs.passwordInput.focus();
        }else{
            this.refs.userAccountInput.focus();
        }
    }

    handleChange(event) {
        if(event.target.name === 'userAccount') {
            this.setState({ userAccount: event.target.value });
        }
        if(event.target.name === 'password') {
            this.setState({ password: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        if(this.state.userAccount.length < 1) {
            this.refs.userAccountInput.focus();
        }
        if(this.state.userAccount.length > 0 && this.state.password.length < 1) {
            this.refs.passwordInput.focus();
        }
        if(this.state.userAccount.length > 0 && this.state.password.length > 0) {
            var userObj = {
                userAccount: this.state.userAccount,
                password: this.state.password
            };
            dispatch(authActions.signIn(userObj))
            this.setState({userAccount: '', password: ''});
        }
    }

    showError() {
        console.log('this.props.userAccount:', this.props.userAccount);
        if (this.props.failedToSignIn == true) {
            return (
                <p style={{color: 'red'}}>Failed to sign in</p>
            );
        }
    }

    render() {
      return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <header style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <p style={{fontSize: '2em'}}>Sign In</p>
          </header>
          <main style={{display: 'flex', justifyContent: 'center'}}>
            <form onSubmit={this.handleSubmit}>
                <section style={{height: '5em'}}>
                  <p style={{fontSize: '1em'}}>userAccount</p>
                  <input
                    label="userAccount"
                    ref="userAccountInput"
                    type="text"
                    name="userAccount"
                    placeholder="Enter userAccount"
                    value={this.state.userAccount}
                    onChange={this.handleChange}
                  />
                </section>
                <section style={{height: '5em'}}>
                  <p style={{fontSize: '1em'}}>Password</p>
                  <input
                    label="Password"
                    ref="passwordInput"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </section>
                {this.showError()}
                <section style={{height: '5em'}}>
                  <Button
                    bsStyle="success"
                    style={{margin: 'auto', width: '100%', height: '3.5em'}}
                    name="submitButton"
                    type="submit" >
                      <p style={{color: 'white', margin: '0', padding: '0', fontSize: '1.5em'}} >Login</p>
                  </Button>
                </section>
            </form>
          </main>
        </div>
      );
    }
}

function mapStateToProps(state) {
    return {
        welcomPage: state.welcomPage,
        failedToSignIn: state.authReducer.failedToSignIn
    }
}
export default connect(mapStateToProps)(Login)
