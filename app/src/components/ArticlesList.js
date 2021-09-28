/* eslint-disable jsx-a11y/anchor-has-content */
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import ArticleDataService from "../services/ArticleService";
import { Link } from "react-router-dom";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [unread, setUnread] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    retrieveArticles(location.pathname);
  }, [location.pathname]);

  const retrieveArticles = (path) => {
    if (path === "/articles/unread") {
      setUnread(true);
      ArticleDataService.findByStatus()
      .then(response => {
        setArticles(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      setUnread(false);
      ArticleDataService.getAll()
      .then(response => {
        setArticles(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  const setActiveArticle = (article, index) => {
    setCurrentArticle(article);
    setCurrentIndex(index);
  };

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const findByTitle = () => {
    ArticleDataService.findByTitle(searchTitle)
      .then(response => {
        setArticles(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveArticles();
    setCurrentArticle(null);
    setCurrentIndex(-1);
  };

  const removeAllArticles = () => {
    ArticleDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        {unread ? <h2>Unread Articles</h2> : <h2>Articles List</h2> }

        <ul className="list-group">
          {articles &&
            articles.map((article, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveArticle(article, index)}
                key={index}
              >
                {article.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllArticles}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentArticle ? (
          <div>
            <h3>Article</h3>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentArticle.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentArticle.description}
            </div>
            <div>
              <label>
                <strong>URL:</strong>
              </label>{" "}
              <a href={currentArticle.url} target="_blank" rel="noreferrer noopener nofollow">{currentArticle.url}</a>
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentArticle.read ? "Read" : "Unread"}
            </div>

            <Link
              to={"/articles/" + currentArticle.id}
              className="badge bg-warning text-dark text-decoration-none"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Article...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;