import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTS } from '../constants/fonts';

interface ModalHeaderProps {
  title: string;
  onDone: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onDone }) => {
  return (
    <View style={styles.header}>
      <View style={styles.spacer} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onDone} style={styles.doneButton}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  spacer: {
    width: 50,
  },
  title: {
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
});
