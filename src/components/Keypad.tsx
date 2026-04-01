import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../theme';
import { playTone } from '../utils/dtmf';

interface KeypadProps {
  onDigitPress: (digit: string) => void;
  disabled: boolean;
}

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '#'],
];

const DIGIT_LETTERS: Record<string, string> = {
  '2': 'ABC',
  '3': 'DEF',
  '4': 'GHI',
  '5': 'JKL',
  '6': 'MNO',
  '7': 'PQRS',
  '8': 'TUV',
  '9': 'WXYZ',
};

export function Keypad({ onDigitPress, disabled }: KeypadProps) {
  return (
    <View style={styles.container}>
      {ROWS.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((digit) => (
            <Pressable
              key={digit}
              onPressIn={() => {
                playTone(digit);
                onDigitPress(digit);
              }}
              disabled={disabled}
              style={({ pressed }) => [
                styles.key,
                pressed && styles.keyPressed,
                disabled && styles.keyDisabled,
              ]}
            >
              <Text style={[styles.keyText, disabled && styles.keyTextDisabled]}>
                {digit}
              </Text>
              {DIGIT_LETTERS[digit] && (
                <Text style={styles.keyLetters}>{DIGIT_LETTERS[digit]}</Text>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  key: {
    width: 72,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.keypadBtn,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  keyPressed: {
    backgroundColor: COLORS.keypadBtnPressed,
    elevation: 1,
    transform: [{ scale: 0.95 }],
  },
  keyDisabled: {
    opacity: 0.5,
  },
  keyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.keypadBtnText,
  },
  keyTextDisabled: {
    color: '#999',
  },
  keyLetters: {
    fontSize: 8,
    color: '#666',
    letterSpacing: 2,
    marginTop: -2,
  },
});
