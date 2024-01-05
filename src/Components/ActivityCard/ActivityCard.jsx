import React, { useState } from "react";
import {
  PhoneMissed,
  PhoneIncoming,
  PhoneOutgoing,
  Archive,
  ArchiveRestore,
} from "lucide-react";
import { format } from "date-fns";
import styles from "./ActivityCard.module.scss";
import axios from "axios";

const ActivityCard = ({ activity, onArchive, onUnarchive }) => {
  console.log(activity);
  const [error, setError] = useState(null);
  const getIcon = (call_type, direction) => {
    if (call_type === "missed") {
      return <PhoneMissed size={15} color="red" />;
    } else {
      if (direction === "inbound") {
        return <PhoneIncoming size={15} color="green" />;
      } else {
        return <PhoneOutgoing size={15} color="blue" />;
      }
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const formattedTime = format(new Date(activity?.created_at), "d MMM HH:mm");

  const handleArchive = async () => {
    try {
      setError(null);
      onArchive();
    } catch (error) {
      setError("Error archiving activity");
    }
  };

  const handleUnarchive = async () => {
    try {
      setError(null);
      onUnarchive();
    } catch (error) {
      setError("Error archiving activity");
    }
  };

  return (
    <>
      <div className={styles.activityCard}>
        <div className={styles.activityCardIcon}>
          {getIcon(activity?.call_type, activity?.direction)}
        </div>
        <div className={styles.activityCardCallDetails}>
          <div className={styles.activityCardCallDetailsFrom}>
            {activity?.from || activity?.via}
          </div>
          <div className={styles.activityCardCallDetailsTo}>
            Tried calling on {activity?.to || activity?.via}
          </div>
        </div>
        <div className={styles.activityCardCallDetailsWithTime}>
          <div className={styles.activityCardCallDetailsDuration}>
            <b>{formatDuration(activity?.duration)}</b>
          </div>
          <div className={styles.activityCardCallDetailsTime}>
            {formattedTime}
          </div>
        </div>
        <button className={styles.activityCardCallArchiveButton}>
          {activity?.is_archived ? (
            <ArchiveRestore size={18} color="red" onClick={handleUnarchive} />
          ) : (
            <Archive size={18} color="green" onClick={handleArchive} />
          )}
        </button>
      </div>
      {error && <div>{error}</div>}
    </>
  );
};

export default ActivityCard;
