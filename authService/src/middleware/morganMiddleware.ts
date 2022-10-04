import morgan, { StreamOptions } from "morgan";
import Logger from "../lib/logger";


const stream: StreamOptions = {
  write: (message: any) => Logger.http(message),
};
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build the morgan middleware
const morganMiddleware = morgan(

  ":method :url :status :res[content-length] - :response-time ms",
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

export default morganMiddleware;