import {IResolvers} from "@graphql-tools/utils";
import IUser from "../interfaces/user-interface";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

const queryresolvers: IResolvers = {
    Query: {
        users: async(_: void, args: any, context: { db: Connection }): Promise<IUser[]> => {
            try {
                const results = await new Promise<any[]>((resolve, reject) => {
                    context.db.query('SELECT * FROM user', (error, results: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    });
                });
                if (Array.isArray(results) && results.length > 0) {
                    const mappedUsers: IUser[] = results.map((row: any) => {
                        return {
                            id: row.id,
                            name: row.name,
                            lastname: row.lastname,
                            email: row.email,
                            password: row.password,
                            registerDate: row.registerDate
                        };
                    });
                    return mappedUsers;
                } else {
                    return [];
                }
            } catch (error) {
                throw new Error('Error fetching users');
            }
        }
    }
};
export default queryresolvers;