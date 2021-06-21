import React from "react";
import "antd/dist/antd.css";
import { PageHeader, Typography } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import styled from "styled-components";

const Header = styled(PageHeader)`
  padding: 10px 0 0 0;
`;

const LoggedOut = () => {

  return (
    <><Header
    className="site-page-header"
    ghost={false}
    title="InstaApp"
/>
<Paragraph>You are logged out.</Paragraph>
</>
  );
};

export default LoggedOut;

