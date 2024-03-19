import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from "path";
import resolvers from "./../resolvers";


const typesArray = loadFilesSync(path.join(__dirname, "./graphql"), {
    extensions: ["graphql"],
  });
  
const typeDefs = mergeTypeDefs(typesArray);

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});
export default schema;

