import {StyleSheet, ImageBackground, View, Animated, Alert} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {commonStyles} from '../styles/commonStyles';
import GameHeader from '../components/game/GameHeader';
import {useRoute} from '@react-navigation/native';
import {useSound} from '../navigation/SoundContext';
import GameFooter from '../components/game/GameFooter';
import GameTile from '../components/game/GameTile';
import {useLevelStore} from '../state/useLevelStore';
import {screenWidth} from '../utils/Constants';
import LottieView from 'lottie-react-native';

const GameScreen: FC = () => {
  const route = useRoute();
  const item = route?.params as any;

  const {playSound} = useSound();
  const [gridData, setGridData] = useState<any>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [collectedCandies, setCollectedCandies] = useState(0);
  const [time, setTime] = useState<any>(null);

  useEffect(() => {
    if (item?.level) {
      setGridData(item?.level?.grid);
      setTotalCount(item?.level?.pass);
      setTime(item?.level?.time);
    }
  }, []);

  // useEffect(() => {
  //   if (time === 0) {
  //     handleGameOver();
  //   }
  // }, [time]);

  // const handleGameOver = () => {
  //   if (collectedCandies >= totalCount) {
  //     completeLevel(item?.level?.id, collectedCandies);
  //     unlockLevel(item?.level?.id + 1);

  //     Alert.alert(
  //       'Congratulations',
  //       'You have collected enough candies to pass the level',
  //       [
  //         {
  //           text: 'Next Level',
  //           onPress: () => {
  //             setGridData(item?.level?.grid);
  //             setTotalCount(item?.level?.pass);
  //             setTime(item?.level?.time);
  //           },
  //         },
  //         {
  //           text: 'Exit',
  //           onPress: () => {
  //             unlockLevel(item?.level?.level);
  //           },
  //         },
  //       ],
  //     );
  //   } else {
  //     Alert.alert(
  //       'Game Over',
  //       'You have not collected enough candies to pass the level',
  //       [
  //         {
  //           text: 'Try Again',
  //           onPress: () => {
  //             setGridData(item?.level?.grid);
  //             setTotalCount(item?.level?.pass);
  //             setTime(item?.level?.time);
  //           },
  //         },
  //         {
  //           text: 'Exit',
  //           onPress: () => {
  //             unlockLevel(item?.level?.level);
  //           },
  //         },
  //       ],
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (time && time > 0) {
  //     const timerInterval = setInterval(() => {
  //       setTime((prev: number) => {
  //         if (prev === 1000) {
  //           clearInterval(timerInterval);
  //           return 0;
  //         }
  //         return prev - 1000;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timerInterval);
  //   }
  // }, [time]);

  // useEffect(() => {
  //   if (collectedCandies >= totalCount && totalCount > 0 && !firstAnimation) {
  //     setShowAnimation(true);
  //   }
  // }, [collectedCandies, totalCount]);

  return (
    <ImageBackground
      style={commonStyles.container}
      source={require('../assets/images/b1.png')}>
      <GameHeader
        totalCount={totalCount}
        collectedCandies={collectedCandies}
        time={time}
      />
      {gridData && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <GameTile
            data={gridData}
            setGridData={setGridData}
            setCollectedCandies={setCollectedCandies}
          />
        </View>
      )}

      {/* {showAnimation && (
        <>
          <Animated.Image
            source={require('../assets/text/t2.png')}
            style={[
              styles.centerImage,
              {
                opacity: fadeAnim,
                transform: [{scale: scaleAnim}],
              },
            ]}
          />
          <LottieView
            source={require('../assets/animations/confetti_2.json')}
            style={styles.lottie}
            autoPlay
            loop
          />
        </>
      )} */}
      <GameFooter />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centerImage: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '15%',
  },
  lottie: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '10%',
  },
});

export default GameScreen;
