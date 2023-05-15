// AddLogModal.tsx
import React, { useState } from "react";
import {
  View,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import {
  Button,
  Chip,
  Card,
  IconButton,
  List,
  Text,
  TextInput,
  useTheme,
  TouchableRipple,
} from "react-native-paper";
import { Log } from "../index";
import HomeCardTitle from "../../Home/Components/HomeCardTitle";
import ISOFormatter from "../../../Utils/ISOFormatter";

interface TagHandlerProps {
  tags: string[];
  addTagCB: (newTag: string) => void;
}

const TagHandler = ({ tags, addTagCB }: TagHandlerProps) => {
  const [editing, setEditing] = useState(false);
  const [currentTag, setCurrentTag] = useState<string>("");
  const theme = useTheme();

  const handleAddNew = (newTag: string) => {
    setCurrentTag("");
    addTagCB(newTag);
  };
  return (
    <View
    >
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <List.Icon icon="tag-multiple-outline" />
        <Chip
          style={{
            backgroundColor: "transparent",
            borderColor: theme.colors.backdrop,
            borderStyle: "dashed",
            borderWidth: 2,
            marginHorizontal: 2,
          }}
          onPress={() => !editing && setEditing(true)}
        >
          <Text>+</Text>
        </Chip>
        {/* TODO: fix horizontal scrolling on add tag */}
        <ScrollView horizontal style={{ flexDirection: "row" }}>
          {tags.map((tag, index) => (
            <Chip key={index} style={{ marginLeft: 2 }}>
              {tag}
            </Chip>
          ))}
        </ScrollView>
      </View>
      {editing && (
        <View>
          <TextInput
            label="New Tag"
            mode={"outlined"}
            autoCapitalize={"words"}
            style={{ fontWeight: "bold" }}
            value={currentTag}
            onChangeText={(text) => setCurrentTag(text)}
            right={
              currentTag.length > 0 && (
                <TextInput.Icon
                  icon="close-circle-outline"
                  onPress={() => setCurrentTag("")}
                />
              )
            }
          />
          {currentTag.length > 0 && (
            <Button onPress={() => handleAddNew(currentTag)}>Add</Button>
          )}
        </View>
      )}
    </View>
  );
};

export default TagHandler;
