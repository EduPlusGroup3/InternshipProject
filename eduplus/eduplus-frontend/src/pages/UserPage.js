// Import the necessary Firebase database functions
import { getDatabase, ref, get } from "firebase/database";

// Create a function to fetch user profile data from Firebase
export const fetchUserProfileData = async (uid) => {
  const database = getDatabase();
  const userRef = ref(database, `Users/${uid}`);
  try {
    const userSnapshot = await get(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      console.log("Fetched user data:", userData); // Log the fetched data
      return {
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        country: userData.country || "",
        region: userData.region || "",
        gender: userData.gender || "",
      };
    }
  } catch (error) {
    console.error("Error fetching user profile data:", error);
  }
  return null; // Return null if data retrieval fails
};
