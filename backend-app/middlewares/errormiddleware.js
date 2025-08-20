// Not Found middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Centralized Error Handler
const errorHandler = (err, req, res, next) => {
  try {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  } catch (error) {
    console.error("Error in errorHandler:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { notFound, errorHandler };
