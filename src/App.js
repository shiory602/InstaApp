import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import PostsContextProvider from "./context/PostsContext";
import Comments from "./components/Comments";
import Posts from "./components/Posts";
import NewPost from "./components/NewPost";
import { Row, Col } from "antd";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Row justify="center">
          <Col xs={{ span: 20 }} lg={{ span: 14 }}>
            <Switch>
              <PostsContextProvider>
                <Route exact path="(/)?" component={Posts}/>
                <Route path="/NewPost" component={NewPost} />
              </PostsContextProvider>
              <Route path="/comments" component={Comments}/>
            </Switch>
          </Col>
        </Row>
      </UserContextProvider>
    </Router>
  );
}

export default App;
