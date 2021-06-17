import React, { useState } from 'react';
import styled from "styled-components";
import "antd/dist/antd.css";
import { Row, Col, PageHeader, Avatar, Input, Form, Button, Switch, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import { CheckOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const NewPost = () => {
    const [newComment, setNewComment] = useState('');

    /*--------------------
    image submit
    ---------------------*/
    const [fileList, setFileList] = useState([]);
    const onChangeImg = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    
    const onPreview = async file => {
    let src = file.url;
    if (!src) {
        src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
        });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
    };

    /*--------------------
    comment submit
    ---------------------*/
    const onChange = e => {
        console.log('Change:', e.target.value);
        setNewComment(e.target.value);
    };

    const onFinish = () => {
        console.log("Finish:", newComment);
        setNewComment('');
    };
    console.log('render'+newComment);
    
    return (
        <>
        <Form onFinish={onFinish}>
            <PageHeader
                className="site-page-header"
                ghost={false}
                onBack={() => window.history.back()}
                title="New Post"
                extra={[
                    <Form.Item>
                    <Button
                        type="link"
                        htmlType="submit"
                        disabled={!newComment ? true : false}
                    >
                        <CheckOutlined />
                    </Button>
                    </Form.Item>
                ]}
            />
            <hr />
            <Form.Item>
                <ImgCrop rotate>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChangeImg}
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Form.Item>
            <hr />
            <CommentRow align='middle'>
                <Col span={2}>
                <Avatar  size='large' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </Col>
                <Col span={22} >
                    <Form.Item style={{ width: "100%" }} name="comment">
                    <TextArea
                        value={newComment}
                        placeholder="Write a caption..."
                        showCount maxLength={100}
                        onChange={onChange}
                    />
                    </Form.Item>
                </Col>
            </CommentRow>
            <hr />
            <LinkButton disabled={true}>Tag people</LinkButton>
            <hr />
            <LinkButton disabled={true}>Add Location</LinkButton>
            <hr />
            <SNSRow>
                <Col span={8}>Facebook</Col>
                <Col span={14}></Col>
                <Col span={2}><Switch/></Col>
            </SNSRow>
            <SNSRow>
                <Col span={8}>Twitter</Col>
                <Col span={14}></Col>
                <Col span={2}><Switch/></Col>
            </SNSRow>
            <SNSRow>
                <Col span={8}>Tumblr</Col>
                <Col span={14}></Col>
                <Col span={2}><Switch/></Col>
            </SNSRow>
            <hr />
        </Form>
        </>
    )
}

export default NewPost;

const CommentRow = styled(Row)`
    padding: 30px 5px;
`
const LinkButton = styled.a`
    padding: 30px;
    font-size: 1.3rem;
`
const SNSRow = styled(Row)`
    padding: 10px 10px;
`