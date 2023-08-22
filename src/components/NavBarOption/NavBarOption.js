import React from "react";
import styles from "./NavBarOption.module.scss";

export default function NavBarOption({ active, text, Icon }){
  return(
    <div className={styles.NavBarOption}>
      <Icon />
      <h2>{text}</h2>
    </div>
  )
}