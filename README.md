# ManageIt
This is a hostel complain portal.

run ```npm install``` and ```npm run client-install ``` to install the dependencies.

Before running the project just create a file called .env

```
MONGOURI=
JWTSECRET=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
```

Enter the mongouri,and all pusher appdetails. Create a pusher account and enter the required details. For mongo I am using online service called Mongo DB atlas.


Create a file client/src/config/key.js

```javascript
var config={
    "pusherAppId": ""
}

export default config;
```

Enter the same pusher app id.

In the terminal enter ```npm run dev```  to start both server and client cuncurrently