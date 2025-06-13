import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navigator from '../../navigation/Navigation';
import {Navigation} from 'react-native-navigation';
import {getItem, userLoginData} from '../../storage/asyncStorage';
import {
  AttendaTimeInApi,
  CheckCLPLApi,
  CheckCompensateApi,
  ChecktodyAttndcApi,
} from '../../api/presenter/Attendance/AttendancePresenter';
import Strings from '../../assets/strings/strings';
import {
  AttendaTimeInView,
  CheckCLPLView,
  CheckCompensateView,
  ChecktodyAttndcView,
} from '../../api/presenter/Attendance/AttendanceView';
import LinearGradientComp from '../components/LinearGradientComp';
import CustomButton from '../components/CustomButton';
import Color from '../../assets/color/Color';
import Utils from '../../utils/Utils';
import LoadingView from '../components/LoadingView';
import {Dropdown} from 'react-native-element-dropdown';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import font from '../../assets/fontFamily/font';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';

interface Props {}

const Attendance: React.FC<Props> = (props: any) => {
  const [loginData, setLoginData] = useState<any>();
  const [dropValue, setDropValue] = useState<any>(null);
  const [timeInDisable, setTimeInDisable] = useState<any>(false);
  const [timeOutDisable, setTimeOutDisable] = useState<any>(false);
  const [isLoaidng, setIsLoading] = useState(false);
  const [getlocation, setGetlocation] = useState(true);
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const [apiParams, setApiParams] = useState<any>();
  let data_1: any;

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async position => {
        setGetlocation(false);
        console.log('get location cred', position);
        setLatitude(position?.coords?.latitude);
        setLongitude(position?.coords?.longitude);
        setLoginData(props?.loginData);
        getItem(userLoginData).then(data => {
          setIsLoading(true);
          data.appVersion = '1.0.0.4';
          data.userpassword = data.password;
          data_1 = data;
          setApiParams(data);
          // LoginAppAttndcApi(data, LoginAppAttndcResult);
          ChecktodyAttndcApi(data, ChecktodyAttndcResult);
        });
      },
      error => {
        setGetlocation(false);
        console.log('error while getting lat lon', error);
        Alert.alert('', error?.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    const componentDidAppearListener =
      Navigation.events().registerComponentDidAppearListener(
        ({componentId}) => {
          console.log(
            'AttendanceHome screen',
            props?.loginData?.attendanceList,
          );
        },
      );

    const componentDidDisappearListener =
      Navigation.events().registerComponentDidDisappearListener(
        ({componentId}) => {},
      );
    return () => {
      componentDidAppearListener.remove();
      componentDidDisappearListener.remove();
    };
  }, []);

  const ChecktodyAttndcResult: ChecktodyAttndcView = {
    ChecktodyAttndcSuccess(result: any) {
      setIsLoading(false);
      console.log('ChecktodyAttndcApi succ', result);
      if (result?.data?.todayattendanceTimeIN) {
        setTimeInDisable(true);
        setDropValue(result?.data?.todayattendancestatus);
        if (!result?.data?.todayattendanceTimeOut) {
          console.log('check comnditioin 1 ');
          result?.data?.todayattendancestatus == 'P'
            ? setTimeOutDisable(false)
            : setTimeOutDisable(true);
        } else if (result?.data?.todayattendanceTimeOut) {
          console.log('check comnditioin 2 ');
          setTimeOutDisable(true);
        }
      } else {
        console.log('check comnditioin 3 ');
        setTimeInDisable(false);
        setTimeOutDisable(true);
        setDropValue(null);
      }
    },
    ChecktodyAttndcFailure(err: any) {
      setIsLoading(false);
      console.log('ChecktodyAttndcApi failu', err);
      err?.response?.data?.message
        ? Alert.alert('', err?.response?.data?.message)
        : Alert.alert('', Strings.serv_err);
    },
  };

  const CheckCLPLResult: CheckCLPLView = {
    CheckCLPLSuccess(result: any) {
      console.log('CheckCLPL suc', result);
      setIsLoading(false);
      if (result?.data?.remark != 'Yes') {
        setTimeInDisable(true);
        Alert.alert('', Strings.clpl_msg);
      }
    },
    CheckCLPLFailure(err: any) {
      console.log('CheckCLPLFail', err);
      setIsLoading(false);
      err?.response?.data?.message
        ? Alert.alert('', err?.response?.data?.message)
        : Alert.alert('', Strings.serv_err);
    },
  };

  const CheckCompensateResult: CheckCompensateView = {
    CheckCompensateSuccess(result: any) {
      console.log('CheckCompensate succ', result);
      setIsLoading(false);
      if (!result?.data) {
        setTimeInDisable(true);
        Alert.alert('', Strings.compnst_msg);
      }
    },
    CheckCompensateFailure(err: any) {
      setIsLoading(false);
      console.log('CheckCompensate fai;ur', err);
      err?.response?.data?.message
        ? Alert.alert('', err?.response?.data?.message)
        : Alert.alert('', Strings.serv_err);
    },
  };

  const AttendaTimeInResult: AttendaTimeInView = {
    AttendaTimeInSuccess(result: any) {
      setIsLoading(false);
      console.log('AttendaTimeInApi succ', result);
      result?.data?.remark == 'Not in Range'
        ? Alert.alert('Attendance Alert!', Strings.atndn_alrt)
        : Alert.alert('', result?.data?.remark);
      if (
        result?.data?.attendanceMarked == 'P' &&
        result?.data?.remark ==
          'Attendance successfully marked with the status [P]'
      ) {
        console.log('send reminder out push notification');
        setTimeInDisable(true);
      }
    },
    AttendaTimeInFailure(err: any) {
      setIsLoading(false);
      console.log('AttendaTimeInApi fail', err);
      err?.response?.data?.message
        ? Alert.alert('', err?.response?.data?.message)
        : Alert.alert('', Strings.serv_err);
    },
  };

  const cutsbtn = (
    title: string,
    onPress: any,
    disable: boolean,
    style?: any,
  ) => {
    return (
      <CustomButton
        style={[
          styles.btn_stl,
          style,
          {backgroundColor: disable ? Color.light_grey : Color.themColor_1},
        ]}
        title={title}
        onPress={() => onPress()}
        disabled={disable}
      />
    );
  };

  const attndTinOut = (status: string) => {
    const newData = apiParams;
    newData.ProjectCode = loginData?.projectCode;
    newData.ProjectName = loginData?.projectName;
    newData.attendanceMarkType = status;
    newData.attendanceStatus = dropValue;
    newData.deviceLat = latitude.toString();
    newData.deviceLong = longitude.toString();
    console.log('time status', status, newData);
    if (status == 'timeIn') {
      if (dropValue == null) {
        Alert.alert('', 'Kindly mark your attendance first');
      } else {
        setIsLoading(true);
        newData.attendanceMarkType = 'timein';
        AttendaTimeInApi(newData, AttendaTimeInResult);
      }
    } else {
      setIsLoading(true);
      newData.attendanceMarkType = 'timeout';
      AttendaTimeInApi(newData, AttendaTimeInResult);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="stretch"
          style={styles.container}
          source={require('../../assets/images/ess_atten_back_img_1.jpg')}>
          <View style={styles.nav_view}>
            <TouchableOpacity onPress={() => Navigator.pop(props?.componentId)}>
              <FastImage
                style={styles.back_img}
                source={require('../../assets/images/navigation_back.png')}
                resizeMode="contain"
                tintColor={Color.themColor_1}
              />
            </TouchableOpacity>
            <Text style={styles.nav_title}>Attendance</Text>
          </View>
          <View style={styles.sec_contner}>
            <Text style={styles.wxlcm_txt}>Welcome</Text>
            <Text style={styles.wxlcm_txt}> {loginData?.name}</Text>
            <Text style={styles.dateTx}>{loginData?.empCode}</Text>
            <Text style={styles.dateTx}>
              {loginData?.systemdate &&
                moment(loginData?.systemdate).format('MMMM Do, YYYY')}
            </Text>
            <Text style={styles.dateTx}>{loginData?.dayofweek}</Text>
            <Text style={styles.atten_txt}>Mark Your Attendance</Text>
            <Dropdown
              style={styles.dropDown_Styl}
              data={loginData?.attendanceList ?? []}
              labelField={'label'}
              valueField={'label'}
              activeColor={Color.lightGreen}
              dropdownPosition="auto"
              onChange={(item: any) => {
                console.log('item onchange dropdown', item);
                setDropValue(item?.label);
                if (item?.label == 'C') {
                  console.log('userLogindatauserLoginData', apiParams);
                  setIsLoading(true);
                  CheckCompensateApi(apiParams, CheckCompensateResult);
                } else if (item?.label == 'CL' || item?.label == 'PL') {
                  console.log('userLogindatauserLoginData', apiParams);
                  const newData = apiParams;
                  newData.ProjectCode = loginData?.projectCode;
                  newData.ProjectName = loginData?.projectName;
                  newData.attendanceMarkType = 'checking';
                  newData.attendanceStatus = item?.label;
                  setIsLoading(true);
                  CheckCLPLApi(newData, CheckCLPLResult);
                } else {
                  setTimeInDisable(false);
                }
              }}
              placeholder="Select"
              value={dropValue}
              placeholderStyle={styles.droptextSty}
              selectedTextStyle={styles.droptextSty}
              itemTextStyle={styles.drop_itemText}
              containerStyle={styles.drp_container}
              itemContainerStyle={styles.drp_itm_contnr}
              disable={timeInDisable}
            />
            <View style={styles.timIn_out_vie}>
              {cutsbtn('Time In', () => attndTinOut('timeIn'), timeInDisable, {
                width: '48%',
              })}
              {cutsbtn(
                'Time Out',
                () => attndTinOut('timeOut'),
                timeOutDisable,
                {
                  width: '48%',
                },
              )}
            </View>
            {cutsbtn(
              'Refresh',
              () => {
                setIsLoading(true);
                ChecktodyAttndcApi(apiParams, ChecktodyAttndcResult);
              },
              false,
            )}
          </View>
          {(isLoaidng || getlocation) && <LoadingView />}
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  btn_stl: {
    width: '60%',
    marginTop: Utils.calculatedHeight(2),
    borderRadius: Utils.calculatedWidth(2),
  },
  container: {
    flex: 1,
    // backgroundColor: Color.white,
  },
  sec_contner: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: Utils.calculatedHeight(10),
  },
  atten_txt: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: font.RobotoSlab_Black,
    color: Color.themColor_1,
    marginTop: Utils.calculatedHeight(5),
  },
  dropDown_Styl: {
    borderWidth: Utils.calculatedWidth(0.1),
    width: '60%',
    marginVertical: Utils.calculatedHeight(4),
    borderColor: Color.themColor_1,
    paddingHorizontal: Utils.calculatedWidth(2),
    height: Utils.calculatedHeight(5.5),
    backgroundColor: Color.white,
    borderRadius: Utils.calculatedWidth(1),
    elevation: Utils.calculatedHeight(0.2),
  },
  droptextSty: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: font.RobotoSlab_Bold,
    color: Color.black,
  },
  drop_itemText: {
    margin: -Utils.calculatedHeight(1),
    fontSize: responsiveFontSize(1.8),
    fontFamily: font.RobotoSlab_Bold,
    color: Color.black,
  },
  drp_container: {
    borderWidth: Utils.calculatedWidth(0.1),
    borderColor: Color.themColor_1,
    borderBottomWidth: Utils.calculatedWidth(0),
    backgroundColor: Color.white,
  },
  drp_itm_contnr: {
    borderBottomWidth: Utils.calculatedWidth(0.1),
    borderColor: Color.themColor_1,
  },
  dateTx: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: font.RobotoSlab_Regular,
    color: Color.themColor_old,
    marginTop: Utils.calculatedHeight(0.5),
  },
  wxlcm_txt: {
    fontSize: responsiveFontSize(4),
    fontFamily: font.RobotoSlab_Medium,
    color: Color.black,
    textAlign: 'center',
    // backgroundColor: 'pink',
    width: '90%',
    // position: 'absolute',
    // top: Utils.calculatedHeight(12),
  },
  timIn_out_vie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  nav_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Utils.calculatedHeight(5),
  },
  back_img: {
    width: Utils.calculatedWidth(7),
    height: Utils.calculatedWidth(7),
    marginHorizontal: Utils.calculatedWidth(3),
  },
  nav_title: {
    color: Color.themColor_1,
    fontSize: responsiveFontSize(2.9),
    fontFamily: font.RobotoSlab_Bold,
  },
});
