import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';

// Selected category icons for form display
const CATEGORY_ICONS_SELECTED: Record<string, any> = {
  subscription: require('../../assets/icons/Subscription Select.png'),
  utility: require('../../assets/icons/utility_select.png'),
  card_payment: require('../../assets/icons/card payment select.png'),
  loan: require('../../assets/icons/currency sign.png'),
  rent: require('../../assets/icons/Rent select.png'),
};
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { App, Category, Frequency, ReminderOption, Subscription } from '../types';
import { APPS } from '../data/apps';
import { CATEGORIES } from '../data/categories';
import { FREQUENCIES, REMINDER_OPTIONS } from '../data/frequencies';
import { FONTS } from '../constants/fonts';
import {
  AppIcon,
  AppSelectorModal,
  AmountModal,
  CategoryModal,
  DatePickerModal,
  FrequencyModal,
  ReminderModal,
} from '../components';

type ModalType = 'app' | 'amount' | 'category' | 'date' | 'frequency' | 'reminder' | null;

export const EditSubscription: React.FC = () => {
  // State for subscription data
  const [subscription, setSubscription] = useState<Subscription>({
    app: APPS[0], // Netflix as default
    amount: 50.00,
    category: CATEGORIES.find(c => c.id === 'loan') || null,
    startDate: new Date(2025, 3, 12), // Apr 12, 2025
    frequency: FREQUENCIES.find(f => f.id === 'weekly') || null,
    remindMe: REMINDER_OPTIONS.find(r => r.id === '2_days') || null,
    active: true,
  });

  // Modal visibility state
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatAmount = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, this would navigate back
    Alert.alert('Back', 'Navigate back to previous screen');
  };

  const handleSave = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Saved!', 'Subscription has been saved successfully.', [
      { text: 'OK' }
    ]);
  };

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Delete Subscription',
      'Are you sure you want to delete this subscription?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Deleted', 'Subscription has been deleted.');
          }
        }
      ]
    );
  };

  const openModal = (modal: ModalType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveModal(modal);
  };

  const closeModal = () => setActiveModal(null);

  const updateSubscription = <K extends keyof Subscription>(
    key: K,
    value: Subscription[K]
  ) => {
    setSubscription(prev => ({ ...prev, [key]: value }));
  };

  const renderFormRow = (
    label: string,
    value: string,
    onPress: () => void,
    showChevron = true
  ) => (
    <TouchableOpacity 
      style={styles.formRow} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.formLabel}>{label}</Text>
      <View style={styles.formValueContainer}>
        <Text style={styles.formValue}>{value}</Text>
        {showChevron && (
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-up" size={12} color="#C7C7CC" />
            <Ionicons name="chevron-down" size={12} color="#C7C7CC" style={styles.chevronDown} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Subscription</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Header Card */}
        <TouchableOpacity 
          style={styles.appCard}
          onPress={() => openModal('app')}
          activeOpacity={0.8}
        >
          <AppIcon app={subscription.app} size={52} />
          <View style={styles.appInfo}>
            <Text style={styles.appName}>
              {subscription.app?.name || 'Choose an app'}
            </Text>
            <Text style={styles.appPrice}>
              {formatAmount(subscription.amount)}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Form Section 1 */}
        <View style={styles.formSection}>
          {renderFormRow(
            'App',
            subscription.app?.name || 'Choose an app',
            () => openModal('app')
          )}
          <View style={styles.separator} />
          
          {renderFormRow(
            'Amount',
            formatAmount(subscription.amount),
            () => openModal('amount'),
            false
          )}
          <View style={styles.separator} />
          
          <TouchableOpacity 
            style={styles.formRow} 
            onPress={() => openModal('category')}
            activeOpacity={0.7}
          >
            <Text style={styles.formLabel}>Category</Text>
            <View style={styles.formValueContainer}>
              {subscription.category && CATEGORY_ICONS_SELECTED[subscription.category.id] && (
                <Image 
                  source={CATEGORY_ICONS_SELECTED[subscription.category.id]} 
                  style={styles.categoryIconImage} 
                  resizeMode="contain" 
                />
              )}
              <Text style={styles.formValue}>
                {subscription.category?.name || 'Select'}
              </Text>
              <View style={styles.chevronContainer}>
                <Ionicons name="chevron-up" size={12} color="#C7C7CC" />
                <Ionicons name="chevron-down" size={12} color="#C7C7CC" style={styles.chevronDown} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Section 2 */}
        <View style={styles.formSection}>
          <TouchableOpacity 
            style={styles.formRow} 
            onPress={() => openModal('date')}
            activeOpacity={0.7}
          >
            <Text style={styles.formLabel}>Start Date</Text>
            <View style={styles.formValueContainer}>
              <View style={styles.dateValueContainer}>
                <Text style={styles.dateValue}>{formatDate(subscription.startDate)}</Text>
              </View>
              <View style={styles.chevronContainer}>
                <Ionicons name="chevron-up" size={12} color="#C7C7CC" />
                <Ionicons name="chevron-down" size={12} color="#C7C7CC" style={styles.chevronDown} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          
          {renderFormRow(
            'Frequency',
            subscription.frequency?.name || 'Select',
            () => openModal('frequency')
          )}
          <View style={styles.separator} />
          
          {renderFormRow(
            'Remind Me',
            subscription.remindMe?.name || 'None',
            () => openModal('reminder')
          )}
          <View style={styles.separator} />
          
          {/* Active Toggle */}
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Active</Text>
            <Switch
              value={subscription.active}
              onValueChange={(value) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                updateSubscription('active', value);
              }}
              trackColor={{ false: '#E5E5EA', true: '#34C759' }}
              thumbColor="#fff"
              ios_backgroundColor="#E5E5EA"
            />
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <AppSelectorModal
        visible={activeModal === 'app'}
        selectedApp={subscription.app}
        onSelect={(app: App) => updateSubscription('app', app)}
        onClose={closeModal}
      />

      <AmountModal
        visible={activeModal === 'amount'}
        amount={subscription.amount}
        onSave={(amount: number) => updateSubscription('amount', amount)}
        onClose={closeModal}
      />

      <CategoryModal
        visible={activeModal === 'category'}
        selectedCategory={subscription.category}
        onSelect={(category: Category) => updateSubscription('category', category)}
        onClose={closeModal}
      />

      <DatePickerModal
        visible={activeModal === 'date'}
        date={subscription.startDate}
        onSelect={(date: Date) => updateSubscription('startDate', date)}
        onClose={closeModal}
      />

      <FrequencyModal
        visible={activeModal === 'frequency'}
        selectedFrequency={subscription.frequency}
        onSelect={(frequency: Frequency) => updateSubscription('frequency', frequency)}
        onClose={closeModal}
      />

      <ReminderModal
        visible={activeModal === 'reminder'}
        selectedReminder={subscription.remindMe}
        onSelect={(reminder: ReminderOption) => updateSubscription('remindMe', reminder)}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: '#F2F2F7',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  backButtonCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: FONTS.semibold,
    color: '#000',
  },
  saveButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 17,
    fontFamily: FONTS.semibold,
    color: '#002FFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  appCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  appInfo: {
    marginLeft: 14,
  },
  appName: {
    fontSize: 17,
    fontFamily: FONTS.semibold,
    color: '#000',
    marginBottom: 2,
  },
  appPrice: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: '#8E8E93',
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  formLabel: {
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: '#636A79',
  },
  formValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryIconImage: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  formValue: {
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: '#1C1E22',
  },
  dateValueContainer: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  dateValue: {
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: '#1C1E22',
  },
  chevronContainer: {
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  chevronDown: {
    marginTop: -4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginLeft: 16,
  },
  deleteButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#F2F2F7',
  },
  deleteButtonText: {
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: '#FF3B30',
  },
});
