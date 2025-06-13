import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavigationTab from '../components/NavigationTab';
import Strings from '../../assets/strings/strings';
import Navigator from '../../navigation/Navigation';
import {Navigation} from 'react-native-navigation';
import {getItem, userLoginData} from '../../storage/asyncStorage';
import LoadingView from '../components/LoadingView';
import {
  DownloadBenefitsApi,
  DownloadHealthBenfitApi,
  GetInsuranceInfoApi,
} from '../../api/presenter/Insurence/InsurenceInfoPresenter';
import {
  DownloadBenefitsView,
  DownloadHealthBenfitView,
  GetInsuranceInfoAirtelView,
} from '../../api/presenter/Insurence/InsurenceInfoView';
import Utils from '../../utils/Utils';
import LinkText from '../components/LinkText';
import RNFetchBlob from 'rn-fetch-blob';
import MediclaimInsurance from '../components/BenifitInsurance/MediclaimInsurance';
import TermLifeInsurance from '../components/BenifitInsurance/TermLifeInsurance';
import font from '../../assets/fontFamily/font';
import Color from '../../assets/color/Color';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import NodataFile from '../components/NodataFile';

interface Props {}

const BenifitsInsurance: React.FC<Props> = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [insurenceInfo, setInsurenceInfo] = useState<any>('');

  useEffect(() => {
    const componentDidAppearListener =
      Navigation.events().registerComponentDidAppearListener(
        ({componentId}) => {},
      );
    getItem(userLoginData).then(item => {
      setIsLoading(true);
      GetInsuranceInfoApi(item, GetInsuranceInfoResult);
    });

    return () => {
      componentDidAppearListener.remove();
    };
  }, []);

  const GetInsuranceInfoResult: GetInsuranceInfoAirtelView = {
    GetInsuranceInfoSuccess(result: any) {
      console.log('GetInsuranceInfo success', result);
      setIsLoading(false);
      if (result.data == 'Login Failed') {
        Alert.alert('', result.data, [
          {
            text: 'OK',
            onPress: () => {
              Navigator.popToRoot();
            },
          },
        ]);
      } else {
        setInsurenceInfo(result?.data);
      }
    },
    GetInsuranceInfoFailure(result) {
      console.log('GetInsuranceInfo Failure', result);
      setIsLoading(false);
      Alert.alert('', Strings.serv_err);
    },
  };

  const DownloadBenefitsResult: DownloadBenefitsView = {
    async DownloadBenefitsSuccess(result: any) {
      // console.log('DownloadBenefits success', result);
      setIsLoading(false);
      const compliancePath = `${RNFetchBlob.fs.dirs.DownloadDir}/InsuranceBenefit.pdf`;
      if (result?.data == 'File not found') {
        Alert.alert('', 'No Data Available');
      } else {
        try {
          await RNFetchBlob.fs.writeFile(compliancePath, result.data, 'base64');
          // console.log('File saved successfully:', compliancePath);
          Alert.alert('', `InsuranceBenefit.pdf ${Strings.dowloded}`);
        } catch (err) {
          console.log('error 1200000', err);
        }
      }
    },
    DownloadBenefitsFailure(result) {
      console.log('DownloadBenefits failure', result);
      setIsLoading(false);
      Alert.alert('', Strings.serv_err);
    },
  };

  const DownloadHealthBenfitResult: DownloadHealthBenfitView = {
    async DownloadHealthBenfitSuccess(result: any) {
      // console.log('DownloadHealthBenfit succes', result);
      setIsLoading(false);
      const compliancePath = `${RNFetchBlob.fs.dirs.DownloadDir}/EmpHealthBenefit_FAQ.pdf`;
      if (result?.data == 'File not found') {
        Alert.alert('', 'No Data Available');
      } else {
        try {
          await RNFetchBlob.fs.writeFile(compliancePath, result.data, 'base64');
          // console.log('File saved successfully:', compliancePath);
          Alert.alert('', `EmpHealthBenefit_FAQ.pdf ${Strings.dowloded}`);
        } catch (err) {
          console.log('error 1200000', err);
        }
      }
    },
    DownloadHealthBenfitFailure(result) {
      console.log('DownloadHealthBenfit fail', result);
      setIsLoading(false);
      Alert.alert('', Strings.serv_err);
    },
  };

  const downInsurBenfit = (type: string) => {
    getItem(userLoginData).then(item => {
      if (type == 'benefit') {
        setIsLoading(true);
        DownloadBenefitsApi(item, DownloadBenefitsResult);
      } else {
        setIsLoading(true);
        DownloadHealthBenfitApi(item, DownloadHealthBenfitResult);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationTab
        title={Strings.benefit}
        onPress={() => Navigator.pop(props.componentId)}
      />
      <ImageBackground
        resizeMode="stretch"
        style={{flex: 1}}
        source={require('../../assets/images/ess_atten_back_img_1.jpg')}>
        {insurenceInfo?.length != 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrol_view}>
            <MediclaimInsurance
              title={Strings.medclam_insur}
              data={insurenceInfo?.[0]}
              disabled={true}
            />
            <TermLifeInsurance
              title={Strings.lif_trm_insu}
              data={insurenceInfo?.[0]}
              disabled={true}
            />

            <LinkText
              linktxt={Strings.donld_benfits}
              onPress={() => downInsurBenfit('benefit')}
              style={styles.link_txt_1}
            />
            <LinkText
              linktxt={Strings.downld_helth_benfi}
              onPress={() => downInsurBenfit('healthbenefit')}
              style={styles.link_txt_2}
            />
          </ScrollView>
        ) : isLoading ? (
          <></>
        ) : (
          <NodataFile />
        )}
      </ImageBackground>
      {isLoading && <LoadingView />}
    </SafeAreaView>
  );
};

export default BenifitsInsurance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  show_det_com_styl: {
    elevation: 0,
    borderBottomWidth: Utils.calculatedWidth(0.1),
  },
  link_txt_1: {
    marginHorizontal: Utils.calculatedWidth(5),
  },
  link_txt_2: {
    marginHorizontal: Utils.calculatedWidth(5),
    marginVertical: Utils.calculatedHeight(0),
    marginBottom: Utils.calculatedHeight(1),
  },
  no_dat_txt_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodata_txt: {
    fontFamily: font.RobotoSlab_Bold,
    color: Color.grey,
    fontSize: responsiveFontSize(1.8),
  },
  scrol_view: {
    marginTop: Utils.calculatedHeight(1),
  },
});
