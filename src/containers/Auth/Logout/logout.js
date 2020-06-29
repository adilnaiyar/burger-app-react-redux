import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/action/index';

class Logout extends Component {

    componentDidMount(){
        this.props.onLogout();
    }

    render(){
        return (
            <Redirect to="/" />
        );
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapsDispatchToProps)(Logout);