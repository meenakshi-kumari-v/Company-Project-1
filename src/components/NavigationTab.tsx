import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradientComp from './LinearGradientComp';
import Utils from '../../utils/Utils';
import FastImage from 'react-native-fast-image';
import Color from '../../assets/color/Color';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import font from '../../assets/fontFamily/font';
interface Props {
  onPress: any;
  title?: string;
  colors?: any;
  textstyle?: any;
  tintColor?: string;
  imgsource?: any;
  gradstyle?: any;
}
const NavigationTab: React.FC<Props> = (props: any) => {
  return (
    <LinearGradientComp
      style={[styles.graduient_sty, props?.gradstyle]}
      colors={props?.colors}>
      <View style={styles.container}>
        <TouchableOpacity onPress={props?.onPress} style={styles.btn_sty}>
          <FastImage
            style={styles.back_img}
            source={props?.imgsource ?? require('../../assets/images/home.png')}
            tintColor={props?.tintColor ?? Color.white}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={[styles.txt_sty, props?.textstyle]}>{props?.title}</Text>
      </View>
    </LinearGradientComp>
  );
};

export default NavigationTab;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Utils.calculatedWidth(7),
  },
  back_img: {
    width: Utils.calculatedWidth(7),
    height: Utils.calculatedWidth(7),
  },
  graduient_sty: {
    borderRadius: Utils.calculatedHeight(0),
    paddingVertical: Utils.calculatedHeight(2),
  },
  btn_sty: {
    marginHorizontal: Utils.calculatedWidth(3),
    position: 'absolute',
    alignSelf: 'flex-start',
    left: 0,
  },
  txt_sty: {
    fontFamily: font.RobotoSlab_Black,
    fontSize: responsiveFontSize(2),
    color: Color.white,
  },
});
