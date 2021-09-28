import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import ArticleDataService from "../services/ArticleService";

const Article = () => {
  const initialArticleState = {
    id: null,
    title: "",
    description: "",
    url: "",
    read: false
  };
  const [currentArticle, setCurrentArticle] = useState(initialArticleState);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getArticle(id);
  }, [id]);

  const getArticle = id => {
    ArticleDataService.get(id)
      .then(response => {
        setCurrentArticle(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentArticle({ ...currentArticle, [name]: value });
  };

  const updateRead = status => {
    const data = {
      id: currentArticle.id,
      title: currentArticle.title,
      description: currentArticle.description,
      url: currentArticle.url,
      read: status
    };

    ArticleDataService.update(currentArticle.id, data)
      .then(response => {
        setCurrentArticle({ ...currentArticle, read: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateArticle = () => {
    ArticleDataService.update(currentArticle.id, currentArticle)
      .then(response => {
        console.log(response.data);
        setMessage("The article was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteArticle = () => {
    ArticleDataService.remove(currentArticle.id)
      .then(response => {
        console.log(response.data);
        history.push("/articles");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentArticle ? (
        <div className="edit-form">
          <h2>Article</h2>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentArticle.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentArticle.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input
                type="text"
                className="form-control"
                id="url"
                name="url"
                value={currentArticle.url}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentArticle.read ? "Read" : "Unread"}
            </div>
          </form>

          {currentArticle.read ? (
            <button
              className="badge bg-primary mr-2"
              onClick={() => updateRead(false)}
            >
              Unread
            </button>
          ) : (
            <button
              className="badge bg-primary mr-2"
              onClick={() => updateRead(true)}
            >
              Read
            </button>
          )}

          <button className="badge bg-danger mr-2" onClick={deleteArticle}>
            Delete
          </button>

          <button
            type="submit"
            className="badge bg-success"
            onClick={updateArticle}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an Article...</p>
        </div>
      )}
    </div>
  );
};

export default Article;