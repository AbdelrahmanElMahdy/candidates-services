# candidate-services

candidate services is a partially small micro service that provide functionality ex; adding his experience at
candidates' previous companies

let's run this project

-   Run `git pull` repo-link
-   create .env file and make sure to provide it with given values so server
    PORT :port_number default 5000
    NODE_ENV: development environment name
    DB_USERNAME: you database username
    DB_PASSWORD: your database password
    DB_HOST: database host if you want to run localhost with docker set it to host.docker.internal  
    DB_NAME: database name
    DB_PORT: database port usually 5432
    JWT_SECRET: jwt secret string
-   and now you have to option to build the server;

    -   docker
    -   normal running

-   docker specific
    -   `docker build -t candidate . `
    -   `docker run candidate`
-   normal
    -   make sure you have node.js & npm installed on your machine
    -   go inside root folder where package.json and run `npm install` to install required dependencies
    -   `npm run dev` for development `npm run start` for production

**now, server is running**
**now, server is running**

> you can find some of apis postman documentation for this project here [postman doc](https://documenter.getpostman.com/view/13580360/UzBsH4Ye)

> why separating the micro services into two different repository?
> it's a trade off however in our case the plan is that each services will be quite large, and separating them let us treat each service independently in terms of deployment and maintaining, also if one service goes down the other services won't be affected


> why we create some values in the database at text not string however it's size should be small ?
> i built this project on a given existed database, so I construct the ORM to match what exist without doing migration

> why I've not put all micro services inside one yaml file with different services names
> it's a good question and again i claim it's a trade off and in real world big micro services we don't miss everything together so it all depend on how we want. 