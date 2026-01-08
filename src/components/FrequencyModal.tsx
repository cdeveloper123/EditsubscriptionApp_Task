import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Frequency } from '../types';
import { FREQUENCIES } from '../data/frequencies';
import { BottomSheet } from './BottomSheet';
import { FONTS } from '../constants/fonts';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FrequencyModalProps {
  visible: boolean;
  selectedFrequency: Frequency | null;
  onSelect: (frequency: Frequency) => void;
  onClose: () => void;
}

export const FrequencyModal: React.FC<FrequencyModalProps> = ({
  visible,
  selectedFrequency,
  onSelect,
  onClose,
}) => {
  const handleSelect = (frequency: Frequency) => {
    onSelect(frequency);
    onClose();
  };

  return (
    <BottomSheet 
      visible={visible} 
      onClose={onClose}
      height={SCREEN_HEIGHT * 0.28}
    >
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Frequency</Text>
        <TouchableOpacity onPress={onClose} style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={FREQUENCIES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.frequencyItem}
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.frequencyName}>{item.name}</Text>
            {selectedFrequency?.id === item.id && (
              <Ionicons name="checkmark-circle" size={24} color="#002FFF" />
            )}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
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
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  frequencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  frequencyName: {
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: '#1C1E22',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
  },
});
