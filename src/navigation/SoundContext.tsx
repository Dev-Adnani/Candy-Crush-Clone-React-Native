import {createContext, ReactNode, useContext, useState} from 'react';
import Video from 'react-native-video';

interface SoundContextProps {
  playSound: (soundName: string, repeat: boolean) => void;
  stopSound: (soundName: string) => void;
}

interface SoundProviderProps {
  children: ReactNode;
}

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

const soundPaths: {[key: string]: string} = {
  ui: require('../assets/sfx/ui.mp3'),
  candy_shuffle: require('../assets/sfx/candy_shuffle.mp3'),
  candy_clear: require('../assets/sfx/candy_clear.mp3'),
  bg: require('../assets/sfx/bg.mp3'),
  cheer: require('../assets/sfx/cheer.mp3'),
};

const SoundProvider = ({children}: SoundProviderProps) => {
  const [sound, setSound] = useState<any[]>([]);

  const playSound = (soundName: string, repeat: boolean) => {
    const soundPath = soundPaths[soundName];
    if (soundPath) {
      setSound(prev => {
        const updatedSound = prev?.filter(s => s.id !== soundName);
        return [
          ...updatedSound,
          {
            id: soundName,
            path: soundPath,
            repeat: repeat,
          },
        ];
      });
    } else {
      console.error('Sound not found');
    }
  };

  const stopSound = (soundName: string) => {
    setSound(prev => prev?.filter(s => s.id !== soundName));
  };

  return (
    <SoundContext.Provider value={{playSound, stopSound}}>
      {children}
      {sound.map(s => (
        <Video
          key={s.id}
          source={s.path}
          paused={false}
          repeat={s.repeat}
          volume={0.4}
          muted={false}
          resizeMode="cover"
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
          }}
        />
      ))}
    </SoundContext.Provider>
  );
};

const useSound = (): SoundContextProps => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

export {SoundProvider, useSound};
