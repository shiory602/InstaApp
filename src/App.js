import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FetchContextProvider from "./context/Context";
import Comments from "./components/Comments";
import Posts from "./components/Posts";
import { Row, Col } from "antd";

function App() {
  return (
    <Router>
      <FetchContextProvider>
        <Row justify="center">
          <Col xs={{ span: 20 }} lg={{ span: 14 }}>
            <Switch>
              <Route path="/" exact component={Posts}/>
            
              <Route path="/comments" exact component={Comments}/>
            </Switch>
          </Col>
        </Row>
      </FetchContextProvider>
    </Router>
  );
}

export default App;
