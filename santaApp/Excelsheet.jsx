import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export default function ExcelUploadScreen({ route }) {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const navigation = useNavigation();

  const { eventId } = route.params || {};

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
        type: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ],
        copyToCacheDirectory: true,
      });

      if (res.type === 'success') {
        const fileInfo = await FileSystem.getInfoAsync(res.uri);
        if (!fileInfo.exists) {
          throw new Error('File not found');
        }

        const formattedUri = Platform.OS === 'android' ? fileInfo.uri : fileInfo.uri.replace('file://', '');

        setFile({
          uri: formattedUri,
          name: res.name || 'upload.xlsx',
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        console.log("✅ File picked:", res.name);
      }
    } catch (err) {
      Toast.show({ type: 'error', text1: 'File selection failed' });
      console.error("❌ File selection error:", err);
    }
  };

  const onSubmit = async () => {
    if (!file) {
      Toast.show({ type: 'error', text1: 'Please select a file.' });
      return;
    }

    const formData = new FormData();
    formData.append('excel_file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });
    formData.append('eventID', eventId);

    try {
      setIsSubmitting(true);
      console.log("📤 Uploading file:", file);

      const res = await axios.post('http://10.0.2.2:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.error) {
        Toast.show({ type: 'error', text1: res.data.error });
      } else {
        Toast.show({ type: 'success', text1: 'Upload successful' });

        const santaRes = await axios.get(`http://10.0.2.2:8000/api/get-santa-pairs?eventID=${eventId}`);
        if (santaRes.data.santaPairs?.length > 0) {
          Toast.show({ type: 'success', text1: 'Secret Santas assigned' });
          navigation.navigate('ParticipantsScreen', { eventData: santaRes.data, eventId });
        }
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: error.response?.data?.error || error.message,
      });
    } finally {
      setIsSubmitting(false);
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
        <Text style={styles.title}>📤 Excel File Upload</Text>

        <TouchableOpacity onPress={handleFilePick} style={styles.uploadButton}>
          <Text style={styles.uploadText}>
            {file ? `📄 ${file.name}` : 'Upload Excel File'}
          </Text>
        </TouchableOpacity>

        {isSubmitting ? (
          <ActivityIndicator color="#fff" style={{ marginVertical: 10 }} />
        ) : (
          <Button
            title="Upload"
            type="outline"
            onPress={onSubmit}
            buttonStyle={styles.outlineButton}
            titleStyle={{ color: '#fff' }}
          />
        )}

        <Toast />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
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
  },
});
