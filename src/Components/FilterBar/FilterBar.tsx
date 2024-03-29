import React, { useState } from "react";
import { View } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import Filter from "./Filter";
import { FilterOption, FilterBarProps } from "./index";

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
          {noFilterSelected ? "" : "Clear"}
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
  filterBarCommands,
}: FilterBarProps) => {
  const [descending, setDescending] = useState(false);
  const { hideFilters, showFiltersCB } = filterBarCommands;
  const clear = "clearSelected";

  const removeFilters = () => {
    filterCB("", "all", clear);
  };

  const handleShowFilters = () => {
    setDescending((prev) => !prev);
    sortCB();
  };

  const handleFiltersIcon = () => {
    !hideFilters && removeFilters();
    showFiltersCB();
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: hideFilters ? "flex-end" : "space-between",
        width: "100%",
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
          mode={hideFilters ? undefined : "contained-tonal"}
          size={25}
          onPress={handleFiltersIcon}
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
