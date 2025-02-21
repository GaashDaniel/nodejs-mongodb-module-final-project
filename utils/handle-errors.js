import chalk from "chalk";
import { logErrorToFile } from "./file-logger.js";

export const createError = (validator, error) => {
  error.message = `${validator} Error: ${error.message}`;
  error.status = error.status || 400;
  return new Error(error);
};

export const handleError = (res, status, message = "") => {
  if (message instanceof Error) message = message.message;
  console.log(chalk.bgYellowBright.red(message));
  res.status(status).send(message);

  console.log('before logErrorToFile');

  logErrorToFile(status, res.req.method, res.req.originalUrl, message);

  console.log('after logErrorToFile');
};