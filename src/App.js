import FetchContextProvider from './context/Context';
import Comments from './Comments';
import './App.css';

function App() {
  return (
    <FetchContextProvider>
      <Comments />
    </FetchContextProvider>
  );
}

export default App;
