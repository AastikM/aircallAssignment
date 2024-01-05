// ActivityFeed.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import ActivityCard from "../ActivityCard/ActivityCard";
import styles from "./ActivityFeed.module.scss";

const ActivityFeed = ({ archives }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://cerulean-marlin-wig.cyclic.app/activities"
      );
      setActivities(response.data);
    } catch (error) {
      setError("Error fetching activities");
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (activityId) => {
    try {
      setError(null);
      await axios.patch(
        `https://cerulean-marlin-wig.cyclic.app/activities/${activityId}`,
        {
          is_archived: true,
        }
      );
      // Refetch activities after successfully archiving an activity
      fetchActivities();
    } catch (error) {
      setError("Error archiving activity");
    }
  };

  const handleUnarchive = async (activityId) => {
    try {
      setError(null);
      await axios.patch(
        `https://cerulean-marlin-wig.cyclic.app/activities/${activityId}`,
        {
          is_archived: false,
        }
      );
      // Refetch activities after successfully archiving an activity
      fetchActivities();
    } catch (error) {
      setError("Error archiving activity");
    }
  };

  const handleUnarchiveAll = async () => {
    try {
      setError(null);
      await axios.patch(`https://cerulean-marlin-wig.cyclic.app/reset`);
      // Refetch activities after successfully archiving an activity
      fetchActivities();
    } catch (error) {
      setError("Error archiving activity");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className={styles.activityFeed}>
      {error && <p>Error: {error}</p>}
      {!loading ? (
        <div>
          {archives && activities.filter((activity) => activity.is_archived).length > 0 && (
            <div>
              <button
                className={styles.activityUnArchiveButton}
                onClick={handleUnarchiveAll}
              >
                Unarchive All
              </button>
            </div>
          )}
          <div className={styles.activityCardsContainer}>
            {activities
              .filter(
                (activity) =>
                  (activity.to || activity.from || activity.via) &&
                  (archives ? activity.is_archived : !activity.is_archived)
              )
              .map((activity, index) => (
                <ActivityCard
                  key={index}
                  activity={activity}
                  onArchive={() => handleArchive(activity.id)}
                  onUnarchive={() => handleUnarchive(activity.id)}
                />
              ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ActivityFeed;
