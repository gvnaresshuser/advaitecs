const http = require("http");

const PORT = 5000;

const server = http.createServer((req, res) => {
  // Hello World endpoint - http://localhost:5000/api/hello
  if (req.url === "/api/hello" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Hello World!",
      }),
    );

    return;
  }

  // 404 - Route not found
  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      message: "Route not found",
    }),
  );
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});