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
      <PostsContextProvider>
        <Row justify="center">
          <Col xs={{ span: 20 }} lg={{ span: 14 }}>
            <Switch>
                <Route path="/" exact component={Posts}/>
                <Route path="/NewPost" component={NewPost} />
                <Route path="/:postId/comments" exact component={Comments}/>
            </Switch>
          </Col>
        </Row>
        </PostsContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
