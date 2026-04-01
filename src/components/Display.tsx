import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../theme';
import { formatPhoneNumber } from '../game/data';

interface DisplayProps {
  lines: string[];
  dialedDigits: string;
  speakerphone: boolean;
  guessMode: boolean;
  gameActive: boolean;
  showText: boolean;
  onToggleText: () => void;
}

export function Display({
  lines,
  dialedDigits,
  speakerphone,
  guessMode,
  gameActive,
  showText,
  onToggleText,
}: DisplayProps) {
  const hasDigits = dialedDigits.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.title}>DREAM PHONY</Text>
        <View style={styles.indicators}>
          {gameActive && speakerphone && (
            <Text style={styles.speakerIndicator}>SPEAKER</Text>
          )}
          {gameActive && guessMode && (
            <Text style={styles.guessIndicator}>GUESS</Text>
          )}
          {gameActive && (
            <Pressable onPress={onToggleText} hitSlop={8}>
              <Text style={[styles.textToggle, !showText && styles.textToggleOff]}>
                {showText ? 'TEXT' : 'HIDE'}
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {hasDigits && (
        <Text style={styles.dialedNumber}>
          {formatPhoneNumber(dialedDigits)}
        </Text>
      )}

      <View style={styles.messageArea}>
        {showText ? (
          lines.map((line, i) => (
            <Text key={i} style={line === '' ? styles.emptyLine : styles.line}>
              {line}
            </Text>
          ))
        ) : (
          <Text style={styles.hiddenText}>Display hidden</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.display,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
    minHeight: 160,
    borderWidth: 2,
    borderColor: '#1a3a5c',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1a3a5c',
    paddingBottom: 6,
  },
  title: {
    color: COLORS.displayTextDim,
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  indicators: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  speakerIndicator: {
    color: COLORS.speakerOn,
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: 'bold',
  },
  guessIndicator: {
    color: COLORS.guessMode,
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: 'bold',
  },
  textToggle: {
    color: COLORS.displayText,
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: COLORS.displayTextDim,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  textToggleOff: {
    color: COLORS.guessMode,
    borderColor: COLORS.guessMode,
  },
  dialedNumber: {
    color: COLORS.accent,
    fontFamily: 'monospace',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 3,
  },
  messageArea: {
    flex: 1,
    justifyContent: 'center',
  },
  line: {
    color: COLORS.displayText,
    fontFamily: 'monospace',
    fontSize: 16,
    lineHeight: 24,
  },
  emptyLine: {
    height: 8,
  },
  hiddenText: {
    color: COLORS.displayTextDim,
    fontFamily: 'monospace',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
