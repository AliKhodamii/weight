chartDates = [];
chartWeights = [];

// fetch data from php
function getWeights() {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    const url = "./server/getWeight.php";
    http.open("GET", url);
    http.send();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
          const weightData = JSON.parse(http.responseText);
          chartWeights = weightData[0];
          chartDates = weightData[1];
          resolve(); // ✅ resolves when data is ready
        } else {
          reject("Failed to fetch weights");
        }
      }
    };
  });
}

// 1. Fetch users and their data when page loads
document.addEventListener("DOMContentLoaded", async function () {
  await getWeights();

  const response = await fetch("./server/getUsers.php");
  const users = await response.json();

  const container = document.getElementById("container");

  const names = { Ali: "علی", Erfan: "عرفان", Zohre: "زهره" };

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
    const canvas = document.createElement("canvas");
    canvas.className = "my-chart";
    canvas.id = "chart" + user.id;
    new Chart(canvas, {
      type: "line",
      data: {
        labels: chartDates[user.id - 1],
        datasets: [
          {
            label: "Weight",
            data: chartWeights[user.id - 1],
            borderWidth: 1,
          },
        ],
      },
      datasets: [
        {
          fill: true,
        },
      ],
      options: {
        responsive: true, // Disable responsiveness
        maintainAspectRatio: false, // Disable aspect ratio
        //   height: 100, // Set the height to 100px
        scales: {
          y: {
            beginAtZero: false, // Start Y-axis at the minimum value
            min: Math.min(...chartWeights[user.id - 1]) - 10, // Set the minimum value for the Y-axis
            max: Math.max(...chartWeights[user.id - 1]) + 10,
          },
        },
      },
    });
    chart.appendChild(canvas);

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
    input.required = true;

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

      fetch("server/insertWeight.php", {
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
