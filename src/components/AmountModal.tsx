import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BottomSheet } from './BottomSheet';
import { FONTS } from '../constants/fonts';
import * as Haptics from 'expo-haptics';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const KEY_WIDTH = (SCREEN_WIDTH - 80) / 3;

interface AmountModalProps {
  visible: boolean;
  amount: number;
  onSave: (amount: number) => void;
  onClose: () => void;
}

export const AmountModal: React.FC<AmountModalProps> = ({
  visible,
  amount,
  onSave,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState('0');

  useEffect(() => {
    if (visible) {
      setInputValue(amount > 0 ? amount.toFixed(2).replace(/\.?0+$/, '') : '0');
    }
  }, [visible, amount]);

  const handleKeyPress = async (key: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    setInputValue(prev => {
      if (prev === '0' && key !== '.') return key;
      if (key === '.' && prev.includes('.')) return prev;
      const parts = prev.split('.');
      if (parts[1] && parts[1].length >= 2) return prev;
      return prev + key;
    });
  };

  const handleBackspace = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    setInputValue(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleDone = () => {
    const numericValue = parseFloat(inputValue) || 0;
    onSave(numericValue);
    onClose();
  };

  const renderKey = (key: string, subLabel?: string) => (
    <TouchableOpacity
      style={styles.key}
      onPress={() => handleKeyPress(key)}
      activeOpacity={0.7}
    >
      <Text style={styles.keyText}>{key}</Text>
      {subLabel && <Text style={styles.keySubText}>{subLabel}</Text>}
    </TouchableOpacity>
  );

  return (
    <BottomSheet 
      visible={visible} 
      onClose={onClose}
      height={SCREEN_HEIGHT * 0.52}
    >
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Amount</Text>
        <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>$</Text>
          <Text style={styles.inputText}>
            {inputValue || '0'}
          </Text>
        </View>
      </View>

      <View style={styles.keypad}>
        <View style={styles.keyRow}>
          {renderKey('1')}
          {renderKey('2', 'ABC')}
          {renderKey('3', 'DEF')}
        </View>
        <View style={styles.keyRow}>
          {renderKey('4', 'GHI')}
          {renderKey('5', 'JKL')}
          {renderKey('6', 'MNO')}
        </View>
        <View style={styles.keyRow}>
          {renderKey('7', 'PQRS')}
          {renderKey('8', 'TUV')}
          {renderKey('9', 'WXYZ')}
        </View>
        <View style={styles.keyRow}>
          {renderKey('.')}
          {renderKey('0')}
          <TouchableOpacity
            style={styles.key}
            onPress={handleBackspace}
            activeOpacity={0.7}
          >
            <Text style={styles.backspaceText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerSpacer: {
    width: 50,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: FONTS.semibold,
    color: '#000',
  },
  doneButton: {
    minWidth: 50,
    alignItems: 'flex-end',
  },
  doneText: {
    fontSize: 17,
    fontFamily: FONTS.semibold,
    color: '#002FFF',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  currencySymbol: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    color: '#1C1E22',
    marginRight: 6,
  },
  inputText: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    color: '#1C1E22',
    flex: 1,
  },
  keypad: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    backgroundColor: '#CCCED3C2',
    flex: 1,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  key: {
    width: KEY_WIDTH,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  keyText: {
    fontSize: 24,
    fontFamily: FONTS.regular,
    color: '#000000',
  },
  keySubText: {
    fontSize: 10,
    fontFamily: FONTS.regular,
    color: '#000000',
    marginTop: -2,
    letterSpacing: 1.5,
    opacity: 0.6,
  },
  backspaceText: {
    fontSize: 24,
    color: '#000000',
  },
});
