import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { IconButton, Button, Text, TouchableRipple } from "react-native-paper";
import AddLogModal from "./NewLogModal";
import TrainingLogCard from "./JournalEntry";
import { Log, fakeLogs } from "./index";
import { FilterOption } from "../../Components/FilterBar/index";
import FilterBar from "../../Components/FilterBar/FilterBar";
import {
  useUpdateOpenFilters,
  useGetFilters,
  getFilterSelectionItems,
  useCompareFilteredItem,
} from "../../Components/FilterBar/FilterBarHooks";
import { FilterBuilder } from "../../Components/FilterBar/index";

const JOURNAL_FILTERS: FilterBuilder[] = [
  {
    field: "tags",
    filterName: "Tags",
  },
  // {
  //   field: "videos",
  //   filterName: "Videos",
  // },
];

const JournalPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

  useEffect(() => {
    const newLogs = [...fakeLogs];
    const resetFilters = useGetFilters(newLogs, JOURNAL_FILTERS);
    setLogs(newLogs);
    setFilterOptions(resetFilters);
  }, []);

  useEffect(() => {
    const resetFilters = useGetFilters(logs, JOURNAL_FILTERS);
    setFilterOptions(resetFilters);
  }, [logs]);

  const filteredData = useMemo(() => {
    return logs.filter((log) => useCompareFilteredItem(filterOptions, log));
  }, [filterOptions, logs]);

  const handleLogSubmit = (log: Log) => {
    setLogs((prevState) => [log, ...prevState]);
  };

  const handleFilterChange = (
    filterQueryItem: string,
    type: string,
    reason: string
  ) => {
    const updatedFilters = useUpdateOpenFilters(
      filterOptions,
      filterQueryItem,
      type,
      reason
    );
    setFilterOptions(updatedFilters);
  };

  const noFilterSelected = filterOptions.every(
    (filter) => filter.selectedItems.length === 0
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <FilterBar
          filterCB={handleFilterChange}
          filterOptions={filterOptions}
          noFilterSelected={noFilterSelected}
        />

        <Button
          icon="plus"
          mode="contained"
          onPress={() => setModalVisible(true)}
        >
          New
        </Button>
      </View>
      <ScrollView>
        {filteredData.map((log, index) => (
          <View key={index} style={{ marginTop: 10, marginHorizontal: 10 }}>
            <TrainingLogCard log={log} fromJournalPage={true} />
          </View>
        ))}
      </ScrollView>
      <AddLogModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleLogSubmit}
      />
    </View>
  );
};

export default JournalPage;
