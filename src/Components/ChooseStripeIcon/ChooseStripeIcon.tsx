import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BeltLevel, StripeLevel } from '../../Stripe Playlist/index';

interface ChooseStripeIconProps {
  amount: number;
  belt: BeltLevel;
}

const ChooseStripeIcon: React.FC<ChooseStripeIconProps> = ({ amount, belt }) => {
  const beltColor = belt === 0 ? 'white' : 'royalblue';
  const containerStyle = [styles.container, { backgroundColor: beltColor }];

  return (
    <View style={containerStyle}>
      <View style={styles.stripes}>
        {[...Array(amount)].map((_, i) => (
          <View key={i} style={styles.stripe} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 95,
    height: 32,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  stripes: {
    width: '70%',
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 4,
  },
  stripe: {
    width: 5,
    height: '100%',
    marginLeft: 7.5,
    borderLeftWidth: 4.8,
    borderLeftColor: 'white',
  },
});

export default ChooseStripeIcon;
