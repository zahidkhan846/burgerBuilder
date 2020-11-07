import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../../Logo/Logo";
import NavItems from "./../NavItems/NavItems";
import SideDrawerMenu from "../SideDrawer/SideDrawerMenu";

function Toolbar(props) {
  return (
    <div>
      <header className={styles.Toolbar}>
        <div className={styles.MobileSidebar}>
          <SideDrawerMenu showSide={props.showSide} />
        </div>

        <div className={styles.Logo}>
          <Logo />
        </div>

        <nav className={styles.DesktopToolbar}>
          <NavItems isAuthenticated={props.isAuth} />
        </nav>
      </header>
    </div>
  );
}

export default Toolbar;
