# Notes Taking API

A simple RESTful Notes API built with **Node.js**, **Express.js**, and **dotenv**.

This project allows users to create, read, update, and delete notes through HTTP API endpoints.

## Features

* API health check
* Create a new note
* Get all notes
* Get a single note by ID
* Update an existing note
* Delete a note
* Custom request logger middleware
* JSON request body parsing
* Environment variable support
* Appropriate HTTP status codes

## Technologies Used

* **Node.js** — JavaScript runtime
* **Express.js** — Web framework for Node.js
* **dotenv** — Loads environment variables from a `.env` file

## Project Structure

```text
notes-api/
│
├── node_modules/
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

> The main application file is assumed to be named `server.js`. If your file has a different name, replace `server.js` with your actual filename.

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate into the project

```bash
cd notes-api
```

### 3. Install dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
```

If no `PORT` is provided, the application automatically uses port `3000`.

## Running the Application

Start the server with:

```bash
node server.js
```

You should see:

```text
App is running on http://localhost:3000
```

You can then open:

```text
http://localhost:3000
```

## API Endpoints

### 1. Health Check

**GET /**

Checks whether the API is running.

#### Response

```json
{
  "message": "Notes taking API is running successfully"
}
```

---

### 2. Get All Notes

**GET /notes**

Returns all notes currently stored in the application.

#### Response

```json
{
  "message": "All notes fetched successfully",
  "notes": []
}
```

---

### 3. Create a Note

**POST /notes**

Creates a new note.

#### Request Body

```json
{
  "title": "My first note",
  "content": "This is the content of my first note."
}
```

#### Response

```json
{
  "id": 1,
  "title": "My first note",
  "content": "This is the content of my first note.",
  "createdAt": "Sun Aug 30 2026 18:00:00 GMT+0100"
}
```

### Required Fields

Both `title` and `content` are required.

If either field is missing, the API returns:

```json
{
  "error": "Title and content are required"
}
```

with HTTP status:

```text
400 Bad Request
```

---

### 4. Get a Single Note

**GET /notes/:id**

Returns a specific note using its ID.

#### Example

```text
GET /notes/1
```

#### Response

```json
{
  "id": 1,
  "title": "My first note",
  "content": "This is the content of my first note.",
  "createdAt": "Sun Aug 30 2026 18:00:00 GMT+0100"
}
```

If the note does not exist:

```json
{
  "message": "Note not found"
}
```

with HTTP status:

```text
404 Not Found
```

---

### 5. Update a Note

**PUT /notes/:id**

Updates an existing note.

#### Example

```text
PUT /notes/1
```

#### Request Body

```json
{
  "title": "Updated note",
  "content": "This is the updated content."
}
```

#### Response

```json
{
  "id": 1,
  "title": "Updated note",
  "content": "This is the updated content.",
  "createdAt": "Sun Aug 30 2026 18:00:00 GMT+0100",
  "updatedAt": "Sun Aug 30 2026 18:30:00 GMT+0100"
}
```

The `updatedAt` property records when the note was modified.

---

### 6. Delete a Note

**DELETE /notes/:id**

Deletes a note using its ID.

#### Example

```text
DELETE /notes/1
```

#### Response

```json
{
  "message": "Note deleted successfully"
}
```

If the note doesn't exist:

```json
{
  "message": "Note not found"
}
```

with HTTP status:

```text
404 Not Found
```

## HTTP Status Codes

| Status Code | Meaning     | Usage                                  |
| ----------- | ----------- | -------------------------------------- |
| `200`       | OK          | Successful GET, PUT, or DELETE request |
| `201`       | Created     | Successfully created a new note        |
| `400`       | Bad Request | Required data is missing               |
| `404`       | Not Found   | Requested note doesn't exist           |

## Testing the API

You can test the API using tools such as:

* Postman
* Insomnia
* Thunder Client
* cURL
* REST Client extensions in VS Code

### Example with cURL

Create a note:

```bash
curl -X POST http://localhost:3000/notes ^
-H "Content-Type: application/json" ^
-d "{\"title\":\"Shopping List\",\"content\":\"Buy milk and bread\"}"
```

Get all notes:

```bash
curl http://localhost:3000/notes
```

Get a specific note:

```bash
curl http://localhost:3000/notes/1
```

Update a note:

```bash
curl -X PUT http://localhost:3000/notes/1 ^
-H "Content-Type: application/json" ^
-d "{\"title\":\"Updated Shopping List\"}"
```

Delete a note:

```bash
curl -X DELETE http://localhost:3000/notes/1
```

## Middleware

The application uses Express middleware to process requests.

### JSON Middleware

```js
app.use(express.json());
```

This allows the API to receive JSON data from request bodies.

### Custom Logger

The application also has a custom logging middleware:

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toString()}`);
  next();
});
```

It logs:

* HTTP method
* Requested URL
* Date and time of the request

Example:

```text
POST /notes Sun Aug 30 2026 18:30:15 GMT+0100
```

## Data Storage

Currently, notes are stored in an in-memory JavaScript array:

```js
let notes = [];
```

Each note receives a unique ID using:

```js
let id_count = 1;
```

Because the data is stored in memory, **all notes will be lost whenever the server restarts**.

### Future Improvements

Possible improvements include:

* Add MongoDB or MySQL database storage
* Add user authentication
* Add input validation
* Add pagination
* Add search functionality
* Add categories or tags
* Add automated tests
* Add error-handling middleware
* Deploy the API online
* Add API documentation with Swagger/OpenAPI

## Author

**Abdullahi Rafiu**

## License

This project is intended for learning and practice purposes.
