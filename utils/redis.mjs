import {createClient} from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();

        this.client.on("error", (err) => {
            console.error(`Redis client error: ${err}`)
        });

        this.connected = false;

        this.client.connect().then(() => {
            this.connected = true;
        }).catch((err) => {
            console.error(`Redis connection failed: ${err}`)
        })
    }


    isAlive(){
        return this.client.isOpen;
    }

    async get(key) {
        try {
            return await this.client.get(key)
        } catch (err) {
           console.error(`Get failed ${err}`) 
        }
    }

    async set(key, value, duration) {
        try {
            await this.client.set(key, value, {EX: duration})
        } catch (err) {
            console.error(`Set failed ${err}`)
        }
    }

    async del(key) {
        try {
            await this.client.del(key)
        } catch (err) {
            console.error(`Del failed ${err}`)
        }
    }
}

const redisClient = new RedisClient();
export default redisClient;
