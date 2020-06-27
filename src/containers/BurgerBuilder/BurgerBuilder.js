import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/action/index';

import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorHandler';

class BurgerBuilder extends Component{

    state = {
        //purchaseable: false,
        purchasing: false,
       
    };

    componentDidMount(){
        
       console.log(this.props);
       this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;

    }

    purChaseHandler = () => {

        this.setState({purchasing: true});
    }

    purChaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    }

    render() {

        const disableInfo = {
            ...this.props.ings 
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0;
        }

        let orderSummary = null;
        
        let burger = this.props.error ? <p>Ingredients can't be loaded!!</p> : <Spinner />

        if(this.props.ings)
        {
            burger =  (
                <Auxillary>
                    <Burger  ingredients = { this.props.ings}/>
                    <BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded} 
                    ingredientRemove = {this.props.onIngredientRemoved} 
                    disabled = {disableInfo}
                    purchaseable = {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purChaseHandler} 
                    price = {this.props.price}/>
                </Auxillary>
            );

            orderSummary = <OrderSummary  
                ingredients = {this.props.ings}
                price = {this.props.price}
                purchaseCaneled = {this.purChaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler} />
        }

        return (
            <Auxillary>
                <Modal show = {this.state.purchasing} modalClosed = {this.purChaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addingredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeingredients(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased:  () => dispatch(actions.purchaseInit()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));