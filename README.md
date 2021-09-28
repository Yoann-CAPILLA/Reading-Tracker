# Reading Tracker

Basic application built with MERN Stack to keep track of articles to read.

You can add/modify/delete articles by adding a title, a description and an URL.
You can update the reading status and filter on unread articles.
You can also search articles by name.

## Stack

### Front

- React
- React-router-dom
- Bootstrap
- Axios

### Back

- NodeJs
- Express
- MongoDB
- Mongoose

## Installation

Clone the repository locally :

```bash
git clone <repo url>
```

Install the dependencies via NPM :

```bash
npm i
```

Rename the `.env.example` file to `.env` and provide de correct PORT.

/!\ You need to get MongoDB up and running on your machine.

### Launch

```bash
npm start
```

## Modification

If you want to modify the React files, first go to the `app` folder :

```bash
cd app/
```

Install the dependencies with Yarn :

```bash
yarn install
```

Modify files in the `src` folder then build the project :

```bash
yarn build
```

Copy files from `app/build` and paste them into `api/dist`.
