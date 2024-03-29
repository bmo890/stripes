import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, Menu, List } from "react-native-paper";
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

  const handlePress = (item: string) => {
    let reason = SELECT_OPTION;
    // const openOptions = selectedOptions.map((string) => string.toLowerCase());
    const openOptions = selectedOptions.map((string) => string);
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

  const clearFilterType = () => {
    setSelectedOptions([]);
    filterCB("", filterType, CLEAR_SELECTED);
  };

  useEffect(() => {
    if (noFilterSelected) {
      selectedOptions.length > 0 && setSelectedOptions([]);
    }
  }, [noFilterSelected]);

  return (
    <View>
      <Menu
        style={{ marginTop: 5 }}
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchorPosition="bottom"
        anchor={
          <FilterItem
            openCB={() => setVisible(true)}
            filterName={filterName}
            notSelected={noFilterSelected || selectedOptions.length === 0}
          />
        }
      >
        <ScrollView persistentScrollbar style={{ maxHeight: 300 }}>
          {filterOptions.map((item, index) => {
            const isIncluded = selectedOptions.includes(item);
            return (
              <Menu.Item
                key={index}
                onPress={() => {
                  handlePress(item);
                }}
                title={
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {isIncluded && <List.Icon icon={"check"} />}
                    <Button>{item}</Button>
                  </View>
                }
              />
            );
          })}
        </ScrollView>
        {selectedOptions.length > 0 && (
          <Menu.Item
            onPress={() => {
              clearFilterType();
            }}
            title={
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <Button mode="contained-tonal">{"Clear"}</Button>
              </View>
            }
          />
        )}
      </Menu>
    </View>
  );
}
