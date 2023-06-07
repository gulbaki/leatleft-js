
# Project with Fastify

This is a fastify  project that demonstrates how to create a REST API.

## Installation

To install this project, first clone the repository:

```
git clone https://github.com/gulbaki/leatleft-js.git
```

Then, navigate to the project directory and install the dependencies:

```
cd leatleft-js/backend
npm install
```

## Usage

To run the project, use the following command:


```
npm run dev
```
This will start the server on port 3000. You can then access the API by sending HTTP requests to http://localhost:3000.


## Demo link
https://sammcase.bakigul.com/
## SWAGGER PATH

https://sammcase.bakigul.com/api/docs/static/index.html
 
## API Endpoints
GET `/api/locations/get`

This endpoint returns a list of all locations.

POST `/api/locations/add` 

This endpoint allows you to create a new location. The request body should be a JSON object with the following properties:

````
Example Value
Model
{
  "__id": 0,
  "date": "2023-06-07T15:10:30.818Z",
  "loc": [
    34,
    27
  ]
}
````

DELETE `/api/locations/delete/:id` 

This endpoint delete  of one location.


GET  `/api/locations/export`
This endpoint export  location json type.

