import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSplitMethod } from './SplitMethodContext';

function SelectSplitMethod() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, selectedFriends, selectedGroups } = location.state || {};
  const { setSplitMethod } = useSplitMethod();
  const [selectedParticipants, setSelectedParticipants] = useState([...selectedFriends, ...selectedGroups]);

  const handleSelectMethod = (method) => {
    setSplitMethod(method);
    navigate("/addexpense", { state: { email, selectedFriends, selectedGroups } });
  };

  const handleParticipantChange = (participant, isSelected) => {
    setSelectedParticipants(prev =>
      isSelected ? [...prev, participant] : prev.filter(p => p !== participant)
    );
  };

  const renderParticipantCheckbox = (participant) => (
    <div key={participant} className="participant-checkbox">
      <input
        type="checkbox"
        id={participant}
        checked={selectedParticipants.includes(participant)}
        onChange={(e) => handleParticipantChange(participant, e.target.checked)}
      />
      <label htmlFor={participant}>{participant}</label>
    </div>
  );

  return (
    <div className="form-container">
      <h1>Select Split Method</h1>
      <div className="options">
        <div className="option" onClick={() => handleSelectMethod('Paid by you and split equally')}>
          Paid by you and split equally
        </div>
        {selectedParticipants.length > 1 && (
          <>
            <div className="option" onClick={() => handleSelectMethod('Paid by you and each owes a share')}>
              Paid by you and each owes a share
            </div>
            <div className="option" onClick={() => handleSelectMethod('Custom split')}>
              Custom split
            </div>
            <div className="participants">
              <h2>Select/Deselect Participants</h2>
              {selectedParticipants.map(renderParticipantCheckbox)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SelectSplitMethod;
