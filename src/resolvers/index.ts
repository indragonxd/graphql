import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

//reunes los querys y mutations en un solo resolver
const resolversArray = loadFilesSync(path.join(__dirname), {
  extensions: ["ts", "js"],
});


const resolversIndex =  mergeResolvers(resolversArray);

export default resolversIndex;