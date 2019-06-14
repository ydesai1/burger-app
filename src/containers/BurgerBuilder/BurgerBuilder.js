import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
//this is a stateful component
// this is a container here we plan on managing state for burger we are about to build.
//Here i want to return graphical representation of the burger i build. and below that i want to have my build controls.
//

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState(ingredients){
  //here we want to turn ingredients object to an array of values
    const sum = Object.keys(ingredients)  // this will create an array of string entries(salad, bacon etc.)
    .map(igKey => {                       //we are using map method to get values which ammount of the ingredients and not the names
      return ingredients[igKey]           //we are using igKey to replace the old value(salad, bacon etc.) with new values(0,2,1, etc.). so now, ingredients[igKey] is the ammount
    })
    .reduce((sum,el)=>{                   //we are using reduce method to turn it into a single number(sum of ingredients). for that we have starting number of 0 and then we have a function which is executed on eah element in this mapped array.
      return sum + el;                    // sum is constantly updated current sum untilthe currwnt iteration until this function is executed and once it is executed on all array elements sum is final result. el is number(ingredients[igKey]).
    },0);
    this.setState({purchasable: sum > 0});
  }


addIngredientHandler = (type) => {
  const oldCount = this.state.ingredients[type];
  const updatedCount = oldCount + 1;
  const updatedIngredients = {
    ...this.state.ingredients                 //creating new javascript object to distribute properties of old ingredient state into the new one we are creating here on this line
  };
  updatedIngredients[type] = updatedCount;  //here i am taking update ingredients object. access the type for which i have to update the ingredient and set count which is the amount of the ingredient.
  const priceAddition = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice + priceAddition;
  this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  this.updatePurchaseState(updatedIngredients);
}

purchaseHandler =() =>{
  this.setState({purchasing: true});
}

removerIngredientHandler = (type) => {
  const oldCount = this.state.ingredients[type];
  if(oldCount <= 0) {
    return;
  }
  const updatedCount = oldCount - 1;
  const updatedIngredients = {
    ...this.state.ingredients
  };
  updatedIngredients[type] = updatedCount;
  const priceDeduction = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice - priceDeduction;
  this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  this.updatePurchaseState(updatedIngredients);
}

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0 // here we are updating keys of disabledInfo with either true or false based on the value is less/equal to zero. and disabledInfo[key] is value of ingredients array ex. 0,2,3.
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded = {this.addIngredientHandler}         //Hooking addIngredientHandler up to the more buttons in build controls. for that we need pass a property to BuildControls and there I will add ingredientAdded which holds reference to addIngredientHandler. so to distribute ingredientAdded to buildControl we pass it to individual buildcontrol we have.
          ingerdientRemoved = {this.removerIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
