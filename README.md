# NodeJS Web Server Boilerplate (NodeWS)

NodeWS is a boilerplate for people who wants to setup a nodejs server with express. It can configured to use socket.io and mongodb with mongoose npm package.JWT package has been already setup for easier building.


_Project can be easily configured from server-config.js file which resides in root folder of the project._
```

{
    "socket-server":true,   
    "mongo-db-connection":false,
    "mongo-db-connection-string":"mongodb://localhost/test",
    "cors-origin-uri":"CORS-ORİGİN-URI ",
    "use-cors":true
}
```

##Project Structure

```

├───middleware
│   └───auth
│           checkAuth.js  //jwt token verification
│           secret.js //jwt secret
│           signAuth.js //jwt token creation
│
├───MongoDB
│   │   mongooseBuilder.js //mongoose settings
│   │
│   └───Models
│           exampleSchema.js
│
├───SocketIO
│       socketserver.js  //socket.io configıration
│       socketservertest.js  //test code for socket.io
│
└───src
        app-dependencies.js  //dependencies and custom middlewares of the app
        app-setup.js  //middleware setup of the app
        app.js 


```

### Using app-dependencies.js file

All the dependencies of the express project resides in this file. It is created to avoid clutter on the app.js file.In the following example dependency file used for jwt middleware.


```
//AllowAnonymous
//dep object is import of app-dependencies.js file
const dep = require('./app-dependencies');

app.get("/jwtsign", (req, res, next) => {
  res.json({
    "token": dep.signAuth({ user: "testuser" }),
  })
})

//token guarded request. Will return 401 without token
app.get("/jwtget", dep.checkAuth, (req, res, next) => {
  res.json({
    "decrypted-data": req.decrypt,
  })
})
```
