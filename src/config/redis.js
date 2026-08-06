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

export const connectRedis = async () => {
    
    if (redisClient.isOpen) {
        return redisClient;
    }

    try {
        await redisClient.connect();

        console.log("Redis Connected");

        return redisClient;

    } catch (error) {
        console.error("Redis connection failed:", error.message);

        // IMPORTANT: don't hide the error
        throw error;
    }
};

export default redisClient;