import React, { useState } from 'react';
import { Modal, Button, TextInput, Text } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, signInAnonymously } from 'firebase/auth';

interface AuthModalProps {
  visible: boolean;
  hideModal: () => void;
  signUpSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, hideModal, signUpSuccess }) => {
  const auth = getAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<string>('');

  const handleSignIn = async () => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      hideModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      setIsSigningUp(false);
      hideModal();
      // signUpSuccess();
    } catch (error) {
      console.error(error);
      setSignUpError('Something went wrong. Please try again.');
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

  return (
    <Modal visible={visible}>
      <TextInput label="Email" value={email} onChangeText={text => setEmail(text)} />
      <TextInput label="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry />
      {!isSigningUp ? (
        <>
          <Button mode='contained-tonal' onPress={handleSignIn}>Sign In</Button>
          <Button mode='contained-tonal' onPress={() => setIsSigningUp(true)}>Sign Up</Button>
          <Button onPress={handleAnonymousSignIn}>Sign In Anonymously</Button>
        </>
      ) : (
        <>
          <Button mode='contained-tonal' onPress={handleSignUp}>Create Account</Button>
          <Button mode='contained-tonal' onPress={() => setIsSigningUp(false)}>Back</Button>
          {signUpError && <Text>{signUpError}</Text>}
        </>
      )}
    </Modal>
  );
};

export default AuthModal;
