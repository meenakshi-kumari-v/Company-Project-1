import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Color from '../../assets/color/Color';
import font from '../../assets/fontFamily/font';
import Strings from '../../assets/strings/strings';
import FastImage from 'react-native-fast-image';
import Utils from '../../utils/Utils';
interface Props {
  title?: string;
}
const NodataFile: React.FC<Props> = (props: any) => {
  return (
    <View style={styles.no_dat_txt_view}>
      <FastImage
        style={styles.noDat_img}
        source={require('../../assets/images/no-data.png')}
        resizeMode="contain"
      />
      <Text style={styles.nodata_txt}>
        {props?.title ? props?.title : Strings.no_data}
      </Text>
    </View>
  );
};

export default NodataFile;

const styles = StyleSheet.create({
  noDat_img: {
    height: Utils.calculatedHeight(10),
    width: Utils.calculatedHeight(10),
    marginBottom: Utils.calculatedHeight(2),
  },
  no_dat_txt_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodata_txt: {
    fontFamily: font.RobotoSlab_Bold,
    color: Color.themColor_1,
    fontSize: responsiveFontSize(1.8),
  },
});
