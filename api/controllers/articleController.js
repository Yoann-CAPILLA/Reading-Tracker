const db = require("../models");
const Article = db.articles;

// Create and Save a new Article
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title || !req.body.description || !req.body.url) {
		res.status(400).send({ message: "Content cannot be empty!" });
		return;
	}

	// Create an Article
	const article = new Article({
		title: req.body.title,
		description: req.body.description,
    url: req.body.url,
		read: req.body.read ? req.body.read : false
	});

	// Save Article in the database
	article
		.save(article)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the article."
			});
		});
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Article.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Article.findById(id)
    .then(data => {
      if (!data) {
				res.status(404).send({ message: "Article not found with id " + id });
			} else {
				res.send(data);
			}
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving article with id=" + id });
    });
};

// Update an Article by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Article.findByIdAndUpdate(id, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update article with id=${id}. Maybe article was not found!`
        });
      } else {
				res.send({ message: "Article was updated successfully." });
			}
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating article with id=" + id
      });
    });
};

// Delete an Article with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete article with id=${id}. Maybe article was not found!`
        });
      } else {
        res.send({
          message: "Article was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete article with id=" + id
      });
    });
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
  Article.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Articles were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles."
      });
    });
};

// Find all unread Articles
exports.findAllUnread = (req, res) => {
  Article.find({ read: false })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};