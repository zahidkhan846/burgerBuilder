import React from "react";
import styles from "./Logo.module.css";
import burgerLogo from "./../Assets/Imeges/burger-logo.png";

const Logo = (props) => {
  return (
    <div className={styles.Logo}>
      <img src={burgerLogo} alt="My Burger" />
    </div>
  );
};

export default Logo;
