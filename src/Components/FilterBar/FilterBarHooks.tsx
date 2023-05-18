import { FilterOption, FilterBuilder } from "../FilterBar/index";

//checks users filter choices if object should be displayed or filtered out in current subject
export const useCompareFilteredItem = (
  openFilters: FilterOption[],
  issue: any
) => {
  let i = 0;
  for (const filter of openFilters) {
    console.log(filter.filterType)
    // console.log(issue)
    i++;
    if (filter.selectedItems.length === 0) continue;
    if (filter.selectedItems.includes(issue[filter.filterType])) {
      if (i < openFilters.length - 1) {
        continue;
      } else return true;
    }
    return false;
  }
  return true;
};

export const SELECT_OPTION = 'selectOption'
export const REMOVE_OPTION = 'removeOption'
export const CLEAR_SELECTED = 'clearSelected'

//updates state of selected filter items on a subject
export const useUpdateOpenFilters = (
  openFilters: FilterOption[],
  filterQueryItem: string,
  type: string,
  reason: string
) => {
  const updatedOpenFilters: FilterOption[] = [...openFilters];
  if (type === "all" && reason === CLEAR_SELECTED) {
    for (const filter of updatedOpenFilters) {
      filter.selectedItems = [];
    }
    return updatedOpenFilters;
  }
  const affectedFilter = updatedOpenFilters.find(
    (filter: FilterOption) => filter.filterType === type
  );
  if (!affectedFilter) return updatedOpenFilters;
  switch (reason) {
    case SELECT_OPTION:
      affectedFilter.selectedItems.push(filterQueryItem);
      break;
    case REMOVE_OPTION:
      const splicedArray = affectedFilter.selectedItems.filter(
        (item) => item !== filterQueryItem
      );
      affectedFilter.selectedItems = [...splicedArray];
      break;
    case CLEAR_SELECTED:
      affectedFilter.selectedItems = [];
      break;
  }
  return updatedOpenFilters;
};

//gathers or resets all filters for subject based on current subject columns
export const useGetFilters = (data: any, filterItems: FilterBuilder[]) => {
  const filters: FilterOption[] = [];
  for (const item of filterItems) {
    const availableItems = getFilterSelectionItems(data, item.field);
    const newOption: FilterOption = {
      filterName: item.filterName,
      filterType: item.field,
      availableItems: availableItems,
      selectedItems: [],
    };
    filters.push(newOption);
  }
  return filters;
};

//if subject should display a filter, returns array of all unique values per column
export const getFilterSelectionItems = (data: any[], field: string) => {
  const filterItems = new Set<string>();
  for (const issue of data) {
    if (Array.isArray(issue[field])) {
      issue[field].forEach((item: string) => filterItems.add(item));
    } else {
      filterItems.add(issue[field]);
    }
  }
  const filterItemsArray = Array.from(filterItems);
  return filterItemsArray;
};

