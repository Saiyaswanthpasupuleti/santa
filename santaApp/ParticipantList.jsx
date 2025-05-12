// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";
// // import * as Clipboard from 'expo-clipboard';
// import Toast from "react-native-toast-message";
// import Icon from "react-native-vector-icons/FontAwesome";

// export default function ParticipantList({ route }) {
//   const [santaPairs, setSantaPairs] = useState([]);
//   const { eventData, eventId } = route.params;

//   useEffect(() => {
//     const updatedData = eventData.santaPairs.map((item) => {
//       const [first, second] = item.santaPair.split(" -> ");
//       return {
//         ...item,
//         santaPair: { first, second },
//       };
//     });
//     setSantaPairs(updatedData);
//   }, []);

//   const copyToClipboard = (url) => {
//     Clipboard.setStringAsync(url);
//     Toast.show({
//       type: "success",
//       text1: "Copied!",
//       text2: "URL copied to clipboard",
//     });
//   };

//   return (
//     <ImageBackground
//       source={require('./assets/pexels-x-y-1263157-2403402.jpg')}
//       style={styles.background}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           <Text style={styles.title}>🎁 Secret Santa Pairs List</Text>
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             {santaPairs.length === 0 ? (
//               <Text style={styles.loadingText}>Loading Santa pairs...</Text>
//             ) : (
//               santaPairs.map((item, index) => (
//                 <View key={index} style={styles.card}>
//                   <Text style={styles.cardText}>
//                     <Text style={styles.name1}>{item.santaPair.first}</Text> is Secret Santa for{" "}
//                     <Text style={styles.name2}>{item.santaPair.second}</Text>
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() =>
//                       copyToClipboard(`http://localhost:5173/reveal-secret-santa?eventID=${eventId}&id=${item.id}`)
//                     }
//                   >
//                     <Icon name="link" size={20} color="#60a5fa" />
//                   </TouchableOpacity>
//                 </View>
//               ))
//             )}
//           </ScrollView>
//         </View>
//         <Toast />
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1, resizeMode: "cover" },
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   container: {
//     padding: 20,
//     borderRadius: 20,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     width: "90%",
//     maxHeight: "90%",
//   },
//   title: {
//     fontSize: 28,
//     color: "#fff",
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   scrollContainer: {
//     paddingBottom: 20,
//   },
//   loadingText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 16,
//   },
//   card: {
//     backgroundColor: "rgba(0,0,0,0.3)",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.2)",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   cardText: {
//     color: "#fff",
//     flex: 1,
//     fontSize: 16,
//     marginRight: 10,
//   },
//   name1: {
//     color: "#9c445a",
//     fontWeight: "bold",
//   },
//   name2: {
//     color: "#15803d",
//     fontWeight: "bold",
//   },
// });
