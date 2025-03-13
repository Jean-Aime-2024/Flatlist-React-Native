import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ListScreen from './ListScreen';

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ListScreen />
    </GestureHandlerRootView>
  );
}
