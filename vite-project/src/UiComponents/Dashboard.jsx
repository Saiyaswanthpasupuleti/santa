import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEventContext } from '../context/eventContext';
import axios from 'axios';
import ExcelUpload from './ExcelUpload';
import ParticipantList from './ParcipentList';

const Dashboard = () => {
  const { eventId: routeEventId } = useParams();
  const { eventId } = useEventContext();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showParticipantData, setShowParticipantData] = useState(false);

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-santa-pairs/?eventID=${eventId}`);
      if (response.status === 200 && response.data) {
        setEventData(response.data);
        if (response.data.santaPairs && response.data.santaPairs.length > 0) {
          setShowParticipantData(true);
        }
      }
    } catch (err) {
      console.log(err);
      setError('Failed to load event data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [routeEventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {showParticipantData ? (
        <ParticipantList eventData={eventData} />
      ) : (
        <ExcelUpload setShowParticipantData={setShowParticipantData} setEventData={setEventData} />
      )}
    </div>
  );
};

export default Dashboard;