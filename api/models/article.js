module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      url: String,
      read: Boolean
    },
    { timestamps: true }
  );

  //Create a custom object to replace _id by id
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Article = mongoose.model("article", schema);
  return Article;
};

/*
STANDARD VERSION :

module.exports = mongoose => {
  const Article = mongoose.model(
    "article",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Article;
};

RESULT :

{
  "_id": "5e363b135036a835ac1a7da8",
  "title": "Js Article#",
  "description": "Description for Article#",
  "published": true,
  "createdAt": "2021-09-27T09:47:48.731Z",
  "updatedAt": "2021-09-27T09:47:48.731Z",
  "__v": 0
}

*/