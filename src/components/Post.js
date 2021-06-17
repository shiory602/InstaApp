import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Image, Row, Col, Typography, Avatar, Form, Input, Button } from "antd";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Paragraph from "antd/lib/typography/Paragraph";
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
  margin: 5px;
`;

const PostWrapper = styled.div`
    margin: 10px 0;
    border: 1px solid #d9d9d9;
`;


const PostDetailsWrapper = styled.div`
    padding: 0 10px 10px 10px;
`;

const Post = () => {
  const [newComment, setNewComment] = useState('');

  // To disable submit button at the beginning.
  // useEffect(() => {
  //   }, []);

  const onFinish = () => {
    console.log("Finish:", newComment);
    setNewComment('');
  };
  console.log('render'+newComment);
  
  return (
    <PostWrapper>
      <Row align="middle">
        <PostAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Text> username </Text>
      </Row>
      <Image
        width="100%"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />

<PostDetailsWrapper>

      <Row align="middle">
        <Icon>
          {" "}
          <HeartOutlined />{" "}
        </Icon>
        <Icon>
          {" "}
          <MessageOutlined />{" "}
        </Icon>
      </Row>

      <Paragraph style={{ margin: 0 }}> 123 likes </Paragraph>
      
      <Text strong>username</Text>
      <Paragraph
        style={{ margin: 0 }}
        ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
      >
         Ant Design, a design language for
        background applications, is refined by Ant UED Team. Ant Design, a
        design language for background applications, is refined by Ant UED Team.
        Ant Design, a design language for background applications, is refined by
        Ant UED Team. Ant Design, a design language for background applications,
        is refined by Ant UED Team. Ant Design, a design language for background
        applications, is refined by Ant UED Team. Ant Design, a design language
        for background applications, is refined by Ant UED Team.
      </Paragraph>

      <a href="#">View all comments</a>

      {/* <Input placeholder="Basic usage" /> */}
      <Row align='middle'>
        <Col span={2}>
          <PostAvatar  size={{ xs: 20, sm: 32, lg: 50}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Col>
        <Col span={22}>
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
