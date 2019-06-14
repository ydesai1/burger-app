import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';


//LAyout is a functional component and is a wrapper  implementing ToolBar and BurgerBuilder.
//props allows us to use this lauout component as a wrapper around the core content component we will render to the screen.
//in main area we use {props.children} to output component we wrap with this Layout.
// is the co
const layout = (props) => (
  <Aux>
    <div>ToolBar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);
export default layout;
