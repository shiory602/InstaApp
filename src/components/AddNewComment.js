import React, { useState, useEffect } from 'react';
import { useUserContext } from "../context/UserContext";
import { Row, Col, Form, Input, Button, Avatar } from "antd";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

const UserAvatar = styled(Avatar)`
  margin: 5px 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const AddNewComment = ({comments, setComments, postId}) => {
  const { user } = useUserContext();
  const [form] = Form.useForm();
  const [localData, setLocalData] = useState([]);

  const setData = (newComment, prevComments) => {
    setLocalData(newComment, ...prevComments)
    console.log(localData)
  }

  const onFinish = (values) => {
      if(!values.comment || values.comment === '') return;
      const newComment = { 
        id: uuidv4(),
        owner: user,
        message: values.comment,
        publishDate: new Date(Date.now()).toISOString()
        }
      console.log("Finish:", newComment);
      
      setData(newComment, ...comments);
      addNewComment(newComment);
      form.resetFields();
    };

    const addNewComment = (newComment) => {
      setComments([newComment, ...comments]);
    }

    useEffect(() => {
      if (localData.length !== 0) {
        const json = JSON.stringify(localData); //文字列 ← オブジェクト
        window.localStorage.setItem(postId, json); // 保存
      }
    }, [localData])


  return (
    <>
      { user &&
        <Row align="middle">
          <Col span={2} style={{ marginRight: "5px" }}>
            <UserAvatar size="large" src={user.picture} />
          </Col>
          <Col span={21}>
            <Form name="add_new_comment" layout="inline" form={form} onFinish={onFinish}>
              <Form.Item style={{ width: "100%" }} name="comment" >
                <Input
                  autoComplete="off"
                  placeholder="Add comment..."
                  suffix={
                    <Button
                      type="link"
                      htmlType="submit"
                    >
                      Post
                    </Button>
                  }
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      }
    </>
  );
}

export default AddNewComment;