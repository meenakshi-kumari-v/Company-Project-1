import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Color from '../../assets/color/Color';
import font from '../../assets/fontFamily/font';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';
import Utils from '../../utils/Utils';

interface Props {
  title?: string;
  img?: any;
  style?: any;
  onPress: () => void;
  textStyle?: any;
  image_style?: any;
  tintColor?: any;
  disabled?: boolean;
}
const CustomButton: React.FC<Props> = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.btn_style, props.style]}
      onPress={props?.onPress}
      disabled={props?.disabled}>
      {props?.title && (
        <Text style={[styles.text_style, props?.textStyle]}>
          {props?.title}
        </Text>
      )}

      {props?.img && (
        <FastImage
          style={[styles.ima_style, props?.image_style]}
          source={props?.img}
          resizeMode="contain"
          tintColor={props?.tintColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text_style: {
    color: Color.white,
    fontFamily: font.Montserrat_bold,
    fontSize: responsiveFontSize(1.9),
  },
  ima_style: {
    width: Utils.calculatedHeight(2.2),
    height: Utils.calculatedHeight(2.2),
  },
  btn_style: {
    flexDirection: 'row',
    height: Utils.calculatedHeight(5.6),
    justifyContent: 'center',
    borderRadius: Utils.calculatedWidth(8),
    alignItems: 'center',
  },
});
