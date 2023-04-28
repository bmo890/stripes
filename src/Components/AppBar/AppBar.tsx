import * as React from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
  },
  content: {
    color: "white",
  },
});

const AppBar = ({
  back,
  navigation,
  options,
  route,
}: NativeStackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header style={styles.header}>
      {back && (
        <Appbar.BackAction
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      <Appbar.Content titleStyle={styles.content} title={title} />
      <Appbar.Action color="white" icon="calendar" onPress={() => {}} />
      <Appbar.Action color="white" icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default AppBar;
