// import React, { useState, useEffect } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { useRoute } from '@react-navigation/native';
// import { useEventContext } from '../context/eventContext'; // ensure this is React Native compatible
// import ExcelUpload from './ExcelUpload'; // needs to be adapted to RN
// import ParticipantList from './ParticipantList'; // needs to be adapted to RN

// const Dashboard = () => {
//   const route = useRoute();
//   const { eventId: routeEventId } = route.params || {};
//   const { eventId } = useEventContext();

//   const [eventData, setEventData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showParticipantData, setShowParticipantData] = useState(false);

//   const fetchEventData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/get-santa-pairs/?eventID=${eventId}`);
//       if (response.status === 200 && response.data) {
//         setEventData(response.data);
//         if (response.data.santaPairs && response.data.santaPairs.length > 0) {
//           setShowParticipantData(true);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load event data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEventData();
//   }, [routeEventId]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {showParticipantData ? (
//         <ParticipantList eventData={eventData} />
//       ) : (
//         <ExcelUpload setShowParticipantData={setShowParticipantData} setEventData={setEventData} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   centered: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default Dashboard;
