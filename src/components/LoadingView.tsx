import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import Color from '../../assets/color/Color';
interface Props {}
const LoadingView: React.FC<Props> = (props: any) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Color.white} />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: Color.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
