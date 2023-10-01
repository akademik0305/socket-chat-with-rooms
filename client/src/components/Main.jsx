import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Main.module.css";

const FIELDS = {
  NAME: "name",
  ROOM: "room"
}

const Main = () => {
  const { NAME, ROOM } = FIELDS

  const [values, setValues] = useState({[NAME]: '', [ROOM]: ''})

  const handleChange = ({target: {value, name}}) => {
    setValues({ ...values, [name]: value })
  }

  const handleClick = (event) => {
    const isDisabled = Object.values(values).some((value) => !value) 

    if(isDisabled) event.preventDefault()
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>

        <form action="#" className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              className={styles.input}
              name="name"
              value={values[NAME]}
              placeholder="Your name"
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              className={styles.input}
              name="room"
              value={values[ROOM]}
              placeholder="Room"
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <Link to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`} className={styles.group}>
            <button type="submit" className={styles.button} onClick={handleClick}>Sign In</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
