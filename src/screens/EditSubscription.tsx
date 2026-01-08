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
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { App, Category, Frequency, ReminderOption, Subscription } from '../types';
import { APPS } from '../data/apps';
import { CATEGORIES } from '../data/categories';
import { FREQUENCIES, REMINDER_OPTIONS } from '../data/frequencies';
import { FONTS } from '../constants/fonts';
import { sharedStyles, COLORS } from '../constants/styles';
import {
  AppIcon,
  AppSelectorModal,
  AmountModal,
  CategoryModal,
  DatePickerModal,
  FrequencyModal,
  ReminderModal,
  FormRow,
} from '../components';

// Selected category icons for form display
const CATEGORY_ICONS_SELECTED: Record<string, any> = {
  subscription: require('../../assets/icons/Subscription Select.png'),
  utility: require('../../assets/icons/utility_select.png'),
  card_payment: require('../../assets/icons/card payment select.png'),
  loan: require('../../assets/icons/currency sign.png'),
  rent: require('../../assets/icons/Rent select.png'),
};

type ModalType = 'app' | 'amount' | 'category' | 'date' | 'frequency' | 'reminder' | null;

export const EditSubscription: React.FC = () => {
  const [subscription, setSubscription] = useState<Subscription>({
    app: APPS[0],
    amount: 50.00,
    category: CATEGORIES.find(c => c.id === 'loan') || null,
    startDate: new Date(2025, 3, 12),
    frequency: FREQUENCIES.find(f => f.id === 'weekly') || null,
    remindMe: REMINDER_OPTIONS.find(r => r.id === '2_days') || null,
    active: true,
  });

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatAmount = (amount: number): string => `$${amount.toFixed(2)}`;

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Back', 'Navigate back to previous screen');
  };

  const handleSave = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Saved!', 'Subscription has been saved successfully.', [{ text: 'OK' }]);
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

  const updateSubscription = <K extends keyof Subscription>(key: K, value: Subscription[K]) => {
    setSubscription(prev => ({ ...prev, [key]: value }));
  };

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
        <Text style={sharedStyles.title}>Edit Subscription</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={sharedStyles.primaryButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* App Header Card */}
        <TouchableOpacity style={styles.appCard} onPress={() => openModal('app')} activeOpacity={0.8}>
          <AppIcon app={subscription.app} size={52} />
          <View style={styles.appInfo}>
            <Text style={styles.appName}>{subscription.app?.name || 'Choose an app'}</Text>
            <Text style={styles.appPrice}>{formatAmount(subscription.amount)}</Text>
          </View>
        </TouchableOpacity>

        {/* Form Section 1 */}
        <View style={sharedStyles.formSection}>
          <FormRow label="App" value={subscription.app?.name || 'Choose an app'} onPress={() => openModal('app')} />
          <View style={sharedStyles.separator} />
          <FormRow label="Amount" value={formatAmount(subscription.amount)} onPress={() => openModal('amount')} showChevron={false} />
          <View style={sharedStyles.separator} />
          <FormRow 
            label="Category" 
            value={subscription.category?.name || 'Select'} 
            onPress={() => openModal('category')}
            icon={subscription.category ? CATEGORY_ICONS_SELECTED[subscription.category.id] : undefined}
          />
        </View>

        {/* Form Section 2 */}
        <View style={sharedStyles.formSection}>
          <FormRow label="Start Date" value={formatDate(subscription.startDate)} onPress={() => openModal('date')} valueStyle="badge" />
          <View style={sharedStyles.separator} />
          <FormRow label="Frequency" value={subscription.frequency?.name || 'Select'} onPress={() => openModal('frequency')} />
          <View style={sharedStyles.separator} />
          <FormRow label="Remind Me" value={subscription.remindMe?.name || 'None'} onPress={() => openModal('reminder')} />
          <View style={sharedStyles.separator} />
          
          {/* Active Toggle */}
          <View style={sharedStyles.formRow}>
            <Text style={sharedStyles.formLabel}>Active</Text>
            <Switch
              value={subscription.active}
              onValueChange={(value) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                updateSubscription('active', value);
              }}
              trackColor={{ false: COLORS.border, true: COLORS.success }}
              thumbColor="#fff"
              ios_backgroundColor={COLORS.border}
            />
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.7}>
          <Text style={sharedStyles.dangerButtonText}>Delete</Text>
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
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
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
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
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
    backgroundColor: COLORS.card,
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
    color: COLORS.textMuted,
  },
  deleteButton: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.background,
  },
});
