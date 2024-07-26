// import * as React from 'react';
// import {AuthContext} from './authContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Alert} from 'react-native';
// import { auth } from '../utils/firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// export default function AuthProvider({children}: any) {
//   const [state, dispatch] = React.useReducer(
//     (prevState: any, action: any) => {
//       switch (action.type) {
//         case 'RESTORE_TOKEN':
//           return {
//             ...prevState,
//             user: action.user,
//             isLoading: false,
//           };
//         case 'SIGN_IN':
//           return {
//             ...prevState,
//             isSignout: false,
//             user: action.user,
//           };
//         case 'SIGN_OUT':
//           return {
//             ...prevState,
//             isSignout: true,
//             user: null,
//           };
//       }
//     },
//     {
//       isLoading: true,
//       isSignout: false,
//       user: null,
//     },
//   );

//   React.useEffect(() => {
//     // Fetch the token from storage then navigate to our appropriate place
//     const bootstrapAsync = async () => {
//       let user;

//       try {
//         user = await AsyncStorage.getItem('user');
//       } catch (e: any) {
//         // Restoring token failed
//         Alert.alert('Error', e.message);
//       }

//       // After restoring token, we may need to validate it in production apps

//       // This will switch to the App screen or Auth screen and this loading
//       // screen will be unmounted and thrown away.
//       dispatch({type: 'RESTORE_TOKEN', user});
//     };

//     bootstrapAsync();
//   }, []);

//   const authContext = React.useMemo(
//     () => ({
//       signIn: async (data:{email:string,password:string}) => {
//         // In a production app, we need to send some data (usually username, password) to server and get a token
//         // We will also need to handle errors if sign in failed
//         // After getting token, we need to persist the token using `SecureStore`
//         // In the example, we'll use a dummy token
//         await signInWithEmailAndPassword(auth, data.email, data.password)
//         .then(userCredential => {
//           // Signed in
//           const user = userCredential.user;
//           AsyncStorage.setItem('user', JSON.stringify(user));
//           dispatch({type: 'SIGN_IN', user});
//         //   DevSettings.reload()
//           // navigation.reset({
//           //   index: 0,
//           //   routes: [{ name: screens.homeTabs }],
//           // });
//         })
//         .catch(error => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           Alert.alert('Error', errorMessage);
//         });
       
//       },
//       signOut: () => dispatch({type: 'SIGN_OUT'}),
//       signUp: async (data:{email:string,password:string}) => {
//         // In a production app, we need to send user data to server and get a token
//         // We will also need to handle errors if sign up failed
//         // After getting token, we need to persist the token using `SecureStore`
//         // In the example, we'll use a dummy token
//         await createUserWithEmailAndPassword(auth, data.email, data.password)
//         .then(userCredential => {
//           // Signed in
//           const user = userCredential.user;
//           AsyncStorage.setItem('user', JSON.stringify(user));
//           dispatch({type: 'SIGN_IN', user});
//         //   navigation.navigate(screens.homeTabs);
//         })
//         .catch(error => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           Alert.alert('Error', errorMessage);
//         });
//       },
//     }),
//     [],
//   );

//   return (
//     <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
//   );
// }
