// Working code


import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { input, Button } from 'react-bootstrap';


class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <header style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{fontSize: '2em'}}>Welcome to WeCheck!</p>
            </header>
            <main style={{display: 'flex'}}>
                <section style={{width: '100%', height: '3.5em', display: 'flex'}}>
                  <Link to="/signup">
                    <Button
                      bsStyle="success"
                      style={{margin: '1em', width: '12em', height: '3.5em'}}
                     >
                        <p style={{margin: '0', padding: '0', fontSize: '1.5em'}}>Sign Up</p>
                    </Button>
                  </Link>

                  <Link to="/signin">
                    <Button style={{margin: '1em', width: '12em', height: '3.5em'}}
                            bsStyle="default"
                    >
                      <p style={{margin: '0', padding: '0', fontSize: '1.5em'}}>Sign In</p>
                    </Button>
                  </Link>
                </section>
            </main>
          </div>
      );
    }
}

export default WelcomePage


// buggy code #24

// import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { input, Button } from 'react-bootstrap';


// class WelcomePage extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//           <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
//             <header style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//                 <p style={{fontSize: '2em'}}>Welcome to WeCheck!</p>
//             </header>
//             <main style={{display: 'flex'}}>
//                 <section style={{width: '100%', height: '3.5em', display: 'flex'}}>
//                   <Link to="/signup">
//                     <Button
//                       bsStyle="success"
//                       style={{margin: '1em', width: '12em', height: '3.5em'}}
//                      >
//                         <p style={{margin: '0', padding: '0', fontSize: '60px'}}>Sign Up</p>
//                     </Button>
//                   </Link>

//                   <Link to="/signin">
//                     <Button style={{margin: '1em', width: '12em', height: '3.5em'}}
//                             bsStyle="default"
//                     >
//                       <p style={{margin: '0', padding: '0', fontSize: '1.5em'}}>Sign In</p>
//                     </Button>
//                   </Link>
//                 </section>
//             </main>
//           </div>
//       );
//     }
// }

// export default WelcomePage