import { ApolloServer, gql } from "apollo-server-express";
import compression from "compression";
import express from "express";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { createServer } from "http";



async function startApolo() {

    const app = express();
    app.use(compression());
    
    //definir los tipos de definicion
    const typeDefs = gql`
        type Query{
            hello: String!
            hellowWithName(name:String): String!
            peopleNumber: Int!
        }
    `;

    //resolvers
    const resolvers = {
        Query: {
            hello: (): String => "Hola estoy usando GraphQl",
            hellowWithName: (_: void, args: { name: String }, context: any, info: object) => {
                return "Hola" + args.name
            },
            peopleNumber: () => 12314,
        },
    };

    //construir el schema

    const schema: GraphQLSchema = makeExecutableSchema({
        typeDefs,
        resolvers
    });


    const apolloServer = new ApolloServer({
        schema,
        introspection: true
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: true })

    //_ significa que no se usara ese parametro es el req para una solicutd post mas que nada
    app.get("/hello", (_, res) => {
        res.send("bienvedios al proyecto graphql")
    });

    app.get("/", (_, res) => {
       res.redirect("/graphql")
    });

    const httpServer = createServer(app);

    httpServer.listen({
        port: 3025
    }, () => console.log("servirdor http://localhost:3025 ----"));
}
startApolo();