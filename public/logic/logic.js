// 1. Fetch users and their data when page loads
document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("./server/getUsers.php");
  const users = await response.json();

  const container = document.getElementById("container");

  const names = { Ali: "علی", Erfan: "عرفان" };

  users.forEach((user) => {
    // create weightBox div
    const weightBox = document.createElement("div");
    weightBox.className = "weight-box";
    weightBox.dataset.userId = user.id;
    container.appendChild(weightBox);

    // create h1
    const h1 = document.createElement("h1");
    h1.textContent = names[user.name];
    weightBox.appendChild(h1);

    //create chart
    const chart = document.createElement("div");
    chart.className = "chart";
    weightBox.appendChild(chart);

    // create form
    const formDiv = document.createElement("div");
    formDiv.className = "form";

    const form = document.createElement("form");
    form.className = "my-form";
    form.dataset.user = user.id;

    // const hiddenInput = document.createElement("input");
    // hiddenInput.setAttribute("type", "hidden");
    // hiddenInput.setAttribute("name", "user_id");
    // hiddenInput.setAttribute("value", user.id);

    const label = document.createElement("label");
    label.textContent = "وزن به کیلوگرم";

    const input = document.createElement("input");
    input.setAttribute("name", "weight");
    input.setAttribute("type", "number");
    input.setAttribute("step", "0.01");
    input.setAttribute("max", "130");
    input.setAttribute("min", "70");

    const button = document.createElement("button");
    button.textContent = "ثبت";
    button.setAttribute("type", "submit");

    // form.appendChild(hiddenInput);
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);

    formDiv.appendChild(form);

    weightBox.appendChild(formDiv);
  });

  document.querySelectorAll(".my-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // 🚫 Stop default page reload

      const formData = new FormData(form);
      formData.append("user_id", form.dataset.user); // add user_id manually

      // alert(formData);

      fetch("http://sed-smarthome.ir/weight/server/insertWeight.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result); // You can show this in the UI too
          alert("Submitted successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Something went wrong.");
        });
    });
  });
});
