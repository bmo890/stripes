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
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignIn = async () => {
    authError && setAuthError(null)
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      hideModal();
    } catch (error) {
      console.log(error.message);
      // setAuthError("Something went wrong during Sign Up. Please try again.");
      setAuthError(error.message);
    }
  };

  const handleSignUp = async () => {
    authError && setAuthError(null)
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
      console.error(error);
      // setAuthError("Something went wrong when signing in. Please try again.");
      setAuthError(error.message);
    }
  };

  const handleAnonymousSignIn = async () => {
    authError && setAuthError(null)
    try {
      await signInAnonymously(auth);
      hideModal();
    } catch (error) {
      console.error(error);
      // setAuthError("Something went wrong. Please try again.");
      setAuthError(error.message);
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
                <Button
                  onPress={() => {
                    authError && setAuthError(null);
                    hideModal();
                  }}
                >
                  X
                </Button>
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
            {authError && <Text style={{ color: "red" }}>{authError}</Text>}
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
                  onPress={() => {
                    authError && setAuthError(null);
                    setIsSigningUp(true);
                  }}
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
              </>
            )}
          </View>
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default AuthModal;
