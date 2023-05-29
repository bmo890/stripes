import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Text, Card } from "react-native-paper";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { View } from "react-native";

interface AuthModalProps {
  visible: boolean;
  hideModal: () => void;
  signUpSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  hideModal,
  signUpSuccess,
}) => {
  const auth = getAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<string>("");

  const handleSignIn = async () => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      hideModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsSigningUp(false);
      hideModal();
      // signUpSuccess();
    } catch (error) {
      alert(error);
      console.error(error);
      setSignUpError("Something went wrong. Please try again.");
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      hideModal();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     await signInWithPopup(auth, provider);
  //     // Handle successful sign-in
  //   } catch (error) {
  //     console.error(error);
  //     // Handle sign-in error
  //   }
  // };

  return (
    <Modal
      visible={visible}
      dismissable={false}
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
    >
      <Card style={{ margin: 10 }}>
        <Card.Title
          title={"Signup"}
          right={() => (
            <View>
              {auth.currentUser && auth.currentUser.isAnonymous && (
                <Button onPress={hideModal}>X</Button>
              )}
            </View>
          )}
        />
        <Card.Content>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <View style={{ marginHorizontal: 25, marginVertical: 10 }}>
            {!isSigningUp ? (
              <View>
                <Button
                  style={{ margin: 5 }}
                  mode="elevated"
                  onPress={handleSignIn}
                >
                  Sign In
                </Button>
                <Button
                  style={{ margin: 5 }}
                  mode="elevated"
                  onPress={() => setIsSigningUp(true)}
                >
                  Sign Up
                </Button>
                {!auth.currentUser?.isAnonymous && (
                  <Button
                    mode="elevated"
                    style={{ margin: 5 }}
                    onPress={handleAnonymousSignIn}
                  >
                    Continue Without Sign Up
                  </Button>
                )}
              </View>
            ) : (
              <>
                <Button
                  style={{ margin: 5 }}
                  mode="elevated"
                  onPress={handleSignUp}
                >
                  Create Account
                </Button>
                <Button
                  style={{ margin: 5 }}
                  mode="elevated"
                  onPress={() => setIsSigningUp(false)}
                >
                  Back
                </Button>
                {signUpError && <Text>{signUpError}</Text>}
              </>
            )}
          </View>
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default AuthModal;
