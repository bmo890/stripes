// JournalPage.tsx
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { IconButton, Button, Text, TouchableRipple } from "react-native-paper";
import AddLogModal from "./NewLogModal";
import TrainingLogCard from "./JournalEntry";
import { Log, fakeLogs } from "./index";

const JournalPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    setLogs([...fakeLogs]);
  }, []);
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleLogSubmit = (log: Log) => {
    setLogs((prevState) => [log, ...prevState]);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
        <Button
          icon="plus"
          mode="contained"
          onPress={handleModalOpen}
        >
          New
        </Button>
      </View>
      <AddLogModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSubmit={handleLogSubmit}
      />
      <View>
        {logs.map((log, index) => (
          <View key={index} style={{ marginTop: 10, marginHorizontal: 10 }}>
            <TrainingLogCard log={log} fromJournalPage={true} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default JournalPage;
