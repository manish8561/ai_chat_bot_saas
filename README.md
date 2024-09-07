# AI Chat Bot SAAS
AI chat bot using Open AI, NestJS, MongoDB in the backend and Vite with ReactJs in the frontend.

### Requirements
Open AI and API Keys
Mongodb
Nest JS
Node Version 20.16.0 or more
Docker

### Guide to get Open AI keys
Go this link [Open AI](https://platform.openai.com/docs/) register there and create user keys and organization keys for the project.

### Installation
Goto to backend folder in the terminal and run following command:
```bash
cd backend
npm i
cp .env-sample .env
```
If you want to use mongodb with docker(replace volume path per you filesystem):
```bash
docker run --name mongodb -p 27017:27017 -v /media/ishanvi/data/storages/mongo:/data/db -d --rm mongodb/mongodb-community-server:latest
```
example
```bash
docker run --name mongodb -p 27017:27017 -v /home/manish/office/projects/ai_chat_bot_saas/mongodb/data:/data/db -d --rm mongodb/mongodb-community-server:latest
```

Add values in `.env` file before you start the server.

To run backend:
```bash
npm start
```

To run backend in watch mode:
```bash
npm run start:dev
```

To run test
```bash
npm test
```

To run test for single file
```bash
npm test <path to spec file>
```

To run frotend in dev mode:
```bash
cd frontend
npm i
npm run dev
```

Using packages in the frontend vite react-icons mui react-router-dom react-hot-toast react-syntax-highlighter react-type-animation

### Author
Manish Sharma
[@manish8561](https://github.com/manish8561/)

### Reference
https://github.com/openai/openai-node
https://www.freecodecamp.org/news/build-an-ai-chatbot-with-the-mern-stack/