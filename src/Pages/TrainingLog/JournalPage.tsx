// JournalPage.tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AddLogModal from './NewLogModal';
import TrainingLogCard from './JournalEntry';
import {Log} from './index'

const JournalPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logs, setLogs] = useState<Log[]>([{
    title: 'Saturday Evening - 13.05.23',
    date: '13.05.23',
    entry: 'This is a brief preview of the latest journal entry...',
    tags: ['armbar']
  },{
    title: 'Saturday Evening - 13.05.23',
    date: '13.05.23',
    entry: 'This is a brief preview of the latest journal entry...',
    tags: ['kimura', 'kneeslide']
  },{
    title: 'Saturday Evening - 13.05.23',
    date: '13.05.23',
    entry: 'This is a brief preview of the latest journal entry...',
    tags: []
  }]);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleLogSubmit = (log: Log) => {
    setLogs(prevState => [log, ...prevState]);
  };

  return (
    <View>
      <Text>Journal</Text>
      <Button title="Add Log" onPress={handleModalOpen} />
      <AddLogModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSubmit={handleLogSubmit}
      />
      <View>
        {logs.map((log, index) => (
        <View key={index}>
          <TrainingLogCard log={log} />
            </View>
        ))}
      </View>
    </View>
  );
};

export default JournalPage;
