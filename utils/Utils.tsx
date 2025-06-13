import {Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../assets/color/Color';


export default class Utils {
  static windowWidth() {
    return Dimensions.get('window').width;
  }
  static windowHeight() {
    return Dimensions.get('window').width;
  }
  static calculatedHeight(height) {
    return responsiveHeight(height);
  }
  static calculatedWidth(width) {
    return responsiveWidth(width);
  }
  static tabBArData = [
    {id: '1', name: 'Personal Info'},
    {id: '2', name: 'Professional Info'},
    {id: '3', name: 'Qualifications'},
    {id: '4', name: 'Salary'},
    {id: '5', name: 'Contacts'},
  ];

  static appVersion = '1.0.0.0';
  static channelID = 'demoidfdkjfalk';
  static appVer = '1.0';
  static bloodGroup = [
    {label: 'A+', value: 'A+'},
    {label: 'A-', value: 'A-'},
    {label: 'B+', value: 'B+'},
    {label: 'B-', value: 'B-'},
    {label: 'AB+', value: 'AB+'},
    {label: 'AB-', value: 'AB-'},
    {label: 'O+', value: 'O+'},
    {label: 'O-', value: 'O-'},
  ];

  static maritalStatus = [
    {label: 'Unmarried', value: 'Unmarried'},
    {label: 'Married', value: 'Married'},
    {label: 'Widow', value: 'Widow'},
    {label: 'Divorsed', value: 'Divorsed'},
  ];

  static regimeType = [
    {label: 'Old', value: 'Old'},
    {label: 'New', value: 'New'},
  ];

  static qualification = [
    {label: 'Illiterate', value: 'Illiterate'},
    {label: 'Non Matric', value: 'Non Matric'},
    {label: 'Matric', value: 'Matric'},
    {label: 'Senior Secondary', value: 'Senior Secondary'},
    {label: 'Graduate', value: 'Graduate'},
    {label: 'Post Graduate', value: 'Post Graduate'},
    {label: 'Doctorate', value: 'Doctorate'},
    {label: 'Technical', value: 'Technical'},
  ];

  static familyRelation = [
    {label: 'Father', value: 'Father'},
    {label: 'Mother', value: 'Mother'},
    {label: 'Brother', value: 'Brother'},
    {label: 'Sister', value: 'Sister'},
    {label: 'Spouse', value: 'Spouse'},
    {label: 'Grand Father', value: 'Grand Father'},
    {label: 'Grand Mother', value: 'Grand Mother'},
    {label: 'Son', value: 'Son'},
    {label: 'Daughter', value: 'Daughter'},
  ];

  static Rate_data = [
    {label: '100%', value: '100'},
    {label: '50%', value: '50'},
  ];
}
