import React, { useState } from "react";
import { View, StyleSheet, Text} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

// const StripeSection = ({ sections }) => {
//   // Render the accordions and VideoTypeCards here.
//   return (
//       <View>
//           hi
//       </View>
//   )
// };

const BeltPage = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "stripe1", title: "Stripe 1" },
    { key: "stripe2", title: "Stripe 2" },
    { key: "stripe3", title: "Stripe 3" },
    { key: "stripe4", title: "Stripe 4" },
  ]);

  // const renderScene = SceneMap({
  //   stripe1: () => <StripeSection sections={/* Pass stripe 1 sections here */} />,
  //   stripe2: () => <StripeSection sections={/* Pass stripe 2 sections here */} />,
  //   stripe3: () => <StripeSection sections={/* Pass stripe 3 sections here */} />,
  //   stripe4: () => <StripeSection sections={/* Pass stripe 4 sections here */} />,
  // });

  // const renderTabBar = (props) => (
  //   <TabBar
  //     {...props}
  //     indicatorStyle={styles.indicator}
  //     style={styles.tabBar}
  //     labelStyle={styles.tabLabel}
  //   />
  // );

  return (
    <View style={styles.container}>
      <Text>hi</Text>
      {/* <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        renderTabBar={renderTabBar}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "white",
  },
  tabLabel: {
    color: "black",
    fontWeight: "bold",
  },
  indicator: {
    backgroundColor: "blue",
  },
});

export default BeltPage;
