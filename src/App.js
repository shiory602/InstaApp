import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import PostsContextProvider from "./context/PostsContext";
import Comments from "./components/Comments";
import Posts from "./components/Posts";
import NewPost from "./components/NewPost";
import Comments from "./components/Comments";
import { Row, Col } from "antd";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Row justify="center">
          <Col xs={{ span: 20 }} lg={{ span: 14 }}>
            <Switch>
              <PostsContextProvider>
                <Route path="/" exact component={Posts}/>
              </PostsContextProvider>
              <Route path="/newPost" exact component={NewPost} />
              <Route path="/comments" exact component={Comments}/>
            </Switch>
          </Col>
        </Row>
      </UserContextProvider>
    </Router>
  );
}

export default App;
