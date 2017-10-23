import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { input, Button } from 'react-bootstrap';
import * as authActions from '../actions/authActions';

class Signup extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        };
    }

    static propTypes = {
        failedToSignUp: PropTypes.string.isRequired
    };



    handleChange(event) {
        const {dispatch} = this.props;

        if (event.target.name === 'username') {
          dispatch(authActions.resetFailedToSignUp());
          this.setState({ username: event.target.value});
        }
        if (event.target.name === 'password') {
          this.setState({ password: event.target.value });
        }
        if (event.target.name === 'confirm-password') {
          this.setState({ confirmPassword: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch } = this.props;

        if (this.state.username.length && this.state.password.length && this.state.confirmPassword.length) {
          const userObj = {
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
          };

          dispatch(authActions.signUp(userObj));

          this.setState({ username: '', password: '', confirmPassword: ''});
        }
    }

    validateUsername() {
        return 'success';
    }

    validateConfirmPassword() {
        if (this.state.password !== this.state.confirmPassword) {
            return (
                <p style={{color: 'red'}}>Password should match confirm password</p>
            );
        }
    }

    showError() {
        if (this.props.failedToSignUp) {
            return (
                <p style={{color: 'red'}}>Username already exists</p>
            );
        }
    }

    render() {
        return (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <header style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{fontSize: '2em'}}>Sign Up</p>
                </header>
                <main style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <section style={{height: '5em'}}>
                            <p style={{fontSize: '1em'}}>Username</p>
                            <input
                                label="Username"
                                ref="usernameInput"
                                type="text"
                                help={this.validateUsername() === 'error' && 'A user with that name already exists!'}
                                bsStyle={this.validateUsername()}
                                hasFeedback
                                name="username"
                                autoFocus="true"
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
                                value={this.state.password}
                                placeholder="Enter password"
                                onChange={this.handleChange}
                                />
                        </section>
                        <section style={{height: '5em'}}>
                            <p style={{fontSize: '1em'}}>Confirm password</p>
                            <input
                                label="Confirm Password"
                                ref="confirmPasswordInput"
                                help={this.validateConfirmPassword() === 'error' && 'Your password doesn\'t match'}
                                type="password"
                                name="confirm-password"
                                placeholder="Enter password again" value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                />
                        </section>
                        {this.showError()}
                        {this.validateConfirmPassword()}
                        <Button
                            disabled={this.validateUsername() === 'error' || this.validateConfirmPassword() === 'error' && true}
                            bsStyle="success"
                            style={{margin: 'auto', width: '100%', height: '3.5em'}}
                            onClick={this.handleSubmit}
                            type="submit">
                            <p style={{color: 'white', margin: '0', padding: '0', fontSize: '1.5em'}} >Sign Up</p>
                        </Button>
                    </form>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        failedToSignUp: state.authReducer.failedToSignUp
    }
}

export default connect(mapStateToProps)(Signup);
