import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../types';
import { CATEGORIES } from '../data/categories';
import { BottomSheet } from './BottomSheet';
import { FONTS } from '../constants/fonts';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Category icons by ID
const CATEGORY_ICONS: Record<string, any> = {
  subscription: require('../../assets/icons/Subscription.png'),
  utility: require('../../assets/icons/utility.png'),
  card_payment: require('../../assets/icons/Card payment.png'),
  loan: require('../../assets/icons/Loan.png'),
  rent: require('../../assets/icons/Rent.png'),
};

interface CategoryModalProps {
  visible: boolean;
  selectedCategory: Category | null;
  onSelect: (category: Category) => void;
  onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  selectedCategory,
  onSelect,
  onClose,
}) => {
  const handleSelect = (category: Category) => {
    onSelect(category);
    onClose();
  };

  const renderCategoryIcon = (categoryId: string) => {
    const iconSource = CATEGORY_ICONS[categoryId];
    if (iconSource) {
      return (
        <Image 
          source={iconSource} 
          style={styles.categoryIcon} 
          resizeMode="contain" 
        />
      );
    }
    return <Ionicons name="ellipse-outline" size={22} color="#8E8E93" />;
  };

  return (
    <BottomSheet 
      visible={visible} 
      onClose={onClose}
      height={SCREEN_HEIGHT * 0.5}
    >
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Category</Text>
        <TouchableOpacity onPress={onClose} style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {renderCategoryIcon(item.id)}
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
            {selectedCategory?.id === item.id && (
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
    paddingBottom: 40,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 44,
    height: 44,
  },
  categoryName: {
    flex: 1,
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: '#1C1E22',
    marginLeft: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginLeft: 56,
  },
});
