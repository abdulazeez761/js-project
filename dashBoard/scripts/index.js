window.onload = function () {
  var chart1 = new CanvasJS.Chart("chartContainer1", {
    animationEnabled: true,
    title: {
      text: "Level one",
      textColor: "#379ae6",
    },
    axisX: {
      // lineThickness: 0,
      // tickThickness: 0,
      // valueFormatString: " ",
    },
    axisY: {
      // title: "Billions of Barrels",
      color: "#379ae6",
      maximum: 50,
      titleFontColor: "#379ae6",
      lineColor: "#379ae6",
      labelFontColor: "#379ae6",
      tickColor: "#379ae6",
    },
    axisY2: {
      // title: "Millions of Barrels/day",
      maximum: 50,
      lineThickness: 0,
      tickThickness: 0,
      // valueFormatString: " ", //space
      titleFontColor: "red",
      lineColor: "red",
      labelFontColor: "red",
      tickColor: "red",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: "column",
        name: "right answers ",
        legendText: "right answers",
        showInLegend: true,
        dataPoints: [
          { label: "q1", y: 13, color: "#379ae6" },
          { label: "q2", y: 24, color: "#379ae6" },
          { label: "q3", y: 19, color: "#379ae6" },
          { label: "q4", y: 33, color: "#379ae6" },
          { label: "q5", y: 27, color: "#379ae6" },
          { label: "q6", y: 44, color: "#379ae6" },
          { label: "q7", y: 9, color: "#379ae6" },
          { label: "q8", y: 22, color: "#379ae6" },
          { label: "q9", y: 37, color: "#379ae6" },
          { label: "q10", y: 15, color: "#379ae6" },
          { label: "q11", y: 22, color: "#379ae6" },
          { label: "q12", y: 38, color: "#379ae6" },
        ],
      },

      {
        type: "column",
        name: "wrong answers",
        legendText: "wrong answers",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: [
          { label: "q1", y: 10, color: "red" },
          { label: "q2", y: 2, color: "red" },
          { label: "q3", y: 3, color: "red" },
          { label: "q4", y: 4, color: "red" },
          { label: "q5", y: 7, color: "red" },
          { label: "q6", y: 31, color: "red" },
          { label: "q7", y: 10, color: "red" },
          { label: "q8", y: 8, color: "red" },
          { label: "q9", y: 11, color: "red" },
          { label: "q10", y: 17, color: "red" },
          { label: "q11", y: 21, color: "red" },
          { label: "q12", y: 18, color: "red" },
        ],
      },
    ],
  });
  chart1.render();
  var chart2 = new CanvasJS.Chart("chartContainer2", {
    animationEnabled: true,
    title: {
      text: "Level one",
      textColor: "#379ae6",
    },
    axisX: {
      // lineThickness: 0,
      // tickThickness: 0,
      // valueFormatString: " ",
    },
    axisY: {
      // title: "Billions of Barrels",
      color: "#379ae6",
      maximum: 50,
      titleFontColor: "#379ae6",
      lineColor: "#379ae6",
      labelFontColor: "#379ae6",
      tickColor: "#379ae6",
    },
    axisY2: {
      // title: "Millions of Barrels/day",
      maximum: 50,
      lineThickness: 0,
      tickThickness: 0,
      // valueFormatString: " ", //space
      titleFontColor: "red",
      lineColor: "red",
      labelFontColor: "red",
      tickColor: "red",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: "column",
        name: "right answers ",
        legendText: "right answers",
        showInLegend: true,
        dataPoints: [
          { label: "q1", y: 13, color: "#379ae6" },
          { label: "q2", y: 24, color: "#379ae6" },
          { label: "q3", y: 19, color: "#379ae6" },
          { label: "q4", y: 33, color: "#379ae6" },
          { label: "q5", y: 27, color: "#379ae6" },
          { label: "q6", y: 44, color: "#379ae6" },
          { label: "q7", y: 9, color: "#379ae6" },
          { label: "q8", y: 22, color: "#379ae6" },
          { label: "q9", y: 37, color: "#379ae6" },
          { label: "q10", y: 15, color: "#379ae6" },
          { label: "q11", y: 22, color: "#379ae6" },
          { label: "q12", y: 38, color: "#379ae6" },
        ],
      },

      {
        type: "column",
        name: "wrong answers",
        legendText: "wrong answers",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: [
          { label: "q1", y: 10, color: "red" },
          { label: "q2", y: 2, color: "red" },
          { label: "q3", y: 3, color: "red" },
          { label: "q4", y: 4, color: "red" },
          { label: "q5", y: 7, color: "red" },
          { label: "q6", y: 31, color: "red" },
          { label: "q7", y: 10, color: "red" },
          { label: "q8", y: 8, color: "red" },
          { label: "q9", y: 11, color: "red" },
          { label: "q10", y: 17, color: "red" },
          { label: "q11", y: 21, color: "red" },
          { label: "q12", y: 18, color: "red" },
        ],
      },
    ],
  });
  chart2.render();

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart1.render();
    chart2.render();
  }
};
