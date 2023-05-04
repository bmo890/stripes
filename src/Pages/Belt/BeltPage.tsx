import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { ScreenProps } from "../MainLayout/MainLayout";
import { useRoute, RouteProp, Route } from "@react-navigation/native";
import { BeltLevel, StripeLevel } from "../../Stripe Playlist";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ChooseStripeIcon from "../../Components/ChooseStripeIcon/ChooseStripeIcon";

import { BeltPlaylist, Stripe, Section } from "../../Stripe Playlist/index";

import {
  WHITE_PLAYLIST,
  BLUE_PLAYLIST,
} from "../../Stripe Playlist/WhiteBeltPlaylist";

interface StripeSectionProps {
  stripe: Stripe;
}

const StripeSection = ({ stripe }: StripeSectionProps) => {
  // Render the accordions and VideoTypeCards here.
  return (
    <View>
      <Text>hi</Text>
    </View>
  );
};

const BeltPage = ({ route, navigation }: ScreenProps) => {
  const { beltPage } = route.params as { beltPage: BeltLevel };
  const belt: BeltPlaylist =
    beltPage === BeltLevel.White ? WHITE_PLAYLIST : BLUE_PLAYLIST;
  interface TabType {
    key: string;
    stripe: StripeLevel;
    title: string;
  }
  const [currentTab, setCurrentTab] = useState(0);
  const [tabs] = useState<TabType[]>(
    belt.stripes.map(
      (stripe: Stripe, index): TabType => {
        // console.log(stripe);
        return {
          key: index.toString(),
          stripe: stripe.stripe,
          title: `Stripe ${stripe.stripe + 1}`,
        };
      }
    )
  );

  const renderScene = ({ route }: { route: TabType }) => {
    // const stripeIndex = parseInt(route.key.replace("stripe", "")) - 1;
    const stripeIndex = parseInt(route.key);
    const stripe = belt.stripes[stripeIndex];

    return <StripeSection stripe={stripe} />;
  };

  // const renderTabBar = (props: any) => (
  //   <TabBar
  //     {...props}
  //     indicatorStyle={styles.indicator}
  //     style={styles.tabBar}
  //     labelStyle={styles.tabLabel}
  //   />
  // );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }: { route: TabType; focused: boolean; color: string }) => {
        console.log(route);
        return (
          <View>
            <Text>{route.title}</Text>
            <ChooseStripeIcon amount={route.stripe + 1} belt={BeltLevel.White}/>
          </View>
        );
      }}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index: currentTab, routes: tabs }}
        renderScene={renderScene}
        onIndexChange={setCurrentTab}
        renderTabBar={renderTabBar}
      />
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
