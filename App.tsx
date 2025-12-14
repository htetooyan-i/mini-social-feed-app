import AppNavigator from './src/navigations/AppNavigator';
import { PostsProvider } from './src/context/PostsProvider';

export default function App() {
  return (
    <PostsProvider>
      <AppNavigator />
    </PostsProvider>
    
  );
}
