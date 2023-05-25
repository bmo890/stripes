import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface SearchBarProps {
  setSearchValue: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setSearchValue }) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  useEffect(() => {
    setSearchValue(debouncedValue);
  }, [debouncedValue]);

  const handleClearInput = () => {
    setInputValue('');
    setSearchValue('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        placeholder='Search'
      />
      {inputValue.length > 0 && (
        <IconButton
          style={styles.iconButton}
          icon="close"
          size={20}
          onPress={handleClearInput}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 35, // Leave room for icon button
  },
  iconButton: {
    position: 'absolute',
    right: 5,
  }
});
