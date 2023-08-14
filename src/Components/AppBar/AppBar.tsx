import React, { useState } from "react";
import { getHeaderTitle } from "@react-navigation/elements";
import { StyleSheet, View, Text, Pressable, Platform } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import {
  Menu,
  IconButton,
  Button,
  Divider,
  Provider,
  Appbar,
  List,
} from "react-native-paper";
import { getAuth, signOut, User } from "firebase/auth";
import { auth } from "../../../firebase";
import AuthModal from "../../Auth/AuthModal";
import AsyncStorage from "@react-native-async-storage/async-storage";


type MenuItemProps = {
  icon: string;
  title: string;
};

export const HEADER_HEIGHT = 64;

const MenuItem: React.FC<MenuItemProps> = ({ icon, title }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <List.Icon icon={icon} />
      <Text style={{ marginLeft: 5 }}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    height: HEADER_HEIGHT,
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
  handleUserLogin,
}: NativeStackHeaderProps & { handleUserLogin: () => void }) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const title = getHeaderTitle(options, route.name);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      AsyncStorage.removeItem('@user');
      closeMenu();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = () => {
    closeMenu();
    handleUserLogin();
  };

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
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              color="white"
              icon="format-list-bulleted"
              onPress={openMenu}
            />
          }
          anchorPosition="bottom"
        >
          <Menu.Item
            onPress={() => {}}
            title={<MenuItem icon="account" title="Profile" />}
          />
          <Divider />
          <Menu.Item
            onPress={() => {}}
            title={<MenuItem icon="bookmark-outline" title="Bookmarks" />}
          />
          <Divider />
          <Menu.Item
            onPress={() => {}}
            title={<MenuItem icon="cog" title="Settings" />}
          />
          <Divider />
          {auth.currentUser && !auth.currentUser.isAnonymous ? (
            <Menu.Item
              onPress={handleSignOut}
              title={<MenuItem icon="logout" title="Logout" />}
            />
          ) : (
            <Menu.Item
              onPress={handleSignIn}
              title={<MenuItem icon="login" title="Login" />}
            />
          )}
        </Menu>
      </View>
    </Appbar.Header>
  );
};

export default AppBar;
