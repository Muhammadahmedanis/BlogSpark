import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
// import helmet from "helmet";
import cookieParser from "cookie-parser";
// import mongoSanitize from "express-mongo-sanitize";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";

const app = express();

// Middleware Configurations
app.use(cors({
  origin: [process.env.ALLOWED_ORIGIN_1, process.env.ALLOWED_ORIGIN_2], // Array of allowed origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// app.use(mongoSanitize());
// app.use(helmet());


// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

// we also imple,ent error handler here ix express 5
// app.use((error, req, res, next) => {
//   res.status(error.status || 500).send({
//     status: error.status,
//     message: error.message,
//     stack: error.stack,
//   })
// })

// Handle Undefined Routes
app.all(/.*/, (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export { app };