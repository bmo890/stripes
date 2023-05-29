import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { ScreenProps } from "../MainLayout/MainLayout";
import { useRoute, RouteProp, Route } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Style, Course, GI_COURSES, NOGI_COURSES } from ".";
import StyleCourses from "./Components/StyleCourses";

const CoursesCollectionPage = ({ route, navigation }: ScreenProps, ) => {
  const { style } = route.params as { style: string };
  const styleTypes = [GI_COURSES, NOGI_COURSES];
  // systemType === SystemType.Gi ? WHITE_PLAYLIST : BLUE_PLAYLIST;
  interface TabType {
    key: string;
    courses: Style;
    title: string;
  }
  const [currentTab, setCurrentTab] = useState(style === 'gi' ? 0 : 1);
  const [tabs] = useState<TabType[]>(
    styleTypes.map(
      (type, index): TabType => {
        // console.log(stripe);
        return {
          key: index.toString(),
          courses: type,
          title: type.nameEN,
        };
      }
    )
  );

  const renderScene = ({ route }: { route: TabType }) => {
    // const stripeIndex = parseInt(route.key.replace("stripe", "")) - 1;
    const coursesIndex = parseInt(route.key);
    const style = styleTypes[coursesIndex];
    return <StyleCourses style={style} />;
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({
        route,
        focused,
        color,
      }: {
        route: TabType;
        focused: boolean;
        color: string;
      }) => {
        return (
          <View>
            <Text>{route.title}</Text>
            {/* <ChooseStripeIcon amount={route.stripe + 1} belt={BeltLevel.White}/> */}
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

export default CoursesCollectionPage;
