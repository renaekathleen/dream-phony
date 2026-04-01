import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { ActionButtons } from './ActionButtons';
import { useGameEngine } from '../hooks/useGameEngine';
import { COLORS } from '../theme';

export function PhoneApp() {
  const {
    state,
    pressDigit,
    clearDigits,
    makeCall,
    redial,
    toggleSpeakerphone,
    toggleGuessMode,
    toggleShowText,
    startNewGame,
  } = useGameEngine();

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.phone}>
        <View style={styles.earpiece} />

        <Display
          lines={state.displayLines}
          dialedDigits={state.dialedDigits}
          speakerphone={state.speakerphone}
          guessMode={state.guessMode}
          gameActive={state.gameActive}
          showText={state.showText}
          onToggleText={toggleShowText}
        />

        <Keypad
          onDigitPress={pressDigit}
          disabled={!state.gameActive || state.isCalling}
        />

        <ActionButtons
          onCall={makeCall}
          onRedial={redial}
          onClear={clearDigits}
          onSpeakerToggle={toggleSpeakerphone}
          onGuessToggle={toggleGuessMode}
          onNewGame={startNewGame}
          speakerphone={state.speakerphone}
          guessMode={state.guessMode}
          gameActive={state.gameActive}
          isCalling={state.isCalling}
        />

        <View style={styles.bottomGrip} />
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  phone: {
    flex: 1,
    backgroundColor: COLORS.phoneBody,
    marginHorizontal: 8,
    marginVertical: 12,
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  earpiece: {
    width: 80,
    height: 6,
    backgroundColor: COLORS.phoneBodyDark,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 4,
  },
  bottomGrip: {
    width: 120,
    height: 4,
    backgroundColor: COLORS.phoneBodyDark,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
});
