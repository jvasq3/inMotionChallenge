module.exports = {

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/inMotion',
    options: process.env.MONGO_OPTIONS ? JSON.parse(process.env.MONGO_OPTIONS) : {}
  },

  // Seed the database with test users
  seedDB: process.env.SEED || "false"

};
