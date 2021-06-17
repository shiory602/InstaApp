import "./App.css";
import Posts from "./components/Posts";
import { Col } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50%;
  margin: auto;
`;

function App() {
  return (
    <Col xs={{ span: 20, offset: 2 }} lg={{ span: 18, offset: 4 }}>
      <Posts />
    </Col>
  );
}

export default App;
