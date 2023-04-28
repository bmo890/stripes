import { StyleSheet} from "react-native";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import MainLayout from './src/Pages/MainLayout'

export const F_TLV_BLUE = "#9BD5E7";
export const F_TLV_PINK = "#F0A4C7";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};


export default function App() {
  return (
    <PaperProvider theme={theme}>
      <MainLayout />
    </PaperProvider>
  );
}

