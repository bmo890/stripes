import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, ScrollView, Vibration, Pressable, Platform } from "react-native";
import {
  IconButton,
  Button,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
// import AddLogModal from "./NewLogModal";
import AnnouncementEntry from "./AnnouncementEntry";
import { Announcement } from "../../Types/Announcements/AnnouncementsType";
import { fakeAnnouncements } from "./index";
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
import { Log } from "../../Types/Logs/LogsType";

const JOURNAL_FILTERS: FilterBuilder[] = [
  {
    field: "tags",
    filterName: "Tags",
  },
  // {
  //   field: "date",
  //   filterName: "Date",
  // },
];

const AnnouncementsPage: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [logs, setLogs] = useState<Announcement[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);
  const [descending, setDescending] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const newLogs = [...fakeAnnouncements];
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
    const checkSearch = (log: Announcement) => {
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <SearchBar setSearchValue={setSearchValue} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingHorizontal: 15,
        }}
      >
        <FilterBar
          filterCB={handleFilterChange}
          filterOptions={filterOptions}
          noFilterSelected={noFilterSelected}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            paddingBottom: 10,
          }}
        >
          <IconButton
            onPress={() => setDescending((prev) => !prev)}
            size={20}
            icon={
              descending
                ? "sort-calendar-ascending"
                : "sort-calendar-descending"
            }
          />
          <Text style={{ fontSize: 10, position: "absolute", bottom: 10 }}>
            {descending ? "Descending" : "Ascending"}
          </Text>
        </View>
      </View>
      <ScrollView ref={scrollViewRef}>
        <View
          style={{ flexDirection: descending ? "column" : "column-reverse" }}
        >
          {filteredData.map((log) => {
            const isSelected = selectedLogs.includes(log.id);
            return (
              <View
                key={log.id}
                style={{
                  marginTop: 10,
                  marginHorizontal: 10,
                  ...selectedBorderStyle(isSelected),
                }}
              >
                <AnnouncementEntry
                  log={log}
                  fromJournalPage={true}
                  isSelected={isSelected}
                  editCB={() => {
                    return;
                  }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AnnouncementsPage;
