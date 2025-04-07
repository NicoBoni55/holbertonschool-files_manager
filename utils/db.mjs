import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

class DBClient{
    constructor(){
        this.connection = false
        const options = {
            useUnifiedTopology: true,
        }

        MongoClient.connect(URI, options, (error, client) => {
            if(error) {
                console.error(`Error to connect database`)
            }
            this.connection = true;
            this.db = client.db()
            this.users = this.db.collection('users')
            this.files = this.db.collection('files')
        });
    }

    isAlive() {
        return this.connection;
    }

    async nbUsers() {
        return await this.users.countDocuments();
    }
    async nbFiles() {
        return await this.files.countDocuments()
    }
}

const dbClient = new DBClient();
export default dbClient;