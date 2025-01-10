module.exports = (res, statusCode, data) => {
    const isError = statusCode >= 400;
    res.status(statusCode).json({
      error: isError,
      message: isError ? data : null,
      data: !isError ? data : null
    });
  };
  