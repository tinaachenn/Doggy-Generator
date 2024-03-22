import React from 'react';

const BanList = ({ banList }) => {
  return (
    <div className="ban-list">
      <h3>Ban List</h3>
      <br />
      <ul>
        {banList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default BanList;
