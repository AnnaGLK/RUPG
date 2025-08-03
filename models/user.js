async function getUser() {
  try {
    const response = await fetch(`https://randomuser.me/api/`);

    if (!response.ok) throw new Error("User not found");
    const data = await response.json();
    const user = data.results[0];

    // console.log(`Found user: ${user.name} (${user.email})`);
    // console.log(user);

    return user;
    
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
}

module.exports = { getUser };