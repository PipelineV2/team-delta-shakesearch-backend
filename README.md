# shake-search team delta backend api

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



