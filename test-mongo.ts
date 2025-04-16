import { MongoClient } from "mongodb";

const uri = "mongodb://puja:puja060106@ac-v426t37-shard-00-00.t00lnwr.mongodb.net:27017,ac-v426t37-shard-00-01.t00lnwr.mongodb.net:27017,ac-v426t37-shard-00-02.t00lnwr.mongodb.net:27017/?replicaSet=atlas-c8ie82-shard-0&ssl=true&authSource=admin";

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");
    await client.close();
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
}

run();
