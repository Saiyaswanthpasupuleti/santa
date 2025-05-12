import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:8000';

export default function OrganizerScreen({ onAuth }) {
  const [eventId, setEventId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingId, setIsGeneratingId] = useState(false);

  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const zoomAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(zoomAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const fetchUniqueId = async () => {
    setMessage('');
    setMessageType('');
    setIsGeneratingId(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/generate-unique-id/`);
      setEventId(response.data);
      setMessage('✅ Unique Event ID generated!');
      setMessageType('success');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to generate unique ID.';
      setMessage(`❌ ${errorMsg}`);
      console.log(error);
      setMessageType('error');
    } finally {
      setIsGeneratingId(false);
    }
  };

  const validateForm = () => {
    if (!eventId.trim()) {
      setMessage('⚠️ Event ID is required');
      setMessageType('warning');
      return false;
    }
    if (!passcode.trim()) {
      setMessage('⚠️ Passcode is required');
      setMessageType('warning');
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setMessage('');
    setMessageType('');
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/create-event/`, {
        eventID: eventId,
        password: passcode,
      });

      if (response.status === 201 || response.status === 200) {
        onAuth && onAuth();
        navigation.navigate('ExcelUpload', { eventId });
        setMessage('✅ Event created successfully!');
        setMessageType('success');
      } else {
        const errorMsg = response.data.error || 'Something went wrong.';
        setMessage(`❌ ${errorMsg}`);
        setMessageType('error');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to create event.';
      setMessage(`❌ ${errorMsg}`);
      console.log(error);
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/pexels-x-y-1263157-2403402.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay} />

      <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: zoomAnim }] }]}>
        <Text style={styles.title}>Event Organizer</Text>

        <Input
          placeholder="Enter Event ID"
          value={eventId}
          onChangeText={setEventId}
          inputStyle={{ color: 'white' }}
          placeholderTextColor="#ccc"
          disabled={isSubmitting || isGeneratingId}
        />
        <Input
          placeholder="Enter Passcode"
          value={passcode}
          onChangeText={setPasscode}
          secureTextEntry
          inputStyle={{ color: 'white' }}
          placeholderTextColor="#ccc"
          disabled={isSubmitting}
        />

        {message ? (
          <Text
            style={[
              styles.message,
              messageType === 'success'
                ? styles.success
                : messageType === 'error'
                ? styles.error
                : styles.warning,
            ]}
          >
            {message}
          </Text>
        ) : null}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={fetchUniqueId}
            disabled={isGeneratingId || isSubmitting}
            style={styles.secondaryButton}
          >
            {isGeneratingId ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.secondaryButtonText}>Create Unique ID</Text>
            )}
          </TouchableOpacity>
        </View>

        <Button
          title={isSubmitting ? 'Submitting...' : 'Continue'}
          onPress={onSubmit}
          buttonStyle={styles.primaryButton}
          disabled={isSubmitting || isGeneratingId}
        />
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
    marginHorizontal: 20,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  success: {
    color: '#90ee90',
  },
  error: {
    color: '#ff7f7f',
  },
  warning: {
    color: '#ffd700',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
  },
});
