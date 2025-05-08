import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function OrganizerScreen({ onAuth }) {
  const [eventId, setEventId] = useState('');
  const [passcode, setPasscode] = useState('');
  const navigation = useNavigation();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const zoomAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const inputFade1 = useRef(new Animated.Value(0)).current;
  const inputFade2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(zoomAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(inputFade1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(inputFade2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const onSubmit = () => {
    if (eventId && passcode) {
      onAuth && onAuth();
      navigation.navigate('ExcelScreen');
    } else {
      Alert.alert('Validation Error', 'Please fill in both Event ID and Passcode.');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/pexels-x-y-1263157-2403402.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay} />

      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Animated.Text
          style={[
            styles.title,
            {
              transform: [
                { translateY: slideAnim },
                { scale: zoomAnim },
              ],
            },
          ]}
        >
          Event Organizer
        </Animated.Text>

        <Animated.View style={{ opacity: inputFade1 }}>
          <Input
            placeholder="Enter Event ID"
            value={eventId}
            onChangeText={setEventId}
            placeholderTextColor="#ccc"
            inputStyle={{ color: '#fff' }}
            label="Event ID"
            labelStyle={{ color: '#fff' }}
            leftIcon={<Icon name="id-badge" size={20} color="#fff" />}
          />
        </Animated.View>

        <Animated.View style={{ opacity: inputFade2 }}>
          <Input
            placeholder="Enter Passcode"
            value={passcode}
            onChangeText={setPasscode}
            secureTextEntry
            placeholderTextColor="#ccc"
            inputStyle={{ color: '#fff' }}
            label="Passcode"
            labelStyle={{ color: '#fff' }}
            leftIcon={<Icon name="lock" size={20} color="#fff" />}
          />
        </Animated.View>

        <Button
          title="Create Unique ID"
          type="outline"
          buttonStyle={styles.outlineButton}
          titleStyle={{ color: '#fff' }}
        />

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Button
            title="Continue"
            onPress={onSubmit}
            buttonStyle={styles.continueButton}
          />
        </Animated.View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginTop: 15,
  },
  outlineButton: {
    borderColor: '#fff',
    marginBottom: 15,
  },
});
