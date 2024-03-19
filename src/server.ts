import { Application } from "express";
import { Server, createServer } from "http";
import compression from "compression";
import express from "express";
import { GraphQLSchema } from "graphql";
import { ApolloServer } from "apollo-server-express";
import enviroment from "./config/enviroment"
import Database from "./config/database";
class GraphQLServer {
    //propiedades
    private app!: Application;
    private httpServer!: Server;
    private readonly DEFAULT_PORT = (process.env.PORT)? +process.env.PORT : 3000;
    private schema!: GraphQLSchema;
    constructor(schema: GraphQLSchema) {
        if(schema === undefined){
            throw new Error("necesitamos un schema");
        }
        this.schema = schema;
        this.init();
    }

    init() {
        this.initializeEnviroments();
        this.configExpress();
        this.configApolloServerExpress();
        this.configRoutes();
    }

    initializeEnviroments(){
        if(process.env.NODE_ENV !== "production"){
            const envs = enviroment;
            console.log(envs);
        }
    }

    private configExpress() {
        this.app = express();
        this.app.use(compression());

        this.httpServer = createServer(this.app);
    }

    private async configApolloServerExpress() {
        const database = new Database();
        const db = database.getConnection();
        const context = async () => {
            return {db}
        }
        const apolloServer = new ApolloServer({
            schema:this.schema,
            introspection: true,
            context
        });

        await apolloServer.start();
        apolloServer.applyMiddleware({ app: this.app, cors: true })
    }

    private configRoutes() {
        //_ significa que no se usara ese parametro es el req para una solicutd post mas que nada
        this.app.get("/hello", (_, res) => {
            res.send("bienvedios al proyecto graphql")
        });

        this.app.get("/", (_, res) => {
            res.redirect("/graphql")
        });
    }

    listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT))
    }

}
export default GraphQLServer;