import React from 'react';
import { useFetchContext } from './context/Context';

function App() {
  const { comments } = useFetchContext();
  return (
    <>
        hello
        {console.log(comments)}
    </>
  );
}

export default App;