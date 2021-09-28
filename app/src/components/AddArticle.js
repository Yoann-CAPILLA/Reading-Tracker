import { useState } from "react";
import ArticleDataService from "../services/ArticleService";

const AddArticle = () => {
  const initialArticleState = {
    id: null,
    title: "",
    description: "",
    url: "",
    read: false
  };
  const [article, setArticle] = useState(initialArticleState);
  const [validForm, setValidForm] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleForm = event => {
    event.preventDefault();
    
    if (!article.title || !article.description || !article.url) {
      setValidForm(false);
    } else {
      saveArticle();
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

	const newArticle = () => {
    setArticle(initialArticleState);
    setSubmitted(false);
  };

  const saveArticle = () => {
    const data = {
      title: article.title,
      description: article.description,
      url: article.url
    };

    ArticleDataService.create(data)
      .then(response => {
        setArticle({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          url: response.data.url,
          read: response.data.read
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <p>You submitted successfully!</p>
          <button className="btn btn-success" onClick={newArticle}>
            Add
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleForm}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={article.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={article.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input
                type="text"
                className="form-control"
                id="url"
                value={article.url}
                onChange={handleInputChange}
                name="url"
              />
            </div>

            <button type="submit" className="btn btn-success mt-2">
              Submit
            </button>
          </form>

          {!validForm && 
            <p className="alert alert-danger mt-2">Form fields cannot be empty!</p>
          }
        </>
      )}
    </div>
  );
};

export default AddArticle;