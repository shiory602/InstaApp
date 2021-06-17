import React from 'react';
import { useFetchContext } from '../context/Context';

function Comments() {
  const { comments } = useFetchContext();
  return (
    <>
        hello
        {console.log(comments)}
    </>
  );
}

export default Comments;