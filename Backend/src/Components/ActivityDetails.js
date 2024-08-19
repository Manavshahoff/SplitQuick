import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ActivityDetails() {
  const location = useLocation();
  const { activity } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activity) {
      setLoading(false);
    } else {
      setError('Invalid activity data');
      setLoading(false);
    }
  }, [activity]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const participantsWithShares = activity.participants.map(participant => {
    const emailKey = participant.email.replace(/\./g, '_');
    return {
      ...participant,
      owedAmount: activity.customShares[emailKey] !== undefined ? activity.customShares[emailKey] : activity.amount / activity.participants.length
    };
  });

  return (
    <div className="activity-details-container">
      <h1>Activity Details</h1>
      <div className="activity-details">
        <div><strong>Expense Name:</strong> {activity.expenseName}</div>
        <div><strong>Amount:</strong> ${activity.amount.toFixed(2)}</div>
        <div><strong>Split Method:</strong> {activity.splitMethod}</div>
        <div><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</div>
        <div><strong>Participants:</strong>
          <ul>
            {participantsWithShares.map((participant, index) => (
              <li key={index}>
                {participant.name} ({participant.email}): ${participant.owedAmount !== undefined ? participant.owedAmount.toFixed(2) : 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetails;
