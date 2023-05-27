import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, ScrollView, Vibration, Pressable } from "react-native";
import { IconButton, Button, useTheme, Divider } from "react-native-paper";
import AddLogModal from "./NewLogModal";
import TrainingLogCard from "./JournalEntry";
import { Log } from "../../Types/Logs/LogsType";
import { fakeLogs } from "./index";
import { FilterOption } from "../../Components/FilterBar/index";
import FilterBar from "../../Components/FilterBar/FilterBar";
import {
  useUpdateOpenFilters,
  useGetFilters,
  getFilterSelectionItems,
  useCompareFilteredItem,
} from "../../Components/FilterBar/FilterBarHooks";
import { FilterBuilder } from "../../Components/FilterBar/index";
import { SearchBar } from "../../Components/SearchBar/SearchBar";

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
  const scrollViewRef = useRef<ScrollView>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [deletingLogs, setDeletingLogs] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);
  const [currentLog, setCurrentLog] = useState<Log | undefined>(undefined);
  const [descending, setDescending] = useState(true);
  const [hideFilters, setHideFilters] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const theme = useTheme();

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

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, [descending]);

  const filteredData = useMemo(() => {
    const checkSearch = (log: Log) => {
      if (searchValue.length === 0) return true;
      if (log.entry.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    };
    return logs.filter(
      (log) => useCompareFilteredItem(filterOptions, log) && checkSearch(log)
    );
  }, [filterOptions, searchValue, logs]);

  const closeLog = () => {
    currentLog && setCurrentLog(undefined);
    setModalVisible(false);
  };

  const handleLogSubmit = (newLog: Log) => {
    if (currentLog) {
      setLogs((logs) =>
        logs.map((log) => (log.id === currentLog.id ? newLog : log))
      );
      setCurrentLog(undefined);
    } else {
      setLogs((prevState) => [newLog, ...prevState]);
    }
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

  const handleSelectToRemove = (logID: number) => {
    if (deletingLogs) return;
    setDeletingLogs(true);
    setSelectedLogs([logID]);
  };

  const handleAddToRemove = (logID: number) => {
    if (!deletingLogs) return;
    const isLogSelected = selectedLogs.includes(logID);
    const newSelectedLogs = isLogSelected
      ? selectedLogs.filter((id) => id !== logID)
      : [...selectedLogs, logID];

    setSelectedLogs(newSelectedLogs);
    if (newSelectedLogs.length === 0) {
      setDeletingLogs(false);
    }
  };

  const handleDeleteLogs = () => {
    setLogs((logs) => logs.filter((log) => !selectedLogs.includes(log.id)));
    setSelectedLogs([]);
    setDeletingLogs(false);
  };

  const selectedBorderStyle = (selected: boolean) => {
    if (selected)
      return {
        borderColor: "thistle",
        borderStyle: "dashed" as "dotted" | "dashed" | "solid",
        borderWidth: 2,
        borderRadius: 15,
      };
    return {};
  };

  const handleEditJournal = (logID: number) => {
    setCurrentLog(logs.find((log) => log.id === logID));
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: hideFilters ? "row" : "column",
          alignItems: hideFilters ? "center" : "stretch",
          justifyContent: hideFilters ? "space-between" : "space-evenly",
          width: "100%",
          padding: 10,
        }}
      >
        <View>
          <SearchBar setSearchValue={setSearchValue} />
        </View>
        <View>
          <FilterBar
            filterCB={handleFilterChange}
            filterOptions={filterOptions}
            noFilterSelected={noFilterSelected}
            filterBarCommands={{
              hideFilters: hideFilters,
              showFiltersCB: () => setHideFilters((prev) => !prev),
            }}
            sortCB={() => setDescending((prev) => !prev)}
          />
        </View>
      </View>
      <Divider />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        {deletingLogs ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              mode="elevated"
              onPress={() => {
                setDeletingLogs(false);
                setSelectedLogs([]);
              }}
            >
              Unselect All
            </Button>
            <IconButton
              icon="trash-can-outline"
              mode="contained-tonal"
              iconColor={"white"}
              containerColor={theme.colors.primary}
              onPress={() => {
                Vibration.vibrate(50);
                handleDeleteLogs();
              }}
            />
          </View>
        ) : (
          <IconButton
            icon="plus"
            mode="contained-tonal"
            onPress={() => {
              Vibration.vibrate(50);
              setModalVisible(true);
            }}
          />
        )}
      </View>
      <ScrollView ref={scrollViewRef}>
        <View
          style={{ flexDirection: descending ? "column" : "column-reverse" }}
        >
          {filteredData.map((log, index) => {
            const isSelected = selectedLogs.includes(log.id);
            return (
              <View
                key={index}
                style={{
                  marginTop: 10,
                  marginHorizontal: 10,
                  ...selectedBorderStyle(isSelected),
                }}
              >
                <Pressable
                  onPress={() => handleAddToRemove(log.id)}
                  onLongPress={() => handleSelectToRemove(log.id)}
                >
                  <TrainingLogCard
                    log={log}
                    fromJournalPage={true}
                    isSelected={isSelected}
                    editCB={handleEditJournal}
                    highlightText={searchValue}
                  />
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <AddLogModal
        visible={modalVisible}
        currentLog={currentLog}
        onClose={closeLog}
        onSubmit={handleLogSubmit}
      />
    </View>
  );
};

export default JournalPage;
