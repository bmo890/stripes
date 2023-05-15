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
import { Log } from "./index";
import formatDate from "../../Utils/ISOFormatter";
import HomeCardTitle from "../Home/Components/HomeCardTitle";
import ISOFormatter from "../../Utils/ISOFormatter";

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
    title: currentEntryTime,
    tags: ["haha", "heehee", "lol"],
    entry: "",
    date: "",
  };
  const [log, setLog] = useState<Log>(defaultLog);
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (field: keyof Log, value: string) => {
    // setIsChanged(true);
    setLog((prevState) => ({ ...prevState, [field]: value }));
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
    <Modal
      animationType={"slide"}
      visible={visible}
      transparent
      onRequestClose={handleModalClose}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card style={{ width: "90%", height: "60%" }}>
            <Card.Title
              titleStyle={{ minHeight: 0, fontWeight: "bold" }}
              style={{ minHeight: 0, paddingLeft: 10, paddingTop: 5 }}
              title={"New Journal Entry"}
              // subtitle={log.title.length > 0 ? formattedDate : ""}
            />
            <Card.Content>
              <TextInput
                label="Title"
                mode={"outlined"}
                autoCapitalize={"words"}
                style={{ fontWeight: "bold" }}
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
                  onPress={()=>{return}}
                >
                  <Text>+</Text>
                  
                </Chip>
                <ScrollView horizontal style={{ flexDirection: "row" }}>
                  {log.tags.map((tag, index) => (
                    <Chip key={index} style={{ marginLeft: 2 }}>
                      {tag}
                    </Chip>
                  ))}
                </ScrollView>
              </View>
              {/* <Text>{entryPreview}</Text> */}
            </Card.Content>
          </Card>
          {/* <Text>Title</Text>
          <TextInput
            value={log.title}
            onChangeText={(value) => handleChange("title", value)}
          />

          <Text>Tags</Text>
          {log.tags.map((tag, index) => (
            <Chip key={index}>{tag}</Chip>
          ))}

          <Text>Entry</Text>
          <TextInput
            value={log.entry}
            onChangeText={(value) => handleChange("entry", value)}
            multiline
          /> */}

          <Button onPress={handleModalClose}>Close</Button>
          <Button onPress={handleLogSubmit}>Submit</Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NewLogModal;
