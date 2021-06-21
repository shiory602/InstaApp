import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import AddNewComment from './AddNewComment';
import { PageHeader, List } from 'antd';

function Comments() {
  const { postId } = useParams();
  const [comments, setComments] = useState();

  useEffect(()=>{
    console.log("COMMENTS FETCH");
    // axios.get(`https://dummyapi.io/data/api/post/${postId}/comment`, { headers: { 'app-id': process.env.REACT_APP_API_ID2 } })
    // .then(({ data }) => setComments(data.data))
    // .catch(console.error);
  },[]);

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Comments"
      />
       {comments && <List
          itemLayout="vertical"
          dataSource={comments}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta/>
              {<>
                <p><b>{item.owner.firstName} {item.owner.lastName}</b> {item.message}</p> 
                <p>{new Intl.DateTimeFormat("en-US", {
                      hour: 'numeric',
                      minute: 'numeric',
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }).format(new Date(item.publishDate))}</p>
              </>}
            </List.Item>
          )}
        />}
      <AddNewComment comments={comments} setComments={setComments}/>
    </>
  );
}

export default Comments;