// models/Project.js
const { MongoClient } = require('mongodb');

class Project {
    constructor() {
        this.client = new MongoClient('mongodb://localhost:27017');
        this.collectionName = 'project';
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db('bourse');
            this.collection = this.db.collection(this.collectionName);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    async addProject(projectData) {
        try {
            const result = await this.collection.insertOne(projectData);
            if (result.insertedCount === 1) {
                console.log('Project added:', result.ops[0]);
                return result.ops[0];
            } else {
                throw new Error('Failed to add project');
            }
        } catch (error) {
            console.error('Error adding project:', error);
            throw error;
        }
    }
    
    
    async getAllProjects() {
        try {
            const projects = await this.collection.find({}).toArray();
            return projects;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }
}

module.exports = Project;
