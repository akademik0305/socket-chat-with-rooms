import React from "react";

// styles
import styles from "../styles/Message.module.css";

const Messages = ({ messages, name }) => {
  return (
    <div className={styles.message}>
      {messages.map(({ data }, i) => {
        const itsMe =
          data.user.name.trim().toLowerCase() === name.trim().toLowerCase();
          const styleName = itsMe ? styles.me : styles.user;

          return (
            <div key={i} className={`${styles.message} ${styleName}`}>
              <span className={styles.user}> {data.user.name} </span>

              <div className={styles.text}> {data.message} </div>
            </div>
          )
      })}
    </div>
  );
};

export default Messages;
