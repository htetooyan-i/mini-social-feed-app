import AppNavigator from './src/navigations/AppNavigator';
import { PostsProvider } from './src/context/PostContext';

export default function App() {
  return (
    <PostsProvider>
      <AppNavigator />
    </PostsProvider>
    
  );
}
