import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Utils from '../../utils/Utils';
import Color from '../../assets/color/Color';
import font from '../../assets/fontFamily/font';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
interface Props {
  linktxt?: string;
  onPress?: any;
  style?: any;
  linktxtStyle?: any;
}
const LinkText: React.FC<Props> = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.btn_style, props?.style]}
      onPress={props?.onPress}>
      <Text style={[styles.link_txt, props?.linktxtStyle]}>
        {props?.linktxt}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkText;

const styles = StyleSheet.create({
  link_txt: {
    color: Color.Color_23,
    fontFamily: font.RobotoSlab_Bold,
    fontSize: responsiveFontSize(1.7),
    textDecorationLine: 'underline',
  },
  btn_style: {
    marginVertical: Utils.calculatedHeight(2),
  },
});
