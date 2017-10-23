import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, input } from 'react-bootstrap';
import * as authActions from '../actions/authActions';

class Login extends Component {
    static propTypes = {
        welomePage: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        if (this.state.username.length) {
            this.refs.passwordInput.focus();
        }else{
            this.refs.usernameInput.focus();
        }
    }

    handleChange(event) {
        if(event.target.name === 'username') {
            this.setState({ username: event.target.value });
        }
        if(event.target.name === 'password') {
            this.setState({ password: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        if(this.state.username.length < 1) {
            this.refs.usernameInput.focus();
        }
        if(this.state.username.length > 0 && this.state.password.length < 1) {
            this.refs.passwordInput.focus();
        }
        if(this.state.username.length > 0 && this.state.password.length > 0) {
            var userObj = {
                username: this.state.username,
                password: this.state.password
            };
            dispatch(authActions.signIn(userObj))
            this.setState({username: '', password: ''});
        }
    }

    showError() {
        console.log('this.props.username:', this.props.username);
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
                  <p style={{fontSize: '1em'}}>Username</p>
                  <input
                    label="Username"
                    ref="usernameInput"
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={this.state.username}
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
