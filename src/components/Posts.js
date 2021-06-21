import React from "react";
import "antd/dist/antd.css";
import { PageHeader, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Post from "./Post";
import { usePostsContext } from "../context/PostsContext";
import LoggedOut from "./LoggedOut";
import { useUserContext } from "../context/UserContext";

const Header = styled(PageHeader)`
  padding: 10px 0 0 0;
`;

const Posts = () => {
  const { state } = usePostsContext();
  const { user } = useUserContext();
  return user ? (
    <>
      <Header
        ghost={false}
        title="InstaAPP"
        extra={[
          <Button
            href="/NewPost"
            key="addPost"
            type="ghost"
            icon={<PlusOutlined />}
            size={"small"}
          />
        ]}
      />
      {state.loading && "Loading"}
      {state.posts && state.posts.map((post) => <Post key={post.id} post={post} />)}
    </>
  ) : (
    <LoggedOut />
  );
};

export default Posts;
