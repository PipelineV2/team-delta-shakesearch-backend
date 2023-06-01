# ShakeSearch Backend (Delta)
Shakesearch (the name of the app) a simple web app that allows a user to search for a text string in the complete works of Shakespeare.


### Install dependencies
`npm install`


### Start the Server
`docker compose up`

### Server Endpoint
http://localhost:3000/v1/

### How to use
- Hit the create Index enpoint first 
`POST http://localhost:3000/v1/shake-search/create-index`

- Search for any key word
`POST http://localhost:3000/v1/shake-search/search `
`content-type: application/json`

`{`
    `"query": " prince of denmark"`
`}`



