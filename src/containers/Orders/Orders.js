import React, {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import * as actions from '../../store/action/index';
import withErrorhandler from '../../hoc/withErrorhandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/spinner';

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render(){

        let orders = <Spinner />;

        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order 
                key = {order.id}
                ingredients = {order.ingredients}
                price = {order.price}/>
            ));
            
        };

        return (
            <div>
                {orders}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(Orders, axios));