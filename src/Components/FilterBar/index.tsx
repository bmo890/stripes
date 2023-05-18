export interface FilterOption {
    filterName: string;
    filterType: string;
    availableItems: string[];
    selectedItems: string[];
  }
  
  export interface FilterProps {
    key?: number;
    filterCB: (filter: string, type: string, reason: string) => void;
    filterOptions: string[];
    filterName: string;
    filterType: string;
    noFilterSelected: boolean;
    isFromErrorList?: boolean;
  }
  
  export interface FilterBarProps {
    filterCB: (filter: string, type: string, reason: string) => void;
    filterOptions: FilterOption[];
    noFilterSelected: boolean;
    isFromErrorList?: boolean;
  }
  
  export interface FilterBuilder {
    field: string;
    filterName: string;
}