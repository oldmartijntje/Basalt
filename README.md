# diagonal-dinosaur
NodeTS EJS Mongodb webapp Template📋

This requires you either one of the followig:
- You run mongodb locally
- You have mongodb self hosted
- you are using the "mongodb as a service" option: [atlas](https://www.mongodb.com/products/platform/atlas-database)

## Setup

Run `npm i` in the root folder, this installs all packages.

Then we run `npm run setup` in that root folder, this gives you steps with things you have to walk through. 
My default local hosted mongodb conn string is `mongodb://localhost:27017/DIAGONAL_DINOSAUR`, but my hosted conn string looks like `mongodb://<username>:<password>@<ipadress>:<port>`. 
Make sure you find your correct conn string.

Here you can also select how you would like to register your accounts, there are 2 modes

### 1. The POST Method

This method is the original method.

By default there will be no user. There is an `/api/login/register` endpoint to register a user, but this requires access to the console of the backend. When the backend is running, there will be a message in the console: `Admin key: b6866362-c4cd-48d4-bdf1-c0287b8fd6ad`. With this info we make the following request to the backend via HTTP POST to the `/api/login/register` endpoint:
```json
{
    "username":"username",
    "password":"password",
    "registerSignupKey": "b6866362-c4cd-48d4-bdf1-c0287b8fd6ad"
}
```

This will create a user. You can do this as many times as you'd like. This Admin key is generated on startup.

### 2. Modern UI

This method allows you to create users through the UI of the website, the register page.

When you select this option, you'll get another option in the setup. 
This is an option where you allow multiple account creations via the UI.
All users created after the 1st will have a lower access level.

When choosing this mode of registering users, you can still use the old way, but those accounts will all have a lower access level. (unless blocked.)

## Running

run `npx ts-node src/server.ts` to start the backend. The console will give you the port the front-end is on. This port can be changed via the `settings.json`

## Account AccessIdentifiers

An account accessIdentifier defines rules what a user can access and what it can not access.
Think of it like a clearance level, a user with level 2 can access more than a user with level 1.

But this system can have problems in some cases. 
When you want to give your family and friends access to your website, but your friends should only be allowed to visit friends "stuff", 
and family should only access family photos. This problem can't be solves with clearance levels.
This is why we use accessIdentifiers: everyone with the accessIdentifier `friend` can visit page X, and everyone else cannot.

By default, everything can be looked up with the accessIdentifier `#`, which is not registerable. 
This will only be granted to the first user to sign up.
