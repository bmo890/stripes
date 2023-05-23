// AddLogModal.tsx
import React, { useState, ReactNode } from "react";
import {
  View,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Pressable,
  Vibration,
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
  Badge,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Log } from "../index";
import HomeCardTitle from "../../Home/Components/HomeCardTitle";
import ISOFormatter from "../../../Utils/ISOFormatter";

interface TagHandlerProps {
  tags: string[];
  addTagCB: (newTag: string) => void;
  removeTagCB: (tag: string) => void;
}

const TagHandler = ({ tags, addTagCB, removeTagCB }: TagHandlerProps) => {
  const [editing, setEditing] = useState(false);
  const [currentTag, setCurrentTag] = useState<string>("");
  const theme = useTheme();

  const handleAddNew = (newTag: string) => {
    setCurrentTag("");
    addTagCB(newTag);
    setEditing(false);
  };

  const handleBlur = () => {
    currentTag.length === 0 && setEditing(false);
  };
  return (
    <View>
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        <List.Icon icon="tag-multiple-outline" />
        <Chip
          style={{
            backgroundColor: "transparent",
            borderColor: theme.colors.backdrop,
            borderStyle: "dashed",
            borderWidth: 2,
            marginHorizontal: 2,
            padding: 0,
          }}
          onPress={() => !editing && setEditing(true)}
        >
          <MaterialCommunityIcons name="plus" color="#000" size={15} />
        </Chip>
        {/* TODO: fix horizontal scrolling on add tag */}
        <ScrollView
          horizontal
          style={{ flexDirection: "row", position: "relative" }}
        >
          {tags.map((tag, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 6,
                paddingRight: 5,
              }}
            >
              <TouchableRipple
                style={{ borderRadius: 5 }}
                onPress={() => {
                  Vibration.vibrate(10);
                  removeTagCB(tag);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Chip key={index}>{tag}</Chip>
                  <Badge
                    visible={true}
                    size={16}
                    style={{
                      position: "absolute",
                      right: -4,
                      bottom: 16,
                      backgroundColor: theme.colors.primary,
                      color: "white",
                    }}
                  >
                    X
                  </Badge>
                </View>
              </TouchableRipple>
            </View>
          ))}
        </ScrollView>
        {/*  */}
      </View>
      {editing && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-between',
          }}
        >
          <View style={{width: "75%"}}>
            <TextInput
              autoFocus
              onBlur={handleBlur}
              label="New Tag"
              mode={"outlined"}
              autoCapitalize={"words"}
              style={{ fontWeight: "bold"}}
              value={currentTag}
              onChangeText={(text) => setCurrentTag(text)}
              right={
                currentTag.length > 0 && (
                  <TextInput.Icon
                    icon="close-circle-outline"
                    onPress={() => {
                      setCurrentTag("");
                    }}
                  />
                )
              }
            />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 2
            }}
          >
            {currentTag.length > 0 && (
              <Button
                mode="elevated"
                onPress={() => {
                  handleAddNew(currentTag);
                }}
              >
                Add
              </Button>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default TagHandler;
