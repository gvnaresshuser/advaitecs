const logger = (req, res, next) => {
  //console.log(`LOGGER:${req.method} ${req.url}`);
  console.log(
    `[${new Date().toLocaleString()}] LOGGER: ${req.method} ${req.url}`,
  );
  next();
};

export default logger;
/*
req → request object
res → response object
next → passes control to the next middleware/route
next() → tells Express to continue
*/
/*
If you comment out next(), the request will stop at the logger middleware 
and will not continue to the next middleware or route handler.
*/
