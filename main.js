const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  router = require("./router"),
  fs = require("fs");

// -----Version 1----
// const getViewUrl = (url) => {
//   return `views${url}.html`;
// };
//
// http
//   .createServer((req, res) => {
//     let viewUrl = getViewUrl(req.url);
//     fs.readFile(viewUrl, (error, data) => {
//       if (error) {
//         res.writeHead(httpStatus.NOT_FOUND,{
//           "Content-Type": "text/html"
//         });
//         res.write("<h1>FILE NOT FOUND</h1>");
//       } else {
//         res.writeHead(httpStatus.OK, {
//           "Content-Type": "text/html"
//         });
//         res.write(data);
//       }
//       res.end();
//     });
//   })
//   .listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);

// -----Version 2----
// const sendErrorResponse = res => {
//   res.writeHead(httpStatus.NOT_FOUND, {
//     "Content-Type": "text/html"
//   });
//   res.write("<h1>File Not Found!</h1>");
//   res.end();
// };
//
// http
//   .createServer((req, res) => {
//     let url = req.url;
//     if (url.indexOf(".html") !== -1){
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/html"
//       });
//       customReadFile(`./views${url}`, res);
//     } else if (url.indexOf(".js") !== -1) {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/javascript"
//       });
//       customReadFile(`./public/js${url}`, res);
//     } else if (url.indexOf(".css") !== -1) {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/css"
//       });
//       customReadFile(`./public/css${url}`, res);
//     } else if (url.indexOf(".png") !== 1){
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "image/png"
//       });
//       customReadFile(`./public/images${url}`, res);
//     } else {
//       sendErrorResponse(res);
//     }
//   })
//   .listen(port);
//   console.log(`The server has started and is listening on port number: ${port}`);
//
//   const customReadFile = (file_path, res) => {
//     if (fs.existsSync(file_path)){
//       fs.readFile(file_path, (error, data) => {
//         if (error) {
//           console.log(error);
//           sendErrorResponse(res);
//           return;
//         }
//         res.write(data);
//         res.end();
//       });
//     } else {
//       sendErrorResponse(res);
//     }
//   };


// -----Version 3----

const plainTextContentType = {
  "Content-Type": "text/plain"
},
  htmlContentType = {
    "Content-Type": "text/html"
  },
  customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
      if (errors) {
        console.log("Error reading the file...");
      }
      res.end(data);
    });
  };

router.get("/", (req,res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end("INDEX");
  console.log("here1");
});

router.get("/index.html", (req,res) => {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile("views/index.html", res);
  console.log("here2");
});

router.post("/", (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end("POSTED");
  console.log("here3");
});

http.createServer(router.handle).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
