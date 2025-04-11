// 1. Fetch users and their data when page loads
document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("./server/getUsers.php");
  const users = await response.json();

  const container = document.getElementById("container");

  users.forEach((user) => {
    // create weight box div

    const weightBox = document.createElement("div");
    weightBox.className = "weight_box";
    weightBox.dataset.userId = user.id;

    container.appendChild(weightBox);
  });
});
