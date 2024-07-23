import React from 'react';
import { useColorScheme } from 'react-native';
import RootNavigation from './src/navigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <RootNavigation />
  );
}

export default App;
