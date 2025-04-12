var chartData = [];
var num;
httpReqAndCreateChart();

function httpReqAndCreateChart() {
  const Http = new XMLHttpRequest();
  const url =
    "http://sed-smarthome.ir/SmartGarden/websiteFiles/php/getHumidity.php";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    // console.log(Http.responseText);
    chartData = JSON.parse(Http.responseText);
    num = chartData[1]?.map(Number);
    // console.log("dates " + chartData[0]);
    // console.log(num);
    createChart();
  };
}

function createChart() {
  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData[0],
      datasets: [
        {
          label: "# of Votes",
          data: num,
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
          min: 0, // Set the minimum value for the Y-axis
          max: 100,
        },
      },
    },
  });
}
