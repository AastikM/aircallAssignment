import { useState } from "react";
import styles from "./Main.module.scss";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
export default function Main() {
  const [tab, setTab] = useState("ActivityFeed");
  return (
    <div>
      <div className={styles.mainContainer}>
        <div
          className={`${styles.mainContainerTabButton} ${
            tab === "ActivityFeed" ? styles.mainContainerTabActive : ""
          }`}
          onClick={() => {
            setTab("ActivityFeed");
          }}
        >
          Activity Feed
        </div>
        <div
          className={`${styles.mainContainerTabButton} ${
            tab === "Archives" ? styles.mainContainerTabActive : ""
          }`}
          onClick={() => {
            setTab("Archives");
          }}
        >
          Archives
        </div>
      </div>
      <div className={styles.MainContent}>{tab === "ActivityFeed" ? <ActivityFeed /> : <ActivityFeed archives={true} />}</div>
    </div>
  );
}
