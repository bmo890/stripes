import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
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
      {!noFilterSelected && (
        <View>
          <Button onPress={removeFilters}>Clear All</Button>
        </View>
      )}
    </View>
  );
};

const FilterBar = ({
  filterOptions,
  filterCB,
  noFilterSelected,
}: FilterBarProps) => {
  const clear = "clearSelected";
  const removeFilters = () => {
    filterCB("", "all", clear);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
        <MaterialIcons name="filter-list" size={20} />
        <Text style={{ fontSize: 10 }}>Filters</Text>
      </View>
      {filterOptions.map((filter: FilterOption, i: number) => {
        const name = filter.filterName;
        const items = filter.availableItems;
        const type = filter.filterType;
        return (
          <Filter
            key={i}
            filterCB={filterCB}
            filterName={name}
            filterOptions={items}
            filterType={type}
            noFilterSelected={noFilterSelected}
          />
        );
      })}
      <ClearAllFiltersIcon
        removeFilters={removeFilters}
        noFilterSelected={noFilterSelected}
      />
    </View>
  );
};

export default FilterBar;
