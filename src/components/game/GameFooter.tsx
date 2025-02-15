import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import ScalePress from '../ui/ScalePress';
import {goBack} from '../../utils/NavigationUtil';
import {screenHeight} from '../../utils/Constants';

const GameFooter: FC = () => {
  return (
    <View style={styles.flex1}>
      <ScalePress onPress={() => goBack()}>
        <Image
          source={require('../../assets/icons/back.png')}
          style={styles.backIcon}
        />
      </ScalePress>
    </View>
  );
};

export default GameFooter;

const styles = StyleSheet.create({
  flex1: {
    height: screenHeight * 0.1,
    width: '100%',
    paddingHorizontal: 10,
  },
  backIcon: {
    width: 45,
    resizeMode: 'contain',
    height: 45,
  },
});
