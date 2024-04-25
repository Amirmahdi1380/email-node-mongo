// models/User.js
const { MongoClient } = require('mongodb');

class User {
    constructor() {
        this.client = new MongoClient('mongodb://localhost:27017');
        this.collectionName = 'Auth';
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db('Email');
            this.collection = this.db.collection(this.collectionName);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            const result = await this.collection.insertOne(userData);
            console.log(result);
            if (result.acknowledged == true) {
                console.log('User created:', result.insertedId);
                return result.insertedId;
            } else {
                throw new Error('Failed to create user');
            }            
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    
    async getUserByEmailAndPassword(email, password) {
        try {
            const user = await this.collection.aggregate([
                {
                    $match: {
                        email: email,
                        password: password
                    }
                }
            ]).toArray();

            return user[0];
        } catch (error) {
            console.error('Error getting user:', error);
            throw error;
        }
    }
}

module.exports = User;
