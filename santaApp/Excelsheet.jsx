import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Alert,
  TouchableOpacity,
  Animated,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // or use react-native-document-picker
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function ExcelUploadScreen() {
  const [file, setFile] = useState(null);
  const navigation = useNavigation();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
        copyToCacheDirectory: true,
      });

      if (res.type === 'success') {
        setFile(res);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  const onSubmit = () => {
    if (file) {
      navigation.navigate('ParticipantsScreen');
    } else {
      Alert.alert('Upload Required', 'Please upload an Excel file.');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/pexels-x-y-1263157-2403402.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Excel File Upload</Text>

        <TouchableOpacity onPress={handleFilePick} style={styles.uploadButton}>
          <Text style={styles.uploadText}>
            {file ? `📄 ${file.name}` : 'Upload Excel File'}
          </Text>
        </TouchableOpacity>

        <Button
          title="Upload"
          type="outline"
          onPress={onSubmit}
          buttonStyle={styles.outlineButton}
          titleStyle={{ color: '#fff' }}
        />

        <Button
          title="Continue"
          onPress={() => navigation.navigate('ParticipantsScreen')}
          buttonStyle={styles.continueButton}
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
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 20,
  },
  uploadText: {
    color: '#fff',
    textAlign: 'center',
  },
  outlineButton: {
    borderColor: '#fff',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  continueButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
