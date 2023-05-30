import { StyleSheet, SafeAreaView } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import MainLayout from "./src/Pages/MainLayout";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDdrM3cFWphFG6njVIBkZ8MlkVdZNSPq9k",
  authDomain: "stripes-bjj.firebaseapp.com",
  projectId: "stripes-bjj",
  storageBucket: "stripes-bjj.appspot.com",
  messagingSenderId: "620411124186",
  appId: "1:620411124186:web:031e22c4d9561376db68e3",
  measurementId: "G-5X336N3CFD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  console.log(app)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <MainLayout />
      </PaperProvider>
    </SafeAreaView>
  );
}
