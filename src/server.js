const app = require("./app");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const createIO = require("./socket-io");

createIO(io);

const PORT = process.env.PORT || 7000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
