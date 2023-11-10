import { getDatabase, ref, get } from "firebase/database";

// Function to fetch user profile data from Firebase
export const fetchUserProfileData = async (uid) => {
  const database = getDatabase();
  const userRef = ref(database, `users/${uid}`);

  try {
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      return {
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        country: userData.country || "",
        region: userData.region || "",
        gender: userData.gender || "",
      };
    } else {
      console.error("User data does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data from Firebase:", error);
    throw error; // You may choose to handle the error differently
  }
};
