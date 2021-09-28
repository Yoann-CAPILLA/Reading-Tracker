import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddArticle from "./components/AddArticle";
import Article from "./components/Article";
import ArticlesList from "./components/ArticlesList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark ps-4">
        <h1 className="navbar-brand">
          <Link to="/articles" className="navbar-brand">
            Reading Tracker
          </Link>
        </h1>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/articles" className="nav-link">
              Articles
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/articles/unread" className="nav-link">
              Unread
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/articles", "/articles/unread"]}>
            <ArticlesList />
          </Route>

          <Route exact path="/add">
            <AddArticle />
          </Route>

          <Route path="/articles/:id">
            <Article />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
