import { getDatabase, ref, get } from "firebase/database";

// Function to fetch user profile data from Firebase
export const fetchUserProfileData = async (uid, role) => {
  const database = getDatabase();
  //const userRef = ref(database, `users/${uid}`);

  
  //enable below logic once will have role here
  let userRef ;
  switch(role)
  {
    case "student" :
      userRef = ref(database, `child/${uid}`);
      break;
    case "instructor" :
      userRef = ref(database, `users/faculty/${uid}`);
      break;
    default:
      userRef = ref(database, `users/${uid}`);
      break;      
  }
  
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
        child: userData.child || {}, // Assuming child is an object
        courseUids: userData.courseUids || {},  // Assuming courses is an object
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
