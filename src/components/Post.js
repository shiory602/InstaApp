import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Image, Row, Col, Typography, Avatar, Form, Input, Button } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { HeartFilled, HeartOutlined, MessageOutlined } from "@ant-design/icons";

import styled from "styled-components";

import { useUserContext } from "../context/UserContext";

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
  const { user } = useUserContext();

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState();
  const onFinish = () => {
    console.log("Finish:", newComment);
    setNewComment("");
  };
  console.log("render" + newComment);
  console.log("POST " + user);

    useEffect(()=>{
        const uri = `https://dummyapi.io/data/api/post/${post.id}/comment?limit=10`;
        let h = new Headers();
        h.append('app-id', '60cbc53bea9ef7bbdc44dd76');
        let req = new Request(uri, {
            method: 'GET',
            headers: h,
            mode: 'cors'
        })
        fetch(req).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then( d => {
            setComments(d.data);
        }).catch( error => {
            console.error(error);
        })
    },[]);

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
            <HeartOutlined />
            {/* {post.likes.includes(user.username) ? (
              <HeartFilled />
            ) : (
              <HeartOutlined />
            )} */}
          </Icon>
          <Icon>
            <MessageOutlined href="/comments" />
          </Icon>
        </Row>

        <Paragraph style={{ margin: 0 }}> {post.likes} likes </Paragraph>
        <Row>
          <Text strong style={{paddingRight: "5px"}}>{post.owner.firstName} {post.owner.lastName}</Text>
          <Paragraph
            style={{ margin: 0 }}
            ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
          >
            {post.text}
          </Paragraph>
        </Row>
        <Paragraph style={{ margin: 0 }}>{post.publishDate}</Paragraph>
        {(comments && comments.length) > 0 ? (
          <Link to={`/${post.id}/comments`}>View all comments</Link>
        ) : (
          ""
        )}

        <Row align="middle">
          <Col span={2} style={{ marginRight: "5px" }}>
            <PostAvatar size="large" src={user.profileImage} />
          </Col>
          <Col span={21}>
            <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
              <Form.Item style={{ width: "100%" }} name="comment">
                <Input
                  value={newComment}
                  placeholder="Add comment..."
                  onChange={(e) => setNewComment(e.target.value)}
                  suffix={
                    <Button
                      type="link"
                      htmlType="submit"
                      disabled={!newComment ? true : false}
                    >
                      Post
                    </Button>
                  }
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </PostDetailsWrapper>
    </PostWrapper>
  );
};

export default Post;
