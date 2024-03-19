import {IResolvers} from "@graphql-tools/utils";
import IUser from "../interfaces/user-interface";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
const mutationResolver: IResolvers = {
    Mutation: {
        //recuerda para poder acceder argumentos y bd necesitas estos parametros
        //_:void,args:{user:IUser},context:{db: Connection}
        add: async(_:void,args:{user:IUser},context:{db: Connection}):Promise<boolean> => {
            try {
                const input = args.user;
                context.db.query(
                    'INSERT INTO user (id, name, lastname, email, password) VALUES (?, ?, ?, ?, ?)',
                    [input.password, input.name, input.lastname, input.email, input.password]
                );
                return true;
            } catch (error) {
                console.error('Error executing mutation:', error);
                return false;
            }
        }
    },
};
export default mutationResolver;