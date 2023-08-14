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
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
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
  // const auth = getAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignIn = async () => {
    authError && setAuthError(null);
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
    let user;
    authError && setAuthError(null);
    setLoading(true);
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password,
      );
      if (userCredential.user) {
        user = userCredential.user;

        const userDocRef = doc(db, "users", email); 
        await setDoc(userDocRef, {
          uid: user.uid,
          email: email.toLowerCase(),
          role: "user",
          teamID: 1,
          joined: Date.now(),
          logs: [],
          bookmarks: []
        });
      }
      setSuccess("Account created!");
      setTimeout(() => {
        setIsSigningUp(false);
        setSuccess(null)
        hideModal();
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false)
      setAuthError(error.message);
      if (user) {
        await deleteUser(user);
      }
    }
  };

  const handleAnonymousSignIn = async () => {
    authError && setAuthError(null);
    try {
      await signInAnonymously(auth);
      hideModal();
    } catch (error) {
      console.error(error);
      // setAuthError("Something went wrong. Please try again.");
      setAuthError(error.message);
    }
  };

  const cancelSignUp = () => {
    setEmail("");
    setPassword("");
    setIsSigningUp(false);
    setAuthError(null);
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
          title={isSigningUp ? "Create an account" : "Sign in"}
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
            {success && <Text style={{ color: "green" }}>{success}</Text>}
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
                    setEmail("");
                    setPassword("");
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
                  onPress={() => cancelSignUp()}
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
