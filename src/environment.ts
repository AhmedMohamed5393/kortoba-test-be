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
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const DB_TYPE = process.env.DB_TYPE;
