// AddLogModal.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal } from 'react-native';
import { Chip } from 'react-native-paper';
import {Log} from './index'
interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (log: Log) => void;
}


const defaultLog: Log = {
  title: '',
  tags: [],
  entry: '',
  date: ''
};

const NewLogModal: React.FC<Props> = ({ visible, onClose, onSubmit }) => {
  const [log, setLog] = useState<Log>(defaultLog);
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (field: keyof Log, value: string) => {
    setIsChanged(true);
    setLog(prevState => ({ ...prevState, [field]: value }));
  };

  const handleModalClose = () => {
    if (isChanged) {
      Alert.alert(
        'Discard changes?',
        'Your changes will be lost.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK', onPress: onClose },
        ],
        { cancelable: false },
      );
    } else {
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
    <Modal visible={visible} onRequestClose={handleModalClose}>
      <Text>Title</Text>
      <TextInput value={log.title} onChangeText={value => handleChange('title', value)} />

      <Text>Tags</Text>
      {log.tags.map((tag, index) => (
        <Chip key={index}>{tag}</Chip>
      ))}

      <Text>Entry</Text>
      <TextInput
        value={log.entry}
        onChangeText={value => handleChange('entry', value)}
        multiline
      />

      <Button title="Close" onPress={handleModalClose} />
      <Button title="Submit" onPress={handleLogSubmit} />
    </Modal>
  );
};

export default NewLogModal;
