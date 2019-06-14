import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

//outputting build controls
const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'}
]

//inside the div i want to loop through all the contorls and render a build control for each of them.
// in buildcontrols I pass it on to the individdual buildcontrol so that this buildcontrol can call that.
const buildControls = (props) => (
  <div className={classes.BuildControls}>
  <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (               //map each control of each element of controls array into a build control
      <BuildControl
      key={ctrl.label}
      label= {ctrl.label}
      added={() =>props.ingredientAdded(ctrl.type)} //here we pass it to individual buildcontrol we have. so when more is clicked then pass props.ingredientAdded. added property that we pass to this build contorl needs to be connected to MORE button.
      removed={()=> props.ingerdientRemoved(ctrl.type)} //
      disabled={props.disabled[ctrl.type]}/>          //
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>ORDER NOW
    </button>
  </div>
)

export default buildControls;
