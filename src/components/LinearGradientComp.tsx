import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Utils from '../../utils/Utils';

interface Props {
  style?: any;
  children?: any;
  colors?: any;
}
const LinearGradientComp: React.FC<Props> = (props: any) => {
  return (
    <LinearGradient
      style={[styles.linearGradient, props?.style]}
      colors={props.colors ?? ['#325697', '#c4e3k3']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}>
      {props.children}
    </LinearGradient>
  );
};

export default LinearGradientComp;

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: Utils.calculatedWidth(2),
  },
});
