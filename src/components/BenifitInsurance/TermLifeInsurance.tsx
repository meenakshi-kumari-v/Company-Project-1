import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomButton from '../CustomButton';
import Color from '../../../assets/color/Color';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Utils from '../../../utils/Utils';
import ShowDetailComp from '../ShowDetailComp';
import Strings from '../../../assets/strings/strings';
interface Props {
  title?: string;
  onPress?: any;
  disabled?: boolean;
  data?: any;
}
const TermLifeInsurance: React.FC<Props> = (props: any) => {
  const {data} = props;
  console.log('mediclaim props', props);
  return (
    <View style={styles.container}>
      <CustomButton
        style={styles.btn_style}
        title={props?.title}
        onPress={props?.onPress}
        disabled={props?.disabled}
        tintColor={Color.white}
        textStyle={{fontSize: responsiveFontSize(1.7)}}
      />
      <ShowDetailComp
        title={Strings.gtli_poly_num}
        value={
          data?.gtliPolicyNumber ? data?.gtliPolicyNumber : Strings.no_dat_ava
        }
      />
      <ShowDetailComp
        title={Strings.insu_stats}
        value={
          data?.insuranceStatus ? data?.insuranceStatus : Strings.no_dat_ava
        }
      />
      <ShowDetailComp
        title={Strings.insu_crd_no}
        value={
          data?.insuranceCardNumber
            ? data?.insuranceCardNumber
            : Strings.no_dat_ava
        }
        style={{elevation: 0}}
      />
    </View>
  );
};

export default TermLifeInsurance;

const styles = StyleSheet.create({
  btn_style: {
    flexDirection: 'row',
    height: Utils.calculatedHeight(5.5),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.back_color,
    borderRadius: 0,
    paddingHorizontal: Utils.calculatedWidth(3),
  },
  container: {
    marginVertical: Utils.calculatedHeight(1),
    marginHorizontal: Utils.calculatedWidth(5),
    backgroundColor: Color.white,
    elevation: 2,
    borderRadius: Utils.calculatedHeight(1),
    overflow: 'hidden',
    borderColor: Color.light_grey,
    borderWidth: Utils.calculatedWidth(0.1),
  },
});
