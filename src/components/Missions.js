import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMissions,
} from '../redux/missions/MissionSlice';
import './styles/Missions.css';

function Missions() {
  const dispatch = useDispatch();
  const missionItem = useSelector((state) => state.missions);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/missions');
        const data = await response.json();
        dispatch(setMissions(data));
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchMissions();
  }, [dispatch]);
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '130px' }}>Mission</th>
            <th>Description</th>
            <th rowSpan="3">Status</th>
          </tr>
        </thead>
        <tbody>
          {missionItem.missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td className="mission-name"><h4>{mission.mission_name}</h4></td>
              <td className="mission-description">{mission.description}</td>
              <td>
                <div style={{ width: '115px', marginLeft: '5px', fontSize: '12px' }}>
                  <span
                    className={`status ${
                      isMissionJoined(mission.mission_id)
                        ? 'active'
                        : ''
                    }`}
                    style={{
                      backgroundColor: isMissionJoined(mission.mission_id)
                        ? '#0290ff'
                        : 'grey',
                      padding: '2px 4px',
                      borderRadius: '5px',
                    }}
                  >
                    {isMissionJoined(mission.mission_id)
                      ? 'ACTIVE MEMBER'
                      : 'NOT A MEMBER'}
                  </span>
                </div>
              </td>
              <td style={{
                width: '130px',
                marginLeft: '10px',
              }}
              >
                <button
                  type="button"
                  onClick={() => (isMissionJoined(mission.mission_id)
                    ? handleLeaveMission(mission.mission_id)
                    : handleJoinMission(mission.mission_id))}
                  className={`join-button ${
                    isMissionJoined(mission.mission_id) ? 'active' : ''
                  }`}
                  style={{
                    border: isMissionJoined(mission.mission_id)
                      ? '2px solid red'
                      : '2px solid grey',
                    background: 'transparent',
                    color: isMissionJoined(mission.mission_id) ? 'red' : 'grey',
                  }}
                >
                  {isMissionJoined(mission.mission_id)
                    ? 'Leave Mission'
                    : 'Join Mission'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 development
    </div>
  );
}
export default Missions;
