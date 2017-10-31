//working code



import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { input, Button } from 'react-bootstrap';
import autoBind from 'react-autobind';
import * as authActions from '../actions/authActions';

class Signup extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            userEmail: ''
        };
        autoBind(this);
    }


    handleChange(event) {
        const {dispatch} = this.props;
        // console.log(dispatch);

        if (event.target.name === 'username') {
          // dispatch(authActions.resetFailedToSignUp());
          this.setState({ username: event.target.value});
        }
        
        if (event.target.name === 'userEmail') {
          this.setState({ userEmail: event.target.value});
        }

        if (event.target.name === 'password') {
          this.setState({ password: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch } = this.props;

        if (this.state.username.length 
            && this.state.password.length
            && this.state.userEmail.length) {
          const userObj = {
            userName: this.state.username,
            userAccount: this.state.userEmail,
            password: this.state.password,
          };

          console.log(JSON.stringify(userObj));

          dispatch(authActions.signUp(userObj));

          this.setState({ username: '', password: '', userEmail: ''});
        }
    }

    validateUsername() {
      return 'success';
    }

    validateUserEmail() {
      //TODO: add email format checking
      return 'success';
    }

    showError() {
        if (this.props.failedToSignUp) {
            return (
                <p style={{color: 'red'}}>User Account already exists</p>
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
                            <p style={{fontSize: '1em'}}>User Name</p>
                            <input
                                label="User Name"
                                ref="username"
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
                            <p style={{fontSize: '1em'}}>User Email</p>
                            <input
                                label="User Email"
                                ref="userEmailInput"
                                type="text"
                                help={this.validateUserEmail() === 'error' && 'A user with that email already exists!'}
                                bsStyle={this.validateUserEmail()}
                                hasFeedback
                                name="userEmail"
                                autoFocus="true"
                                placeholder="Enter user email"
                                value={this.state.userEmail}
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
                      {this.showError()}
                        <Button
                            disabled={this.validateUsername() === 'error' && true}
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
    // console.log(JSON.stringify(state));
    return {
        failedToSignUp: state.authReducer.failedToSignUp
    }
}

export default connect(mapStateToProps)(Signup);


// buggy code for #21


// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { input, Button } from 'react-bootstrap';
// import autoBind from 'react-autobind';
// import * as authActions from '../actions/authActions';

// class Signup extends Component {

//     constructor(props, context) {
//         super(props, context);
//         this.state = {
//             username: '',
//             password: '',
//             userEmail: ''
//         };
//         autoBind(this);
//     }


//     handleChange(event) {
//         const {dispatch} = this.props;
//         // console.log(dispatch);

//         if (event.target.name === 'username') {
//           // dispatch(authActions.resetFailedToSignUp());
//           this.setState({ username: event.target.value});
//         }
        
//         if (event.target.name === 'userEmail') {
//           this.setState({ userEmail: event.target.value});
//         }

//         if (event.target.name === 'password') {
//           this.setState({ password: event.target.value });
//         }
//     }

//     handleSubmit(event) {
//         event.preventDefault();

//         const { dispatch } = this.props;

//         if (this.state.username.length 
//             && this.state.password.length
//             && this.state.userEmail.length) {
//           const userObj = {
//             userName: this.state.username,
//             userAccount: this.state.userEmail,
//             password: this.state.password,
//           };

//           console.log(JSON.stringify(userObj));

//           dispatch(authActions.signUp(userObj));

//           this.setState({ username: '', password: '', userEmail: ''});
//         }
//     }

//     validateUsername() {
//       return 'success';
//     }

//     validateUserEmail() {
//       //TODO: add email format checking
//       return 'success';
//     }

//     showError() {
       
//             return (
//                 <p style={{color: 'red'}}>User Account already exists</p>
//             );
        
//     }

//     render() {
//         return (
//             <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
//                 <header style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//                     <p style={{fontSize: '2em'}}>Sign Up</p>
//                 </header>
//                 <main style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                     <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//                         <section style={{height: '5em'}}>
//                             <p style={{fontSize: '1em'}}>User Name</p>
//                             <input
//                                 label="User Name"
//                                 ref="username"
//                                 type="text"
//                                 help={this.validateUsername() === 'error' && 'A user with that name already exists!'}
//                                 bsStyle={this.validateUsername()}
//                                 hasFeedback
//                                 name="username"
//                                 autoFocus="true"
//                                 placeholder="Enter username"
//                                 value={this.state.username}
//                                 onChange={this.handleChange}
//                                 />
//                         </section>
//                         <section style={{height: '5em'}}>
//                             <p style={{fontSize: '1em'}}>User Email</p>
//                             <input
//                                 label="User Email"
//                                 ref="userEmailInput"
//                                 type="text"
//                                 help={this.validateUserEmail() === 'error' && 'A user with that email already exists!'}
//                                 bsStyle={this.validateUserEmail()}
//                                 hasFeedback
//                                 name="userEmail"
//                                 autoFocus="true"
//                                 placeholder="Enter user email"
//                                 value={this.state.userEmail}
//                                 onChange={this.handleChange}
//                                 />
//                         </section>
//                         <section style={{height: '5em'}}>
//                             <p style={{fontSize: '1em'}}>Password</p>
//                             <input
//                                 label="Password"
//                                 ref="passwordInput"
//                                 type="password"
//                                 name="password"
//                                 value={this.state.password}
//                                 placeholder="Enter password"
//                                 onChange={this.handleChange}
//                                 />
//                         </section>
//                       {this.showError()}
//                         <Button
//                             disabled={this.validateUsername() === 'error' && true}
//                             bsStyle="success"
//                             style={{margin: 'auto', width: '100%', height: '3.5em'}}
//                             onClick={this.handleSubmit}
//                             type="submit">
//                             <p style={{color: 'white', margin: '0', padding: '0', fontSize: '1.5em'}} >Sign Up</p>
//                         </Button>
//                     </form>
//                 </main>
//             </div>
//         );
//     }
// }

// function mapStateToProps(state) {
//     // console.log(JSON.stringify(state));
//     return {
//         failedToSignUp: state.authReducer.failedToSignUp
//     }
// }

// export default connect(mapStateToProps)(Signup);

