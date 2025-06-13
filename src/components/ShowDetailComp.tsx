import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import font from '../../assets/fontFamily/font';
import Color from '../../assets/color/Color';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Utils from '../../utils/Utils';
import Strings from '../../assets/strings/strings';

interface Props {
  title?: string;
  value?: string;
  title_2?: string;
  value_2?: string;
  title_3?: string;
  value_3?: string;
  detail?: any;
  salary?: boolean;
  style?: any;
  show?: boolean;
}
const ShowDetailComp: React.FC<Props> = (props: any) => {
  return (
    <>
      {
        <View style={[styles.container, props?.style]}>
          {props?.value && (
            <View style={{width: props?.title_2 ? '50%' : undefined}}>
              <Text style={styles.title_sty}>{props?.title}</Text>
              <Text style={styles.value_sty}>{props?.value}</Text>
            </View>
          )}
          {props?.value_2 && (
            <View style={{width: '50%'}}>
              <Text style={styles.title_sty}>{props?.title_2}</Text>
              <Text style={styles.value_sty}>{props?.value_2}</Text>
            </View>
          )}
          {props?.salary && (
            <View style={styles.salry_view}>
              <Text style={styles.title_sty}>{props?.title_3}</Text>
              <Text style={styles.value_sty}>{props?.value_3}</Text>
            </View>
          )}
          {props?.show && (
            <Text style={styles.nodata_txt}>{Strings.no_data}</Text>
          )}
        </View>
      }
    </>
  );
};

export default ShowDetailComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    paddingVertical: Utils.calculatedHeight(1),
    paddingHorizontal: Utils.calculatedWidth(5),
    borderColor: Color.light_grey,
    elevation: 0.7,
    marginVertical: Utils.calculatedHeight(0.3),
    flexDirection: 'row',
  },
  title_sty: {
    fontFamily: font.RobotoSlab_Regular,
    color: Color.grey,
    fontSize: responsiveFontSize(2),
  },
  value_sty: {
    fontFamily: font.Montserrat_bold,
    color: Color.black,
    fontSize: responsiveFontSize(1.8),
  },
  nodata_txt: {
    fontFamily: font.RobotoSlab_Regular,
    color: Color.grey,
    fontSize: responsiveFontSize(1.8),
    padding: Utils.calculatedWidth(3),
  },
  salry_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
