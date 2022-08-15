import { DocumentBuilder } from "@nestjs/swagger";
const description = "Kortoba Test backend system using Node.js and Nest.js";
export const config = new DocumentBuilder().setTitle("Kortoba Test API").setDescription(description).setVersion("0.0.0").addCookieAuth("optional-session-id").addTag("").build();
