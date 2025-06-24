process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
import { CosmosClient } from "@azure/cosmos";
const cosmosClient = new CosmosClient({
  endpoint: "https://localhost:8081",
  key: "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
});
const { database } = await cosmosClient.databases.createIfNotExists({
  id: "cosmicworks",
  throughput: 400
});
const { container } = await database.containers.createIfNotExists({
  id: "products",
  partitionKey: { kind: "Hash", paths: ["/id"] }
});
const item = {
  id: "2",
  name: "Guitar",
  price: 1500,
  description: "A high-quality acoustic guitar",
  category: "Musical Instruments",
};  
await container.items.upsert(item);
console.log("Item upserted successfully:", item);

