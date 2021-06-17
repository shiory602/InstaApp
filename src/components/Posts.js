import React from "react";
import "antd/dist/antd.css";
import { PageHeader, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Post from "./Post";

const PostHeader = styled(PageHeader)`
  padding: 10px 0 0 0;
`;

const Posts = () => {
  return (
    <>
      <PostHeader
        ghost={false}
        // onBack={() => window.history.back()}
        title="InstaAPP"
        extra={[<Button key="addPost" type="ghost" icon={<PlusOutlined />} size={"small"} />]}
      />
      <Post />
      <Post />
      <Post />
      <Post />
    </>
  );
};

export default Posts;
