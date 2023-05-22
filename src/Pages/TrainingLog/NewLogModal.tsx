import React, { useState } from "react";
import {
  View,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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
import { Log } from "./index";
import formatDate from "../../Utils/ISOFormatter";
import HomeCardTitle from "../Home/Components/HomeCardTitle";
import ISOFormatter from "../../Utils/ISOFormatter";
import TagHandler from "./Components/TagHandler";
import SingleDatePicker from "../../Components/DateTimePickers/SingleDatePicker";
interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (log: Log) => void;
}

const NewLogModal: React.FC<Props> = ({ visible, onClose, onSubmit }) => {
  const theme = useTheme();
  const time = new Date().toString();
  const currentEntryTime = ISOFormatter(time);
  const defaultLog: Log = {
    id: Date.now(),
    title: currentEntryTime,
    tags: ["haha"],
    entry: "",
    date: time,
  };
  const [log, setLog] = useState<Log>(defaultLog);
  const [isChanged, setIsChanged] = useState(false);
  const dateOnOpen = new Date();
  const handleChange = (field: keyof Log, value: string) => {
    // setIsChanged(true);
    setLog((prevState) => ({ ...prevState, [field]: value }));
  };

  const addTag = (newTag: string) => {
    setLog((prevState) => ({ ...prevState, ["tags"]: [newTag, ...log.tags] }));
  };

  const removeTag = (removedTag: string) => {
    setLog((prevState) => ({
      ...prevState,
      ["tags"]: [...log.tags.filter((tag) => tag !== removedTag)],
    }));
  };

  const handleModalClose = () => {
    if (isChanged) {
      Alert.alert(
        "Discard changes?",
        "Your changes will be lost.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: onClose },
        ],
        { cancelable: false }
      );
    } else {
      setLog(() => defaultLog);
      onClose();
    }
  };

  const handleLogSubmit = () => {
    onSubmit(log);
    setLog(defaultLog);
    setIsChanged(false);
    onClose();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Modal
        animationType={"slide"}
        visible={visible}
        transparent
        onRequestClose={handleModalClose}
      >
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          {/* <Card style={{ width: "95%", maxHeight: "90%" }}> */}
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card style={{width: '90%', alignSelf: 'center'}}>
              <Card.Title
                titleStyle={{ minHeight: 0, fontWeight: "bold" }}
                style={{ minHeight: 0, paddingLeft: 10, paddingTop: 5 }}
                title={"New Journal Entry"}
                subtitle={ISOFormatter(dateOnOpen.toString())}
              />
              {/* TODO:  fix date time picker according to react-native-paper-dates package options*/}
              {/* <SingleDatePicker /> */}
              <Card.Content>
                <TextInput
                  label="Title"
                  mode={"outlined"}
                  autoCapitalize={"words"}
                  style={{ fontWeight: "bold", marginBottom: 4 }}
                  value={log.title}
                  onChangeText={(text) => handleChange("title", text)}
                  right={
                    log.title.length > 0 && (
                      <TextInput.Icon
                        icon="close-circle-outline"
                        onPress={() => handleChange("title", "")}
                      />
                    )
                  }
                />
                <View>
                  <TagHandler
                    tags={log.tags}
                    addTagCB={(tag: string) => addTag(tag)}
                    removeTagCB={(tag: string) => {
                      removeTag(tag);
                    }}
                  />
                </View>
                <Text>Entry</Text>
                <TextInput
                  value={log.entry}
                  onChangeText={(value) => handleChange("entry", value)}
                  numberOfLines={7}
                  multiline
                  right={
                    log.title.length > 0 && (
                      <TextInput.Icon
                        icon="close-circle-outline"
                        onPress={() => handleChange("entry", "")}
                      />
                    )
                  }
                />
              </Card.Content>
              <Card.Actions>
                <Button onPress={handleModalClose}>Close</Button>
                <Button onPress={handleLogSubmit}>Save</Button>
              </Card.Actions>
            </Card>
          </View>
        </SafeAreaView>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default NewLogModal;
