import React from "react";
import Logo from "../../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import styles from "./SideDrawer.module.css";
import Aux from "../../../HOC/Auxiliary/Auxiliary";
import Backdrop from "../../../UserInterface/Backdrop/Backdrop";
// import { withRouter } from "react-router-dom";

const SideDrawer = (props) => {
  // console.log(props);
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.showSidedrawer) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }

  return (
    <Aux>
      <Backdrop
        show={props.showSidedrawer}
        closeBackdrop={props.closeSidedrawer}
      />
      <div
        className={attachedClasses.join(" ")}
        onClick={props.closeSidedrawer}
      >
        <div className={styles.Logo}>
          <Logo />
        </div>
        <NavItems isAuthenticated={props.isAuth} />
      </div>
    </Aux>
  );
};

export default SideDrawer;
// export default withRouter(SideDrawer);

//withRoter is an high order componenent provided by react router dom
//so we can pass the properties given by RRD to their children components
//eventually its only passed to parent component they are using RRD
//these properties are match, history, location and params
