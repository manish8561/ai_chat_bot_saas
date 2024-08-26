# AI Chat Bot SAAS

### Requirements
Open AI and API Keys
Mongodb
Nest JS
Node Version 20.16.0 or more
Docker

### Installation
Goto to backend folder in the terminal and run following command:
```bash
cd backend
npm i
```
If you want to use mongodb with docker(replace volume path per you filesystem):
```bash
docker run --name mongodb -p 27017:27017 -v /media/ishanvi/data/storages/mongo:/data/db -d --rm mongodb/mongodb-community-server:latest
```

To run backend:
```bash
npm start
```

To run backend in watch mode:
```bash
npm run start:dev
```

### Author
Manish Sharma
[@manish8561](https://github.com/manish8561/)