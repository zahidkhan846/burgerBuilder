import React from "react";
import styles from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";

const NavItems = (props) => {
  return (
    <ul className={styles.NavItems}>
      <NavItem link={"/"} exact>
        Burger Maker
      </NavItem>
      {props.isAuthenticated ? (
        <NavItem link={"/orders"}> My Orders </NavItem>
      ) : null}

      {!props.isAuthenticated ? (
        <NavItem link={"/signup"}> Sign In </NavItem>
      ) : (
        <NavItem link={"/logout"}> Logout </NavItem>
      )}
    </ul>
  );
};

export default NavItems;
