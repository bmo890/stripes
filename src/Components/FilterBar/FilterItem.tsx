import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button, Menu, Divider, Chip, useTheme } from "react-native-paper";
import { FilterProps } from "./index";

interface FilterItemProps {
  openCB: () => void;
  filterName: string;
  notSelected: boolean;
}
const FilterItem = ({
  openCB,
  filterName,
  notSelected,
}: FilterItemProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    chip: {
      marginHorizontal: 15,
      backgroundColor: notSelected
        ? theme.colors.primaryContainer
        : theme.colors.onPrimaryContainer,
    },
    text: {
      color: notSelected
        ? theme.colors.onPrimaryContainer
        : theme.colors.primaryContainer,
    },
  });

  return (
    <Chip onPress={openCB} style={styles.chip}>
      <Text style={styles.text}>{filterName}</Text>
    </Chip>
  );
};

export default FilterItem;
