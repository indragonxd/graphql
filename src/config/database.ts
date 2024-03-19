import mysql from 'mysql2';
class Database {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'graphql'
    });
    this.connect();
  }
  private async connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL database:', err);
          reject(err);
        } else {
          console.log('Connected to MySQL database');
          resolve();
        }
      });
    });
  }

  public async query(sql: string, values?: any[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.connection.query(sql, values, (error, results:any[]) => {
        if (error) {
          console.error('Error executing query:', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  getConnection(){
    return this.connection;
  }
}
export default Database;