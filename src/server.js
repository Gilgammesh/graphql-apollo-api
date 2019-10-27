/*******************************************************************************************************/
// Añadimos los Imports //
/*******************************************************************************************************/
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { createServer } from "http";
import { join } from "path";
import { ApolloServer } from 'apollo-server-express';
import expressPlayGround from 'graphql-playground-middleware-express';
import { connect } from "./database/database";
import schema from "./graphql/schema";
import "colors";

/*******************************************************************************************************/
// Inicializamos la aplicación de Express //
/*******************************************************************************************************/
export const app = express();

/*******************************************************************************************************/
// Middlewares //
/*******************************************************************************************************/
app.use(morgan("dev")); // Logger para ver los HTTP request al servidor
app.use(json()); // Hace un parse de las application/json
app.use(
  urlencoded({
    extended: false
  })
); // Hace un parse de las application/x-www-form-urlencoded
app.use(cookieParser()); // Hace un parse de las Cookies en un HTTP request
app.use("*", cors()); // Permite acceder a recursos del servidor desde otro dominio
app.use(compression()); // Habilita compresion en todas las responses
app.use(express.static(join(__dirname, "../public"))); // Establecemos una ruta estática

/*******************************************************************************************************/
// Nos conectamos a la Base de Datos //
/*******************************************************************************************************/
connect();

/*******************************************************************************************************/
// Inicializamos el Servidor de Apollo //
/*******************************************************************************************************/
const server = new ApolloServer({
  schema: schema, // Pasamos el schema al servidor
  introspection: true, // Habilita instrospeccion de schema (se recomienda deshabilitar en produccion)
  playground: true // Habilita el playground
});
server.applyMiddleware({ app }); // Conectamos el Servidor de Apollo con la Aplicación
app.use('/', expressPlayGround({
  endpoint: '/graphql'
})); // Para cualquier ruta redireccionamos a nuestro PlayGround

/*******************************************************************************************************/
// Obtenemos el puerto desde el entorno y almacenamos //
/*******************************************************************************************************/
const port = process.env.PORT || 4000;

/*******************************************************************************************************/
// Configuraciones de la Aplicación //
/*******************************************************************************************************/
app.set("port", port);
app.set("name", "Aplicación GraphQL Apollo API");

/*******************************************************************************************************/
// Creando Servidor HTTP //
/*******************************************************************************************************/
const httpServer = createServer(app);

/*******************************************************************************************************/
// Arrancamos el Servidor de Express
/*******************************************************************************************************/
const route = "graphql";
httpServer.listen(port, () => {
  console.log("**************************************************************".rainbow);
  console.log(app.get("name").magenta.bold);
  console.log(`🚀  Servidor listo en: `.yellow.bold + `http://localhost:${port}/${route}`.blue.bold);
  console.log("**************************************************************".rainbow);
});