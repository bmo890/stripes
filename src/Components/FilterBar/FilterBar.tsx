import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Text, IconButton } from "react-native-paper";
import Filter from "./Filter";
import { FilterOption, FilterBarProps } from "./index";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface ClearAllProps {
  removeFilters: () => void;
  noFilterSelected: boolean;
}

const ClearAllFiltersIcon = ({
  removeFilters,
  noFilterSelected,
}: ClearAllProps) => {
  return (
    <View>
      {
        <Button disabled={noFilterSelected} onPress={removeFilters}>
          Clear
        </Button>
      }
    </View>
  );
};

const FilterBar = ({
  filterOptions,
  filterCB,
  noFilterSelected,
  sortCB,
  filterBarCommands
}: FilterBarProps) => {
  // const [showFilters, setShowFilters] = useState(false);
  const [descending, setDescending] = useState(false);
  const clear = "clearSelected";
  const removeFilters = () => {
    filterCB("", "all", clear);
  };

  const handleShowFilters = () => {
    setDescending((prev) => !prev);
    sortCB();
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: !showFilters ? "flex-end" : "space-between",
        width: '100%'
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="filter-outline"
          size={25}
          // onPress={() => setShowFilters((prev) => !prev)}
          onPress={filterBarCommands.showFiltersCB}
        />
        {!filterBarCommands.hideFilters && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {filterOptions.map((filter: FilterOption, i: number) => {
              const name = filter.filterName;
              const items = filter.availableItems;
              const type = filter.filterType;
              return (
                <View key={name} style={{ marginHorizontal: 5 }}>
                  <Filter
                    filterCB={filterCB}
                    filterName={name}
                    filterOptions={items}
                    filterType={type}
                    noFilterSelected={noFilterSelected}
                  />
                </View>
              );
            })}
            <ClearAllFiltersIcon
              removeFilters={removeFilters}
              noFilterSelected={noFilterSelected}
            />
          </View>
        )}
      </View>
        <IconButton
          onPress={handleShowFilters}
          size={25}
          icon={
            descending ? "sort-calendar-descending" : "sort-calendar-ascending"
          }
        />
    </View>
  );
};

export default FilterBar;
