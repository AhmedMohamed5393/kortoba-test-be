import { DocumentBuilder } from "@nestjs/swagger";
const description = "Movies Dashboard backend system using Node.js and Nest.js";
export const config = new DocumentBuilder().setTitle("Movies Dashboard API").setDescription(description).setVersion("0.0.0").addCookieAuth('optional-session-id').addTag("").build();
