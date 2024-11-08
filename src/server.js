const http = require('http');
const app = require('./app');
const httpServer = http.createServer(app);
const connectDB = require('./helpers/dbConfig');
const {PORT} = require('./config/index');


const startServer = async() => {
    await connectDB();
    httpServer.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    })
}

startServer();