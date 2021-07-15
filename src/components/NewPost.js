import React, { useState } from 'react';
import { usePostsContext } from "../context/PostsContext";
import { useUserContext } from "../context/UserContext";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Row, Col, PageHeader, Avatar, Input, Form, Button, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import { CheckOutlined } from "@ant-design/icons";
import LoggedOut from './LoggedOut';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

const UserAvatar = styled(Avatar)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
const CaptionRow = styled(Row)`
    padding: 30px 5px;
`;
const LinkButton = styled.a`
    padding: 30px;
    font-size: 1.3rem;
`;
const SNSRow = styled(Row)`
    padding: 10px 10px;
`;

const NewPost = () => {
    const { user } = useUserContext();
    const { dispatch } = usePostsContext();
    const [caption, setCaption] = useState('');
    let history = useHistory();
    /*--------------------
    image submit
    ---------------------*/
    const [file, setFile] = useState([]);

    const onChangeImg = ({ fileList: newFile }) => {
        setFile(newFile);
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
        setCaption(e.target.value);
    };

    const onFinish = () => {
        const newPost = {
            id: uuidv4(),
            text: caption,
            image: file[0].thumbUrl,
            likes: 0,
            link: '',
            tags: [],
            publishDate: new Date(Date.now()).toISOString(),
            owner: user
        };
        console.log("Finish:", newPost);
        dispatch({type: "ADD_POST", post: newPost});
        history.push("/");
    };
    
    return (
        <>
        {user ?
        <Form onFinish={onFinish}>
            <PageHeader
                className="site-page-header"
                ghost={false}
                onBack={() => window.history.back()}
                title="New Post"
                extra={[
                    <Form.Item key={"newpost-submit"}>
                    <Button
                        type="link"
                        htmlType="submit"
                        disabled={!caption && !file ? true : false}
                    >
                        <CheckOutlined />
                    </Button>
                    </Form.Item>
                ]}
            />
            <hr />
            <Form.Item key={"newpost-image"} style={{ marginTop: '30px' }}>
                <ImgCrop rotate>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={file}
                        onChange={onChangeImg}
                        onPreview={onPreview}
                    >
                        {file.length < 1 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Form.Item>
            <hr />
            <CaptionRow align='top'>
                <Col span={2} style={{ marginRight: "5px" }}>
                <UserAvatar size='large' src={user.picture} />
                </Col>
                <Col span={21} >
                    <Form.Item style={{ width: "100%" }} name="caption" key={"newpost-caption"}>
                    <TextArea
                        value={caption}
                        placeholder="Write a caption..."
                        showCount maxLength={100}
                        onChange={onChange}
                    />
                    </Form.Item>
                </Col>
            </CaptionRow>
            {/* <hr />
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
            <hr /> */}
        </Form>
        : <LoggedOut/>
        }
        </>
    )
}

export default NewPost;

