import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { App } from '../types';
import { APPS } from '../data/apps';
import { AppIcon } from './AppIcon';
import { BottomSheet } from './BottomSheet';
import { FONTS } from '../constants/fonts';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AppSelectorModalProps {
  visible: boolean;
  selectedApp: App | null;
  onSelect: (app: App) => void;
  onClose: () => void;
}

export const AppSelectorModal: React.FC<AppSelectorModalProps> = ({
  visible,
  selectedApp,
  onSelect,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = APPS.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (app: App) => {
    onSelect(app);
    onClose();
  };

  return (
    <BottomSheet 
      visible={visible} 
      onClose={onClose}
      height={SCREEN_HEIGHT * 0.75}
    >
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>App</Text>
        <TouchableOpacity onPress={onClose} style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filteredApps}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.appItem}
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
          >
            <AppIcon app={item} size={44} />
            <Text style={styles.appName}>{item.name}</Text>
            {selectedApp?.id === item.id && (
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: '#000',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  appName: {
    flex: 1,
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: '#1C1E22',
    marginLeft: 16,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginLeft: 60,
  },
});
