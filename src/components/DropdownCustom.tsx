import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Utils from '../../utils/Utils';
import Color from '../../assets/color/Color';
import font from '../../assets/fontFamily/font';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
interface Props {
  data?: any;
  title: string;
  onChangeInput?: (txt: any) => void;
  style?: any;
  value?: any;
  star?: any;
  error?: any;
  disable?: boolean;
  search?: boolean;
}
const DropdownCustom: React.FC<Props> = (props: any) => {
  const [dropValue, setNrDropValue] = useState<any>(null);
  const [dropdownData, setNrDropdownData] = useState<any>([]);

  useEffect(() => {
    // console.log('ptopdvl;djg', props);

    const processData = () => {
      setNrDropdownData(props?.data);
    };
    processData();
  }, [props?.data]);

  return (
    <View style={[styles.container, props.style]}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.txt}>{props?.title}</Text>
        {props?.star && <Text style={styles.star}> *</Text>}
      </View>
      <Dropdown
        style={styles.dropdown_style}
        data={dropdownData}
        labelField="label"
        valueField="value"
        placeholder={props?.value ?? 'Select Status'}
        value={props?.value || dropValue}
        onChange={(item: any) => {
          console.log('drop down text', item);
          setNrDropValue(item.value);
          props.onChangeInput(item.value);
        }}
        placeholderStyle={styles.Dropdown_txt_Style}
        selectedTextStyle={styles.Dropdown_txt_Style}
        itemTextStyle={[styles.itemTextStyle]}
        containerStyle={{
          backgroundColor: Color.lightGreen,
        }}
        showsVerticalScrollIndicator={false}
        disable={props?.disable}
        search={props?.search ? true : false}
        searchPlaceholder={'Search....'}
        inputSearchStyle={[styles.inputSearchStyle]}
        searchQuery={(key, labelValue) => {
          console.log('keylablevalue', key, labelValue);
          const lowercaseKey = key.toLowerCase();
          return labelValue.toLowerCase().includes(lowercaseKey);
        }}
      />
      {props.error && <Text style={styles.err_txt}>{props.error}</Text>}
    </View>
  );
};

export default DropdownCustom;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Utils.calculatedWidth(5),
    marginVertical: Utils.calculatedHeight(0.5),
  },
  dropdown_style: {
    width: '100%',
    height: Utils.calculatedHeight(5),
    alignSelf: 'center',
    paddingHorizontal: Utils.calculatedWidth(4),
    borderRadius: Utils.calculatedHeight(0.5),
    backgroundColor: Color.lightGreen,
  },
  txt: {
    color: Color.black,
    fontFamily: font.Montserrat_bold,
    fontSize: responsiveFontSize(1.7),
    marginVertical: Utils.calculatedHeight(1),
  },
  err_txt: {
    color: Color.red,
    fontFamily: font.Montserrat_bold,
    fontSize: responsiveFontSize(1.5),
  },
  Dropdown_txt_Style: {
    color: Color.black,
    fontFamily: font.Montserrat_bold,
    fontSize: responsiveFontSize(1.7),
  },
  itemTextStyle: {
    color: Color.black,
    fontFamily: font.Montserrat_bold,
    fontSize: responsiveFontSize(1.5),
  },
  star: {
    color: Color.red,
    fontFamily: font.Montserrat_bold,
    fontSize: responsiveFontSize(1.7),
    marginVertical: Utils.calculatedHeight(1),
  },
  inputSearchStyle: {
    padding: 0,
    margin: 0,
    marginBottom: 0,
    color: Color.black,
    fontFamily: font.Montserrat_bold,
    fontSize: responsiveFontSize(1.5),
    paddingHorizontal: Utils.calculatedWidth(2),
    backgroundColor: Color.offWhite,
  },
});
