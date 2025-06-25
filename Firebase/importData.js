import admin from "firebase-admin";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read service account JSON manually
const serviceAccountPath = path.join(__dirname, "/serviceAccountKey.json");

const serviceAccount = JSON.parse(await fs.readFile(serviceAccountPath, "utf-8"));

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Define what to import
const fileMappings = [
  { file: "users.json", collection: "users", subcollection: false },
  { file: "orders.json", collection: "orders", subcollection: false },
  { file: "shippingAddress.json", collection: "shippingAddress", subcollection: false },
  { file: "reviews.json", collection: "products", subcollection: "reviews" } // subcollection under products
];

const importData = async () => {
  for (const { file, collection, subcollection } of fileMappings) {
    const filePath = path.join(__dirname, "../public", file)

    try {
      const rawData = await fs.readFile(filePath, "utf-8");
      let parsed = JSON.parse(rawData);
const dataArray = Array.isArray(parsed) ? parsed : Object.values(parsed)[0];


      if (!Array.isArray(dataArray)) {
        console.error(`❌ ${file} must be an array of objects`);
        continue;
      }

      console.log("Looking for:", filePath);

      console.log(`📤 Importing ${dataArray.length} items from '${file}'...`);

      for (const item of dataArray) {
        const { id, ...rest } = item;
        const docId = id || crypto.randomUUID();

        try {
          if (subcollection && item.productId) {
            const parentId = item.productId;
            await db
              .collection(collection)
              .doc(parentId)
              .collection(subcollection)
              .doc(docId)
              .set(rest);
            console.log(`✅ /${collection}/${parentId}/${subcollection}/${docId}`);
          } else {
            await db.collection(collection).doc(docId).set(rest);
            console.log(`✅ /${collection}/${docId}`);
          }
        } catch (error) {
          console.error(`❌ Failed to import ${collection}/${docId}:`, error.message);
        }
      }

    } catch (error) {
      console.error(`❌ Error reading/parsing ${file}:`, error.message);
    }
  }
  

  console.log("\n🎉 All data imported.");
};

importData().catch((err) => {
  console.error("🔥 Import script failed:", err.message);
});
