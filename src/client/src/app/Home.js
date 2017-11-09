import React, { Component, PropTypes } from 'react';

class Home extends Component {
    render() {
        return (
            <div style={{height: '100%'}} >
                {this.props.children}
            </div>
        );
    }
}


export default Home;
