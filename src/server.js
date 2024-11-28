// import express from "express";
// import bodyParser from "body-parser";
// require("dotenv").config();
// import connection from "./config/connectDB";
// import apiRoutes from "./api/routes";

// // Swagger UI và Swagger JSDoc
// import swaggerUi from "swagger-ui-express";
// import swaggerJsdoc from "swagger-jsdoc";

// const app = express();

// // Cấu hình Swagger JSDoc
// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0", // OpenAPI version
//     info: {
//       title: "API Example", // Tiêu đề API
//       version: "1.0.0", // Phiên bản API
//       description: "Mô tả API cho ứng dụng Node.js với Swagger",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000/",
//       },
//     ],
//   },
//   apis: ["./api/routes/*.js"], // Đường dẫn tới các file API chứa các comment Swagger
// };

// // Tạo tài liệu Swagger
// const swaggerDocs = swaggerJsdoc(swaggerOptions);

// // Sử dụng Swagger UI để hiển thị tài liệu
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Cấu hình CORS
// app.use(function (req, res, next) {
//   let method = req.method;
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type,Authorization"
//   );

//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   if (method == "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Gọi các route API
// apiRoutes(app);

// // Kết nối DB
// connection(app);
import express from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import connection from "./config/connectDB";
import apiRoutes from "./api/routes";

// Swagger UI và YAMLJS
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

// Load file template.yaml
const swaggerDocument = YAML.load("./template.yaml");

// Sử dụng Swagger UI để hiển thị tài liệu
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cấu hình CORS
app.use(function (req, res, next) {
  let method = req.method;
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (method == "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gọi các route API
apiRoutes(app);

// Kết nối DB
connection(app);
