import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Color from '../../assets/color/Color';
import Utils from '../../utils/Utils';
import font from '../../assets/fontFamily/font';
import {Navigation} from 'react-native-navigation';

interface Props {
  title: string;
  image: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: any) => void;
  value?: any;
}
const LoginInputView: React.FC<Props> = (props: any) => {
  const [showpassword, setPassword] = useState(false);
  useEffect(() => {
    const componentDidAppearListener =
      Navigation.events().registerComponentDidAppearListener(
        ({componentId}) => {
          setPassword(false);
        },
      );

    return () => {
      componentDidAppearListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading_txt}>{props?.title}</Text>
      <View style={styles.input_view}>
        <TextInput
          style={styles.input_txt}
          onChangeText={text => {
            console.log('typing text', text);
            props.onChangeText(text);
          }}
          value={props.value}
          secureTextEntry={props.secureTextEntry ? !showpassword : false}
        />

        {!props.secureTextEntry && (
          <FastImage
            style={styles.img_sty}
            source={props.image}
            tintColor={Color.themColor_1}
            resizeMode="contain"
          />
        )}

        {props.secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setPassword(!showpassword);
            }}>
            <FastImage
              resizeMode="contain"
              style={styles.img_sty}
              tintColor={Color.themColor_1}
              source={
                !showpassword
                  ? props.image
                  : require('../../assets/images/open-lock.png')
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LoginInputView;

const styles = StyleSheet.create({
  container: {
    marginTop: Utils.calculatedHeight(1),
  },
  heading_txt: {
    color: Color.black,
    fontFamily: font.Montserrat_SemiBold,
    margin: Utils.calculatedWidth(1),
    marginLeft: Utils.calculatedWidth(3.5),
  },
  input_view: {
    borderWidth: Utils.calculatedWidth(0.3),
    borderColor: Color.black,
    flexDirection: 'row',
    padding: Utils.calculatedHeight(1.3),
    justifyContent: 'space-between',
    borderRadius: Utils.calculatedWidth(2.5),
    paddingHorizontal: Utils.calculatedWidth(4.5),
  },
  input_txt: {
    paddingVertical: 0,
    height: Utils.calculatedHeight(3),
    width: '90%',
    color: Color.black,
    fontFamily: font.Montserrat_SemiBold,
  },
  img_sty: {
    height: Utils.calculatedWidth(5),
    width: Utils.calculatedWidth(5),
    alignSelf: 'center',
  },
});
