# diagonal-dinosour
NodeTS EJS Mongodb webapp Template📋

This requires you either one of the followig:
- You run mongodb locally
- You have mongodb self hosted
- you are using the "mongodb as a service" option: [atlas](https://www.mongodb.com/products/platform/atlas-database)

## Setup

Run `npm i` in the root folder, this installs all packages.

Then we run `npm run setup` in that root folder, this gives you steps with thingss you have to walk through. My default local hosted mongodb conn string is `mongodb://localhost:27017/BG_STATS_WEB`, but my hosted conn string looks like `mongodb://<username>:<password>@<ipadress>:<port>`. Make sure you find your correct conn string.

## Running

run `npx ts-node src/server.ts` to start the backend. The console will give you the port the front-end is on. This port can be changed via the `settings.json`

### Creating the first account

you need to login to be able to use this, and by default there will be no user. There is an `/api/login/register` endpoint to register a user, but this requires access to the console of the backend. When the backend is running, there will be a message in the console: `Admin key: b6866362-c4cd-48d4-bdf1-c0287b8fd6ad`. With this info we make the following request to the backend via HTTP POST to the `/api/login/register` endpoint:
```json
{
    "username":"username",
    "password":"password",
    "registerSignupKey": "b6866362-c4cd-48d4-bdf1-c0287b8fd6ad"
}
```

This will create a user. You can do this as many times as you'd like. This Admin key is generated on startup.