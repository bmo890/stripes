import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Button, Menu, Divider, Provider } from "react-native-paper";

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
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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

      <View>
        <Menu
        style={{width: '10rem'}}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              color="white"
              icon="format-list-bulleted"
              onPress={openMenu}
            />
          }
          anchorPosition='bottom'
        >
          <Menu.Item onPress={() => {}} title="White Belt" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Blue Belt" />
        </Menu>
      </View>
    </Appbar.Header>
  );
};

export default AppBar;
