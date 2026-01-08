import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { App } from '../types';

interface AppIconProps {
  app: App | null;
  size?: number;
  showPlaceholder?: boolean;
}

// Local app logo images
const APP_LOGOS: Record<string, any> = {
  netflix: require('../../assets/icons/Netflix_icon 1.png'),
  spotify: require('../../assets/icons/spotify.png'),
  hulu: require('../../assets/icons/hulu.png'),
  apple: require('../../assets/icons/apple.png'),
  amazon: require('../../assets/icons/amazon.png'),
  nyt: require('../../assets/icons/NewYork times.png'),
  wsj: require('../../assets/icons/wsj.png'),
  chess: require('../../assets/icons/chess.png'),
};

// Apps that need a border (white backgrounds)
const NEEDS_BORDER = ['amazon', 'nyt', 'wsj'];

export const AppIcon: React.FC<AppIconProps> = ({ 
  app, 
  size = 48,
  showPlaceholder = true 
}) => {
  // Calculate border radius - circular for these icons
  const borderRadius = size / 2;

  if (!app && showPlaceholder) {
    return (
      <View style={[styles.placeholder, { width: size, height: size, borderRadius }]}>
        <Text style={[styles.placeholderText, { fontSize: size * 0.4 }]}>C</Text>
      </View>
    );
  }

  if (!app) return null;

  const hasLogo = APP_LOGOS[app.id];
  const needsBorder = NEEDS_BORDER.includes(app.id);

  if (hasLogo) {
    return (
      <View
        style={[
          styles.logoContainer,
          {
            width: size,
            height: size,
            borderRadius,
            borderWidth: needsBorder ? 1 : 0,
            borderColor: '#E5E5EA',
            overflow: 'hidden',
          },
        ]}
      >
        <Image
          source={APP_LOGOS[app.id]}
          style={[
            styles.logo,
            { 
              width: size, 
              height: size,
              borderRadius,
            }
          ]}
          resizeMode="cover"
        />
      </View>
    );
  }

  // Fallback for apps without local images
  return (
    <View 
      style={[
        styles.iconContainer, 
        { 
          width: size, 
          height: size, 
          borderRadius,
          backgroundColor: app.color 
        }
      ]}
    >
      <Text style={[styles.iconText, { fontSize: size * 0.45, color: '#fff' }]}>
        {app.icon || app.name.charAt(0)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontWeight: '600',
  },
  placeholder: {
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#8E8E93',
    fontWeight: '600',
  },
  logo: {
    backgroundColor: 'transparent',
  },
});
