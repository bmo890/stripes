import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Menu, Divider, List } from "react-native-paper";
import { FilterProps } from "./index";
import FilterItem from "./FilterItem";
import { SELECT_OPTION, REMOVE_OPTION, CLEAR_SELECTED } from "./FilterBarHooks";

export default function Filter({
  filterCB,
  filterOptions,
  filterName,
  filterType,
  noFilterSelected,
}: FilterProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  //   useEffect(() => {
  //     if (selectedOption) {
  //       onFilterChange(selectedOption);
  //     }
  //   }, [selectedOption, onFilterChange]);

  const handlePress = (item: string) => {
    let reason = SELECT_OPTION;
    const openOptions = selectedOptions.map((string) => string.toLowerCase());
    const itemIndex = openOptions.indexOf(item);
    let adjustedOptions: string[] = [];
    if (itemIndex !== -1) {
      reason = REMOVE_OPTION;
      openOptions.splice(itemIndex, 1);
      adjustedOptions = [...openOptions];
    } else if (itemIndex === -1) {
      adjustedOptions = [...openOptions, item];
    }
    setSelectedOptions(adjustedOptions);
    filterCB(item, filterType, reason);
    return;
  };
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchorPosition="bottom"
        anchor={
          <FilterItem
            openCB={() => setVisible(true)}
            filterName={filterName}
            notSelected={noFilterSelected}
          />
        }
      >
        {filterOptions.map((item, index) => (
          <Menu.Item
            key={index}
            onPress={() => {
              handlePress(item);
            }}
            title={
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-end' }}>
                {selectedOptions.includes(item.toLowerCase()) && (
                  <List.Icon icon={"check"} />
                )}
                <Button>{item}</Button>
              </View>
            }
          />
        ))}
      </Menu>
    </View>
    //when an option is selected, call setSelectedOption(option)
  );
}
