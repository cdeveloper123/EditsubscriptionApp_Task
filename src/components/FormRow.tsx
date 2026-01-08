import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sharedStyles, COLORS } from '../constants/styles';

interface FormRowProps {
  label: string;
  value: string;
  onPress: () => void;
  showChevron?: boolean;
  icon?: ImageSourcePropType;
  valueStyle?: 'default' | 'badge';
}

export const FormRow: React.FC<FormRowProps> = ({
  label,
  value,
  onPress,
  showChevron = true,
  icon,
  valueStyle = 'default',
}) => (
  <TouchableOpacity 
    style={sharedStyles.formRow} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={sharedStyles.formLabel}>{label}</Text>
    <View style={sharedStyles.formValueContainer}>
      {icon && (
        <Image 
          source={icon} 
          style={styles.icon} 
          resizeMode="contain" 
        />
      )}
      {valueStyle === 'badge' ? (
        <View style={styles.badgeContainer}>
          <Text style={sharedStyles.formValue}>{value}</Text>
        </View>
      ) : (
        <Text style={sharedStyles.formValue}>{value}</Text>
      )}
      {showChevron && (
        <View style={sharedStyles.chevronContainer}>
          <Ionicons name="chevron-up" size={12} color={COLORS.chevron} />
          <Ionicons name="chevron-down" size={12} color={COLORS.chevron} style={sharedStyles.chevronDown} />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  badgeContainer: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});

