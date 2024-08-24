import React from 'react';
import profileIcon from '../Icons/User-profile.png';
import groupIcon from '../Icons/Group-user.png';
import userIcon from '../Icons/User2.png'; 
import activityIcon from '../Icons/Activity.png'; 


function Avatar({ name, iconType }) {
  if (iconType) {
    const iconSrc = {
      profile: profileIcon,
      group: groupIcon,
      user: userIcon,
      activity: activityIcon
    }[iconType];

    return (
      <div className="avatar">
        <img src={iconSrc} alt={iconType} className="icon" />
      </div>
    );
  }

  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="avatar">
      {firstLetter}
    </div>
  );
}

export default Avatar;
