import * as dotenv from "dotenv";
import * as nodepath from "path";
dotenv.config();
const basedir = nodepath.dirname(require.main.filename);
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${basedir}/../.env.test`;
    break;
  case "production":
    path = `${basedir}/../.env.production`;
    break;
  default:
    path = `${basedir}/../.env.development`;
}
dotenv.config({ path });
export const PORT = process.env.PORT;
export const MULTER_DEST = process.env.MULTER_DEST;
export const DBURI = process.env.DBURI;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_TYPE = process.env.DB_TYPE;
