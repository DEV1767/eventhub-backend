import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

let connectionPromise = null;

export const connectRedis = async () => {

    if (redisClient.isOpen) {
        return redisClient;
    }

    if (!connectionPromise) {
        connectionPromise = redisClient
            .connect()
            .then(() => {
                console.log("Redis Connected");
                return redisClient;
            })
            .catch((error) => {
                connectionPromise = null;
                throw error;
            });
    }

    await connectionPromise;

    return redisClient;
};


export const getRedisClient = async () => {
    await connectRedis();
    return redisClient;
};

export default redisClient;