import { createClient } from "redis"

class RedisClient {
    constructor() {
        this.client = createClient();

        this.client.on("error", (err) => {
            console.error(`Redis client error: ${err}`)
        })

        this.client.connect();
    }


    isAlive(){
        return this.client.connected;
    }

    async get(key) {
        return this.client.get(key)
    }

    async set(key, value, duration) {
       await this.client.setex(key, value, duration)
    }

    async del(key) {
        await this.client.del(key)
    }
}

const redisClient = new RedisClient();
export default redisClient;
