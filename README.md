# Generic Blog API

A generic Blog **RESTful API** built with `Node.js`, `Express` and `MySQL`

## Features

- Features a `/contact` route, which sends an email to the API owner
- Routes and `MySQL` queries are separated for readability
- `MySQL` queries are structured as named `arrow functions` that return a `Promise` with the required data
- The queries only do simple jobs, but since they are `Promise` based, they can be chained together to create more complex queries
- Routes are grouped together by _users_, _blogs_ and _comments_

## Requirements

- Git
- Node.js
- NPM
- MySQL Server

## How to use

1. Using `MySQL`, create a database using the [following ERD as reference](https://i.postimg.cc/PqHHjfZG/Database-ERD.jpg) (You will need to remember the HOST, USER, PASSWORD and SCHEMA NAME)
2. Open your terminal and `cd` into your desired folder
3. Run `git clone https://github.com/JasonWandrag/node_blog_api.git`
4. Run `cd node_blog_api`
5. Run `npm install`
6. Create a `.env` file, and fill it with the following environment variables:

- EMAIL=*youremail@gmail.com*
- EMAIL_PASS=_emailPassword_
- DB_HOST=_localhost_
- DB_USER=_root_
- DB_PASS=_passwordForRoot_
- DB_NAME=_schemaName_

7. In the terminal, run `node index.js`

### Please feel free to to make suggestions on how to improve this API.
