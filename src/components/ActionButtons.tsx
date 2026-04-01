import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { COLORS } from '../theme';

interface ActionButtonsProps {
  onCall: () => void;
  onRedial: () => void;
  onClear: () => void;
  onSpeakerToggle: () => void;
  onGuessToggle: () => void;
  onNewGame: () => void;
  speakerphone: boolean;
  guessMode: boolean;
  gameActive: boolean;
  isCalling: boolean;
}

export function ActionButtons({
  onCall,
  onRedial,
  onClear,
  onSpeakerToggle,
  onGuessToggle,
  onNewGame,
  speakerphone,
  guessMode,
  gameActive,
  isCalling,
}: ActionButtonsProps) {
  const handleNewGame = () => {
    Alert.alert(
      'New Game',
      gameActive
        ? 'Are you sure you want to start a new game? Current progress will be lost.'
        : 'Start a new game?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: onNewGame },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ActionButton
          label="CALL"
          onPress={onCall}
          disabled={isCalling || !gameActive}
          style={styles.callBtn}
          textStyle={styles.callBtnText}
        />
        <ActionButton
          label="REDIAL"
          onPress={onRedial}
          disabled={isCalling || !gameActive}
        />
        <ActionButton
          label="DEL"
          onPress={onClear}
          disabled={isCalling}
        />
      </View>
      <View style={styles.row}>
        <ActionButton
          label={speakerphone ? 'SPEAKER\nON' : 'SPEAKER\nOFF'}
          onPress={onSpeakerToggle}
          disabled={!gameActive}
          active={speakerphone}
          activeColor={COLORS.speakerOn}
        />
        <ActionButton
          label="GUESS"
          onPress={onGuessToggle}
          disabled={isCalling || !gameActive}
          active={guessMode}
          activeColor={COLORS.guessMode}
        />
        <ActionButton
          label={"NEW\nGAME"}
          onPress={handleNewGame}
          disabled={isCalling}
          style={styles.newGameBtn}
          textStyle={styles.newGameBtnText}
        />
      </View>
    </View>
  );
}

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  active?: boolean;
  activeColor?: string;
  style?: object;
  textStyle?: object;
}

function ActionButton({
  label,
  onPress,
  disabled,
  active,
  activeColor,
  style,
  textStyle,
}: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.actionBtn,
        active && { backgroundColor: activeColor || COLORS.actionBtnActive },
        pressed && styles.actionBtnPressed,
        disabled && styles.actionBtnDisabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.actionBtnText,
          active && styles.actionBtnActiveText,
          disabled && styles.actionBtnTextDisabled,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    maxWidth: 100,
    height: 52,
    borderRadius: 10,
    backgroundColor: COLORS.actionBtn,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  actionBtnPressed: {
    transform: [{ scale: 0.95 }],
    elevation: 1,
  },
  actionBtnDisabled: {
    opacity: 0.4,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.actionBtnText,
    textAlign: 'center',
    lineHeight: 14,
  },
  actionBtnActiveText: {
    color: COLORS.actionBtnActiveText,
  },
  actionBtnTextDisabled: {
    color: '#888',
  },
  callBtn: {
    backgroundColor: '#22cc66',
  },
  callBtnText: {
    color: '#ffffff',
    fontSize: 14,
  },
  newGameBtn: {
    backgroundColor: COLORS.dangerBtn,
  },
  newGameBtnText: {
    color: COLORS.dangerBtnText,
  },
});
