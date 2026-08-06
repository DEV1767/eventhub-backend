import { getRedisClient } from "../config/redis.js";


// ======================================================
// USER SESSION CACHE
// ======================================================

export const cacheUserSession = async (userId, userData) => {
    try {
        const redis = await getRedisClient();

        const key = `user:${userId}`;

        await redis.setEx(
            key,
            3600,
            JSON.stringify(userData)
        );

    } catch (error) {
        console.error(
            "Redis cacheUserSession error:",
            error.message
        );
    }
};


export const getCachedUserSession = async (userId) => {
    try {
        const redis = await getRedisClient();

        const key = `user:${userId}`;

        const data = await redis.get(key);

        return data ? JSON.parse(data) : null;

    } catch (error) {
        console.error(
            "Redis getCachedUserSession error:",
            error.message
        );

        return null;
    }
};


// ======================================================
// OTP CACHE
// ======================================================

export const cacheOTP = async (email, otp, ttl = 300) => {
    try {
        const redis = await getRedisClient();

        const key = `otp:${email}`;

        await redis.setEx(
            key,
            ttl,
            String(otp)
        );

    } catch (error) {
        console.error(
            "Redis cacheOTP error:",
            error.message
        );
    }
};


export const getOTP = async (email) => {
    try {
        const redis = await getRedisClient();

        const key = `otp:${email}`;

        return await redis.get(key);

    } catch (error) {
        console.error(
            "Redis getOTP error:",
            error.message
        );

        return null;
    }
};


export const clearOTP = async (email) => {
    try {
        const redis = await getRedisClient();

        const key = `otp:${email}`;

        await redis.del(key);

    } catch (error) {
        console.error(
            "Redis clearOTP error:",
            error.message
        );
    }
};


// ======================================================
// COLLEGE EVENT CACHE
// ======================================================

export const cacheEvent = async (
    collegename,
    filters,
    data,
    ttl = 300
) => {
    try {
        const redis = await getRedisClient();

        const key =
            `events:${collegename}:${JSON.stringify(filters)}`;

        await redis.setEx(
            key,
            ttl,
            JSON.stringify(data)
        );

    } catch (error) {
        console.error(
            "Redis cacheEvent error:",
            error.message
        );
    }
};


export const getCachedEvent = async (
    collegename,
    filters
) => {
    try {
        const redis = await getRedisClient();

        const key =
            `events:${collegename}:${JSON.stringify(filters)}`;

        const data = await redis.get(key);

        return data ? JSON.parse(data) : null;

    } catch (error) {
        console.error(
            "Redis getCachedEvent error:",
            error.message
        );

        return null;
    }
};


export const invalidateCollegeEventCache = async (
    collegename
) => {
    try {
        const redis = await getRedisClient();

        let cursor = "0";

        do {
            const result = await redis.scan(cursor, {
                MATCH: `events:${collegename}:*`,
                COUNT: 100
            });

            cursor = result.cursor;

            if (result.keys.length > 0) {
                await redis.del(result.keys);
            }

        } while (cursor !== "0");

    } catch (error) {
        console.error(
            "Redis invalidateCollegeEventCache error:",
            error.message
        );
    }
};


// ======================================================
// SCHEDULE CACHE
// ======================================================

export const cacheSchedule = async (
    eventId,
    data,
    ttl = 300
) => {
    try {
        const redis = await getRedisClient();

        const key = `schedule:${eventId}`;

        await redis.setEx(
            key,
            ttl,
            JSON.stringify(data)
        );

    } catch (error) {
        console.error(
            "Redis cacheSchedule error:",
            error.message
        );
    }
};


export const getCachedSchedule = async (eventId) => {
    try {
        const redis = await getRedisClient();

        const key = `schedule:${eventId}`;

        const data = await redis.get(key);

        return data ? JSON.parse(data) : null;

    } catch (error) {
        console.error(
            "Redis getCachedSchedule error:",
            error.message
        );

        return null;
    }
};


export const invalidateScheduleCache = async (eventId) => {
    try {
        const redis = await getRedisClient();

        const key = `schedule:${eventId}`;

        await redis.del(key);

    } catch (error) {
        console.error(
            "Redis invalidateScheduleCache error:",
            error.message
        );
    }
};


// ======================================================
// EVENT RULES CACHE
// ======================================================

export const cacheEventRules = async (
    rules,
    rulesVisible,
    eventId
) => {
    try {
        const redis = await getRedisClient();

        const key = `event:${eventId}:rules`;

        await redis.set(
            key,
            JSON.stringify({
                rules,
                rulesVisible
            }),
            {
                EX: 60 * 60
            }
        );

    } catch (error) {
        console.error(
            "Redis cacheEventRules error:",
            error.message
        );
    }
};


// ======================================================
// EVENT INFO CACHE
// ======================================================

export const cacheEventInfo = async (eventId, info) => {
    try {
        const redis = await getRedisClient();

        const key = `event:${eventId}:info`;

        await redis.set(
            key,
            JSON.stringify(info),
            {
                EX: 60 * 60
            }
        );

    } catch (error) {
        console.error(
            "Redis cacheEventInfo error:",
            error.message
        );
    }
};


// ======================================================
// EVENT DATA CACHE
// ======================================================

export const cacheEventData = async (
    eventId,
    eventData,
    ttl = 300
) => {
    try {
        const redis = await getRedisClient();

        const key = `event:${eventId}:data`;

        await redis.setEx(
            key,
            ttl,
            JSON.stringify(eventData)
        );

    } catch (error) {
        console.error(
            "Redis cacheEventData error:",
            error.message
        );
    }
};


export const getCachedEventData = async (eventId) => {
    try {
        const redis = await getRedisClient();

        const key = `event:${eventId}:data`;

        const data = await redis.get(key);

        return data ? JSON.parse(data) : null;

    } catch (error) {
        console.error(
            "Redis getCachedEventData error:",
            error.message
        );

        return null;
    }
};


// ======================================================
// REGISTRATION COUNT CACHE
// ======================================================

export const cacheRegistrationCount = async (
    eventId,
    count,
    ttl = 60
) => {
    try {
        const redis = await getRedisClient();

        const key =
            `event:${eventId}:registration_count`;

        await redis.setEx(
            key,
            ttl,
            String(count)
        );

    } catch (error) {
        console.error(
            "Redis cacheRegistrationCount error:",
            error.message
        );
    }
};


export const getCachedRegistrationCount = async (
    eventId
) => {
    try {
        const redis = await getRedisClient();

        const key =
            `event:${eventId}:registration_count`;

        const count = await redis.get(key);

        return count !== null
            ? parseInt(count, 10)
            : null;

    } catch (error) {
        console.error(
            "Redis getCachedRegistrationCount error:",
            error.message
        );

        return null;
    }
};


// ======================================================
// USER EVENT REGISTRATION CACHE
// ======================================================

export const cacheUserEventRegistration = async (
    email,
    eventId,
    registrationId,
    ttl = 600
) => {
    try {
        const redis = await getRedisClient();

        const key =
            `registration:${email}:${eventId}`;

        await redis.setEx(
            key,
            ttl,
            JSON.stringify({
                _id: registrationId,
                email,
                event: eventId
            })
        );

    } catch (error) {
        console.error(
            "Redis cacheUserEventRegistration error:",
            error.message
        );
    }
};


export const getCachedUserEventRegistration = async (
    email,
    eventId
) => {
    try {
        const redis = await getRedisClient();

        const key =
            `registration:${email}:${eventId}`;

        const data = await redis.get(key);

        return data ? JSON.parse(data) : null;

    } catch (error) {
        console.error(
            "Redis getCachedUserEventRegistration error:",
            error.message
        );

        return null;
    }
};


// ======================================================
// EVENT TEAMS CACHE
// ======================================================

export const cacheEventTeams = async (
    eventId,
    teamsData,
    ttl = 120
) => {
    try {
        const redis = await getRedisClient();

        const key = `event:${eventId}:teams`;

        await redis.setEx(
            key,
            ttl,
            JSON.stringify(teamsData)
        );

    } catch (error) {
        console.error(
            "Redis cacheEventTeams error:",
            error.message
        );
    }
};


export const getCachedEventTeams = async (eventId) => {
    try {
        const redis = await getRedisClient();

        const key = `event:${eventId}:teams`;

        const data = await redis.get(key);

        return data ? JSON.parse(data) : null;

    } catch (error) {
        console.error(
            "Redis getCachedEventTeams error:",
            error.message
        );

        return null;
    }
};


// ======================================================
// USER REGISTRATIONS CACHE
// ======================================================

export const cacheUserRegistrations = async (
    userId,
    registrationsData,
    ttl = 300
) => {
    try {
        const redis = await getRedisClient();

        const key =
            `user:${userId}:registrations`;

        await redis.setEx(
            key,
            ttl,
            JSON.stringify(registrationsData)
        );

    } catch (error) {
        console.error(
            "Redis cacheUserRegistrations error:",
            error.message
        );
    }
};


export const getCachedUserRegistrations = async (
    userId
) => {
    try {
        const redis = await getRedisClient();

        const key =
            `user:${userId}:registrations`;

        const data = await redis.get(key);

        return data ? JSON.parse(data) : null;

    } catch (error) {
        console.error(
            "Redis getCachedUserRegistrations error:",
            error.message
        );

        return null;
    }
};


// ======================================================
// INVALIDATE EVENT REGISTRATION CACHE
// ======================================================

export const invalidateEventRegistrationCache = async (
    eventId
) => {
    try {
        const redis = await getRedisClient();

        const patterns = [
            `event:${eventId}:data`,
            `event:${eventId}:registration_count`,
            `event:${eventId}:teams`,
            `registration:*:${eventId}`
        ];

        for (const pattern of patterns) {

            let cursor = "0";

            do {
                const result = await redis.scan(cursor, {
                    MATCH: pattern,
                    COUNT: 100
                });

                cursor = result.cursor;

                if (result.keys.length > 0) {
                    await redis.del(result.keys);
                }

            } while (cursor !== "0");
        }

    } catch (error) {
        console.error(
            "Redis invalidateEventRegistrationCache error:",
            error.message
        );
    }
};


// ======================================================
// INVALIDATE USER REGISTRATION CACHE
// ======================================================

export const invalidateUserRegistrationCache = async (
    userId
) => {
    try {
        const redis = await getRedisClient();

        const key =
            `user:${userId}:registrations`;

        await redis.del(key);

    } catch (error) {
        console.error(
            "Redis invalidateUserRegistrationCache error:",
            error.message
        );
    }
};