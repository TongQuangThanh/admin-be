import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { projectRouters } from './routers/project'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, X-Requested-With, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, PATCH");
  next();
});

mongoose.connect("mongodb+srv://thnvn:thnvn@cluster0.zived4s.mongodb.net/administrator?w=majority")
  .then(async (db) => {
    console.log('[database]: Connected to database!');
  }).catch(e => console.log(e));

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const port = normalizePort(process.env.PORT || "3080");
app.set('port', port);
const server = http.createServer(app);
server.on("error", (error: any) => {
  if (error.syscall !== "listen") throw error;
});

app.get("/", (req, res, next) => {
  res.send('Welcome!!!');
});

app.use("/project", projectRouters);

server.listen(port, async () => {
  console.log(`[server]: Server is running, current time: `, new Date());
});