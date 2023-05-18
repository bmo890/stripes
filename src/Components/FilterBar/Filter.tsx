import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";
import { FilterProps } from "./index";

export default function Filter({
  filterCB,
  filterOptions,
  filterName,
  filterType,
  noFilterSelected,
}: FilterProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
//   useEffect(() => {
//     if (selectedOption) {
//       onFilterChange(selectedOption);
//     }
//   }, [selectedOption, onFilterChange]);
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{filterName}</Button>}
      >
        {filterOptions.map((item, index) => (
          <Menu.Item key={index} onPress={() => {console.log(item)}} title={item} />
        ))}
      </Menu>
    </View>
    //when an option is selected, call setSelectedOption(option)
  );
}
