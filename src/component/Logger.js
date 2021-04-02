const debug = process.env.NODE_ENV.includes("dev") ? true : false;

export default class Logger {
  log(message) {
    if (debug) {
      console.log(message);
    }
  }

  logLevel(level, message) {
    if (debug) {
      console.log(`${level.toUpperCase()}: ${message}`);
    }
  }
}
