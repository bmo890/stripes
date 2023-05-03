import React from 'react';
import { View } from 'react-native';
import {BeltLevel, StripeLevel} from '../../Stripe Playlist/index'
interface ChooseStripeIconProps {
  amount: number;
  belt: BeltLevel
}

const ChooseStripeIcon: React.FC<ChooseStripeIconProps> = ({ amount, belt }) => {
//   const beltColor = belt === BeltLevel.White ? 'white' : 'blue';
const beltColor = belt === 0 ? 'white' : 'blue'
console.log(belt)

  return (
    <View
      style={{
        width: 84,
        height: 32,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: beltColor,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
      }}
    >
      <View
        style={{
          width: '70%',
          backgroundColor: 'black',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {[...Array(amount + 1)].map((_, i) => (
          <View
            key={i}
            style={{
              width: 4.8,
              height: '100%',
              backgroundColor: 'white',
              marginLeft: 8,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default ChooseStripeIcon;
