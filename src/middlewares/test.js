const { BadRequest } = require("../core/error.response")
const e = require('express');
const db = require('../dbs/init.postgresdb');
const redis = require('redis')
const {getRedis} = require('../configs/config.redis')
const _ = require('lodash')

const {
    instanceConnect:redisClient
} = getRedis()

class Test {

    static async getSeats(){
        const query = 'SELECT * FROM bookings.seats';
        const res = await db.pool.query(query);
        return res.rows;
    }
    static async getSeatById(id){
        const query = 'SELECT * FROM bookings.seats WHERE id = $1';
        const res = await db.pool.query(query,[id]);
        return res.rows;
    }
    // cache và database khác nhau về dữ liệu
    // update cache trước update datbase sau
    static async updateSeatById(id, data){
        redisClient.set(id, JSON.stringify(data))
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        const query = 'UPDATE bookings.bookings SET book_date = $1, total_amount = $2 WHERE id = $3';
        const res = await db.pool.query(query,[formattedDate, data.total_amount, id]);
    }

    //update cache sau update database trước
    static async updateSeatByIdThen(id, data){
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        const query = 'UPDATE bookings.bookings SET book_date = $1, total_amount = $2 WHERE id = $3';
        const res = await db.pool.query(query,[formattedDate, data.total_amount, id]);
        redisClient.set(id, JSON.stringify(data))
        
    }


    // write around (update trước delete sau)
    static async deleteSeatById(id) {
        redisClient.del(id);
    }

    // read aside (đọc cache -> cache miss -> đọc database -> update cache)
    static async getSeatByIdWithCache(id) {
        const cachedData = await redisClient.get(id);
        if (cachedData) {
            return JSON.parse(cachedData);
        } else {
            const query = 'SELECT * FROM bookings.seats WHERE aircraft_code = $1';
            const res = await db.pool.query(query, [id]);
            const data = res.rows;
            redisClient.set(id, JSON.stringify(data));

            return {
                data,cache:redisClient.get(id)
            };
        }
    }

    static async WADRA(id){
        this.deleteSeatById(id);
        const data=  this.getSeatByIdWithCache(id);
        return data
    }
    

}


module.exports = Test