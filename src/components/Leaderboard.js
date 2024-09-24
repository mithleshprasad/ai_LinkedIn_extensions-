import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(savedLeaderboard);
  }, []);

  const resetLeaderboard = () => {
    localStorage.setItem('leaderboard', JSON.stringify([]));
    setLeaderboard([]);
  };

  const reloadLeaderboard = () => {
    window.location.reload();
  };

  return (
    <div className="mt-5 mb-5">
      <div className='d-flex justify-content-center'>
        <h3 className="">Leaderboard</h3>
        <button className="btn btn-danger mx-3 mb-2" onClick={resetLeaderboard}>
          Reset 
        </button>
        <button className="btn btn-info text-light mx-1 mb-2" onClick={reloadLeaderboard}>
          Reload 
        </button>
      </div>
      <div>
        {leaderboard.length === 0 ? (
          <p className="text-center">No entries in the leaderboard yet!</p>
        ) : (
          <ul className="list-group">
            {leaderboard.map((entry, index) => (
              <li className="list-group-item" key={index}>
                {entry.player}: {entry.wins} wins, {entry.draws || 0} draws
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
