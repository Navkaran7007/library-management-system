import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

import * as serviceAccount from "./key.json";

// Initialize the Firebase app with the service account credentials
// This step is necessary before you can use any Firebase services
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
// This creates a Firestore instance that you can use to interact with your database
const db: Firestore = getFirestore();

export { db };