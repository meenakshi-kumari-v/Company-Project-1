import AsyncStorage from '@react-native-async-storage/async-storage';

export const sampleID = 'sampleID';
export const sampleID2 = 'sampleID2';
export const sampleID3 = 'sampleID3';

export const setItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Data loaded successfully:', value, key);
      return JSON.parse(value);
    } else {
      console.log('No data found for key:', key);
      return null;
    }
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};
