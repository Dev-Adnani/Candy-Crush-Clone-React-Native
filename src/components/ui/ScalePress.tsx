import {FC} from 'react';
import {Animated, TouchableOpacity, ViewStyle} from 'react-native';
import {playSound} from '../../utils/SoundUtility';

interface ScalePressProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

const ScalePress: FC<ScalePressProps> = ({onPress, children, style}) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    playSound('ui');
    Animated.spring(scaleValue, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}>
      <Animated.View
        style={[
          style,
          {
            width: '100%',
            transform: [{scale: scaleValue}],
          },
        ]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;