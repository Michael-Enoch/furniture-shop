import admin from "firebase-admin";
import { createRequire } from 'module';
import fs from 'fs';


const require = createRequire(import.meta.url);
const serviceAccount = require('./Firebase/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-furniture-project-b0011-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore();
const data = JSON.parse(fs.readFileSync("./Firebase/furniture_database_50_products.json", "utf8"));

async function importData() {
  for (const [collectionName, docs] of Object.entries(data)) {
    for (const [docId, doc] of Object.entries(docs)) {
      await db.collection(collectionName).doc(docId).set(doc);
      console.log(`✅ Imported ${collectionName}/${docId}`);
    }
  }
  console.log("🎉 All data imported successfully!");
}

importData().catch(console.error);
