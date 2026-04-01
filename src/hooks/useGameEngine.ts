import { useRef, useState, useCallback, useEffect } from 'react';
import { DreamPhoneEngine } from '../game/engine';
import { CallResult, FriendCall, GameState } from '../game/types';
import { speakClue, speak, stopSpeaking } from '../utils/speech';
import { findBoyByPhone, formatPhoneNumber } from '../game/data';
import { initAudioRouting, setSpeakerphone } from '../utils/audioRouting';
import {
  initDTMF,
  playOutgoingRing,
  stopOutgoingRing,
  playIncomingRing,
  stopIncomingRing,
} from '../utils/dtmf';

const INITIAL_STATE: GameState = {
  gameActive: false,
  guessMode: false,
  speakerphone: false,
  showText: true,
  dialedDigits: '',
  lastCall: null,
  displayLines: ['DREAM PHONE', '', 'Press NEW GAME to start'],
  isCalling: false,
};

export function useGameEngine() {
  const engineRef = useRef(new DreamPhoneEngine());
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  useEffect(() => {
    initDTMF().catch(() => {});
  }, []);

  const setDisplay = useCallback((...lines: string[]) => {
    setState((s) => ({ ...s, displayLines: lines }));
  }, []);

  const pressDigit = useCallback(
    (digit: string) => {
      setState((prev) => {
        if (!prev.gameActive || prev.isCalling) return prev;
        if (prev.dialedDigits.length >= 7) return prev;

        const newDigits = prev.dialedDigits + digit;
        const formatted = formatPhoneNumber(newDigits);

        return {
          ...prev,
          dialedDigits: newDigits,
          displayLines: prev.guessMode
            ? ['GUESS MODE', '', formatted]
            : ['Dialing...', '', formatted],
        };
      });
    },
    []
  );

  const clearDigits = useCallback(() => {
    setState((prev) => {
      if (prev.isCalling) return prev;
      return {
        ...prev,
        dialedDigits: '',
        displayLines: prev.guessMode
          ? ['GUESS MODE', '', 'Dial the number of', 'your crush guess']
          : prev.gameActive
            ? ['Ready to dial', '', 'Enter a phone number']
            : prev.displayLines,
      };
    });
  }, []);

  const makeCall = useCallback(async () => {
    const currentState = state;
    if (!currentState.gameActive || currentState.isCalling) return;

    const digits = currentState.dialedDigits;
    if (digits.length !== 7) {
      setDisplay('Invalid number', '', 'Dial 7 digits');
      return;
    }

    const engine = engineRef.current;

    if (currentState.guessMode) {
      setState((s) => ({ ...s, isCalling: true, dialedDigits: '' }));

      const result = engine.guess(digits);
      if (result.type === 'wrong_number') {
        setDisplay("That's not", "anyone's number!", '', 'Try again');
        setState((s) => ({ ...s, isCalling: false }));
        return;
      }

      if (result.type === 'correct_guess') {
        setDisplay(
          `${result.boy!.name} is your`,
          'secret admirer!',
          '',
          'YOU WIN!'
        );
        await speak(
          `Yes! ${result.boy!.name} is your secret admirer! You got it right!`
        );
        setState((s) => ({
          ...s,
          isCalling: false,
          guessMode: false,
          gameActive: false,
          displayLines: [
            `${result.boy!.name} is your`,
            'secret admirer!',
            '',
            'YOU WIN!',
            '',
            'Press NEW GAME to play again',
          ],
        }));
      } else {
        setDisplay(`${result.boy!.name}?`, '', "That's not right!", 'Try again next turn');
        await speak(`${result.boy!.name}? No way! That's not right. Try again!`);
        setState((s) => ({
          ...s,
          isCalling: false,
          guessMode: false,
        }));
      }
      return;
    }

    const isFirst = engine.isFirstCall(digits);
    const result = engine.dial(digits);

    if (result.type === 'wrong_number') {
      setState((s) => ({ ...s, isCalling: true, dialedDigits: '' }));
      setDisplay('Calling...', '', '* ring * ring *');
      await playOutgoingRing();
      await new Promise((r) => setTimeout(r, 3000));
      stopOutgoingRing();
      setDisplay('Uh oh!', '', 'Wrong number!');
      await speak('Uh oh, wrong number!');
      setState((s) => ({ ...s, isCalling: false }));
      return;
    }

    setState((s) => ({
      ...s,
      isCalling: true,
      lastCall: result,
      dialedDigits: '',
    }));

    setDisplay(`Calling ${result.boy!.name}...`, '', '* ring * ring *');
    await playOutgoingRing();
    await new Promise((r) => setTimeout(r, 3000));
    stopOutgoingRing();

    await playClueResult(result, isFirst, currentState.speakerphone);

    setState((s) => ({ ...s, isCalling: false }));
    await checkAndPlayFriendCall();
  }, [state, setDisplay]);

  const playClueResult = async (
    result: CallResult,
    isFirst: boolean,
    speakerphone: boolean
  ) => {
    const boyName = result.boy!.name;

    if (result.type === 'no_clue') {
      const msg = `Ha ha! I'm not telling!`;
      setDisplay(boyName + ':', '', msg);
      await speak(
        isFirst
          ? `Hello? This is ${boyName}. Ha ha! I'm not telling!`
          : `You again? Ha ha, I'm still not telling!`
      );
      return;
    }

    const clue = result.clue!;

    if (speakerphone) {
      setDisplay(
        boyName + ':',
        clue.loudMessage,
        '',
        clue.quietMessage
      );
    } else {
      setDisplay(
        boyName + ':',
        clue.loudMessage,
        '',
        '(hold phone to ear)'
      );
    }

    const greeting = isFirst
      ? `Hello? This is ${boyName}. You want to know about your secret admirer?`
      : `You again? I already told you!`;

    await speak(greeting);

    await setSpeakerphone(true);
    await speak(clue.loudMessage);
    await setSpeakerphone(speakerphone);
    await new Promise((r) => setTimeout(r, 300));

    setDisplay(boyName + ':', clue.loudMessage, '', clue.quietMessage);
    await speak(clue.quietMessage);
  };

  const playFriendCall = async (friendCall: FriendCall) => {
    setState((s) => ({ ...s, isCalling: true }));
    await setSpeakerphone(true);

    setDisplay('Incoming call...', '', '* ring * ring *');
    await playIncomingRing();
    await new Promise((r) => setTimeout(r, 3500));
    stopIncomingRing();

    setDisplay('Your friend:', '', 'I just heard...');
    await speak('Hey! I just heard something!');

    const msg = `It's not ${friendCall.eliminatedName}!`;
    setDisplay('Your friend:', '', `It's not`, friendCall.eliminatedName + '!');
    await speak(msg);

    await new Promise((r) => setTimeout(r, 800));
    setState((s) => ({ ...s, isCalling: false }));
  };

  const checkAndPlayFriendCall = async () => {
    const engine = engineRef.current;
    engine.recordTurn();
    const friendCall = engine.checkFriendCall();
    if (friendCall) {
      await new Promise((r) => setTimeout(r, 2000));
      await playFriendCall(friendCall);
    }
  };

  const redial = useCallback(async () => {
    const engine = engineRef.current;
    const lastCall = engine.redial();

    if (!lastCall || !lastCall.boy) {
      setDisplay('No previous call', '', 'Dial a number first');
      return;
    }

    if (state.isCalling) return;

    setState((s) => ({ ...s, isCalling: true, dialedDigits: '' }));

    setDisplay(
      `Redialing ${lastCall.boy.name}...`,
      '',
      formatPhoneNumber(lastCall.boy.phoneNumber)
    );
    await playOutgoingRing();
    await new Promise((r) => setTimeout(r, 3000));
    stopOutgoingRing();

    await playClueResult(lastCall, false, state.speakerphone);

    setState((s) => ({ ...s, isCalling: false }));
    await checkAndPlayFriendCall();
  }, [state.isCalling, state.speakerphone, setDisplay]);

  const toggleSpeakerphone = useCallback(() => {
    setState((prev) => {
      const newSpeaker = !prev.speakerphone;
      setSpeakerphone(newSpeaker).catch(() => {});
      return {
        ...prev,
        speakerphone: newSpeaker,
      };
    });
  }, []);

  const toggleGuessMode = useCallback(() => {
    if (state.isCalling || !state.gameActive) return;
    setState((prev) => {
      const newGuess = !prev.guessMode;
      return {
        ...prev,
        guessMode: newGuess,
        dialedDigits: '',
        displayLines: newGuess
          ? ['GUESS MODE', '', 'Dial the number of', 'your crush guess']
          : ['Ready to dial', '', 'Enter a phone number'],
      };
    });
  }, [state.isCalling, state.gameActive]);

  const startNewGame = useCallback(() => {
    try {
      stopSpeaking();
    } catch {}
    try {
      initAudioRouting();
    } catch {}
    setSpeakerphone(true).catch(() => {});

    let crushResult;
    try {
      const engine = engineRef.current;
      crushResult = engine.newGame();
    } catch (e: any) {
      setState((s) => ({
        ...s,
        displayLines: ['ERROR in newGame:', '', e?.message ?? String(e)],
      }));
      return;
    }

    setState({
      gameActive: true,
      guessMode: false,
      speakerphone: false,
      showText: true,
      dialedDigits: '',
      lastCall: null,
      displayLines: ['New game started!', '', 'Dial a number to', 'make a call'],
      isCalling: false,
    });

    try {
      speak('New game! Dial a number to find your secret admirer!');
    } catch {}
  }, []);

  const toggleShowText = useCallback(() => {
    setState((prev) => ({ ...prev, showText: !prev.showText }));
  }, []);

  return {
    state,
    pressDigit,
    clearDigits,
    makeCall,
    redial,
    toggleSpeakerphone,
    toggleGuessMode,
    toggleShowText,
    startNewGame,
  };
}
