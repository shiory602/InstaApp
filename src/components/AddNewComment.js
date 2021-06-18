import React from 'react';
import { useUserContext } from "../context/UserContext";
import { Row, Col, Form, Input, Button, Avatar } from "antd";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

const PostAvatar = styled(Avatar)`
  margin: 5px 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const AddNewComment = ({comments, setComments}) => {
  const { user } = useUserContext();
  const [form] = Form.useForm();

  const onFinish = (values) => {
      if(!values.comment || values.comment === '') return;
      const newComment = { 
        id: uuidv4(),
        owner: user,
        message: values.comment,
        publishDate: new Date(Date.now()).toISOString()
        }
      console.log("Finish:", newComment);
        addNewComment(newComment);
      form.resetFields();
    };

    const addNewComment = (newComment) => {
      setComments([newComment, ...comments]);
    }

  return (
    <>{ user &&
      <Row align="middle">
          <Col span={2} style={{ marginRight: "5px" }}>
            <PostAvatar size="large" src={user.picture} />
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