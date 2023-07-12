import React, { useState, useEffect } from "react";
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
import { Log } from "../../Types/Logs/LogsType";
import {Announcement} from "../../Types/Announcements/AnnouncementsType"
import formatDate from "../../Utils/ISOFormatter";
import ISOFormatter from "../../Utils/ISOFormatter";
import TagHandler from "../../Components/Tags/TagHandler";
import SingleDatePicker from "../../Components/DateTimePickers/SingleDatePicker";
interface Props {
  visible: boolean;
  // currentLog: Log | Announcement | undefined;
  currentLog: Log | undefined;
  onClose: () => void;
  onSubmit: (log: Log) => void;
}

const NewLogModal: React.FC<Props> = ({
  visible,
  currentLog,
  onClose,
  onSubmit,
}) => {
  const theme = useTheme();
  const time = new Date().toString();
  const currentEntryTime = ISOFormatter(time);
  const defaultLog: Log = {
    id: Date.now(),
    owner: '',
    title: currentEntryTime,
    tags: ["log"],
    entry: "",
    date: time,
  };
  const [log, setLog] = useState<Log>(currentLog || defaultLog);
  const [editingEntry, setEditingEntry] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const dateOnOpen = new Date();

  useEffect(() => {
    setLog(currentLog || defaultLog);
  }, [visible]);

  const handleChange = (field: keyof Log, value: string) => {
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
    // if (isChanged) {
    //   Alert.alert(
    //     "Discard changes?",
    //     "Your changes will be lost.",
    //     [
    //       {
    //         text: "Cancel",
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: onClose },
    //     ],
    //     { cancelable: false }
    //   );
    // } else {
    //   setLog(() => defaultLog);
    //   onClose();
    // }

    setLog(() => defaultLog);
    onClose();
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "90%", alignSelf: "center", paddingTop: 4 }}>
              <Card.Title
                titleStyle={{ minHeight: 0, fontWeight: "bold" }}
                style={{ minHeight: 0, paddingLeft: 10, paddingTop: 5 }}
                title={currentLog ? " " : "New Journal Entry"}
                subtitle={ISOFormatter(
                  currentLog ? currentLog.date : dateOnOpen.toString()
                )}
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
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 4,
                    height: 40,
                  }}
                >
                  <Text variant="titleMedium">Entry</Text>
                  {log.entry.length > 0 && editingEntry && (
                    <IconButton
                      rippleColor={theme.colors.backdrop}
                      icon="eraser"
                      onPress={() => handleChange("entry", "")}
                    />
                  )}
                </View>
                <TextInput
                  value={log.entry}
                  onFocus={() => setEditingEntry(true)}
                  onBlur={() =>
                    setTimeout(() => {
                      setEditingEntry(false);
                    }, 50)
                  }
                  onChangeText={(value) => handleChange("entry", value)}
                  numberOfLines={8}
                  multiline
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
