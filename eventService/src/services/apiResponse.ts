export const successResponse = (message: String, data: Object| null, statusCode: Number) => {
    return {
      message,
      error: false,
      code: statusCode,
      data
    };
  };

export const errorResponse = (message: String, statusCode: Number) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
  
    if (!findCode) statusCode = 500;
    else statusCode = findCode;
  
    return {
      message,
      code: statusCode,
      error: true
    };
  };