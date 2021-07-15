import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Image, Row, Col, Typography, Avatar } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { HeartFilled, HeartOutlined, MessageOutlined } from "@ant-design/icons";

import styled from "styled-components";

import AddNewComment from "./AddNewComment";
import { usePostsContext } from "../context/PostsContext";

const { Text } = Typography;

const Icon = styled.span`
  font-size: 25px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    opacity: 80%;
  }
`;

const PostAvatar = styled(Avatar)`
  margin: 5px 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const PostWrapper = styled.div`
  margin: 10px 0;
  border: 1px solid #d9d9d9;
`;

const PostDetailsWrapper = styled.div`
  padding: 0 10px 10px 10px;
`;

const PostUserWrapper = styled(Row)`
  padding: 0 10px;
`;

const Post = ({ post }) => {
  const [comments, setComments] = useState();
  const { state, dispatch } = usePostsContext();

  useEffect(()=>{
    axios.get(`https://dummyapi.io/data/api/post/${post.id}/comment`, { headers: { 'app-id': process.env.REACT_APP_API_ID } })
    .then(({ data }) => setComments(data.data))
    .catch(console.error);
  },[]);

  const like = () => {
      dispatch({type: 'LIKE', postId: post.id});
  }

  const unlike = () => {
      dispatch({type: 'UNLIKE', postId: post.id});
  }
  return (
    <PostWrapper>
      <PostUserWrapper align="middle">
        <Col span={2} style={{ marginRight: "5px" }}>
          <PostAvatar size="large" src={post.owner.picture} />
        </Col>
        <Col span={21}>
          <Text strong> {post.owner.firstName} {post.owner.lastName}</Text>
        </Col>
      </PostUserWrapper>
      <Image width="100%" src={post.image} />
      <PostDetailsWrapper>
        <Row align="middle">
          <Icon>
            {state.likedPosts && state.likedPosts !== null && state.likedPosts.includes(post.id) ? (
              <HeartFilled onClick={unlike}/>
              ) : (
              <HeartOutlined onClick={like}/>
            )}
          </Icon>
          <Icon>
            <MessageOutlined href="/comments" />
          </Icon>
        </Row>

        <Paragraph style={{ margin: 0 }}> {post.likes} likes </Paragraph>
        <Row>
          <Text strong style={{paddingRight: "5px"}}>{post.owner.firstName} {post.owner.lastName}</Text>
          {post.text && <Paragraph
            style={{ margin: 0 }}
            ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
          >
            {post.text}
          </Paragraph>}
        </Row>
        <Paragraph style={{ margin: 0 }}>
          {new Intl.DateTimeFormat("en-US", {
                      hour: 'numeric',
                      minute: 'numeric',
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }).format(new Date(post.publishDate))}
        </Paragraph>
        {(comments && comments.length) > 0 ? (
          <Link to={`/${post.id}/comments`}>View all comments</Link>
        ) : (
          ""
        )}
      <AddNewComment comments={comments} setComments={setComments}/>
      </PostDetailsWrapper>
    </PostWrapper>
  );
};

export default Post;
