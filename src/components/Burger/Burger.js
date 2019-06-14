import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

//this file is the burger we really are rendering to the screen
// IN BURGER COMPONENT WE ARE RECEIVING INGREDIENTS AS PROPS
//In transformedIngredients function we are converting object of items to an array.
//in map function we want to transform string value into an array with as many elements as we have ingredients for a given ingredient.
// so if we have 2 cheese ingredient then i want to transform string cheese into an array which simply contains 2 elements.
//
const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)     //Object.keys() gives you array of the keys, values are not part of the array.
    .map(igKey => {                                               // map() executes a function on each element in the array. igKey is ingredeint key.
      return [...Array(props.ingredients[igKey])].map((_,i)=>{    // for 2nd map(argument, index)
        return <BurgerIngredient key={igKey + i} type={igKey} />; // here igKey is something like salad and i is amount ex.1,2,3, so that it wil create unique key for ingredient.
      });
    })
    .reduce((arr, el)=>{                                          //reduce allows us to transfotm an array into something else. it takes function as input and this functions receives 2 arguments.  passed in automatically by javascript. the previous value(arr) and current value(el)
        return arr.concat(el)                                     // you want to adjust reduced value by return. it will loop through all elements then simply add them to the initial value step by step.so arr is always updated.
    },[]);
    console.log(transformedIngredients)                                                   // [] -> initial value of the reduced value
    if(transformedIngredients.length===0){
      transformedIngredients = <p>Please start adding ingredients</p>
    }

  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
