window.onload = function () {
  // Example usage
  let levelOne = numberOfCorrectAnswerForEachQuestion(1);
  let levelTwo = numberOfCorrectAnswerForEachQuestion(2);

  function generateDataPoints(levelData, type) {
    let dataPoints = [];
    let index = 1;
    for (let question in levelData) {
      if (levelData.hasOwnProperty(question)) {
        let value = levelData[question][type];
        dataPoints.push({
          label: `q${index++}`,
          y: value,
          color: type === 'correct' ? '#379ae6' : 'red',
        });
      }
    }
    return dataPoints;
  }

  var chart1 = new CanvasJS.Chart('chartContainer1', {
    animationEnabled: true,
    title: {
      text: 'Level one',
      textColor: '#379ae6',
    },
    axisX: {
      // lineThickness: 0,
      // tickThickness: 0,
      // valueFormatString: " ",
    },
    axisY: {
      // title: "Billions of Barrels",
      color: '#379ae6',
      maximum: 50,
      titleFontColor: '#379ae6',
      lineColor: '#379ae6',
      labelFontColor: '#379ae6',
      tickColor: '#379ae6',
    },
    axisY2: {
      // title: "Millions of Barrels/day",
      maximum: 50,
      lineThickness: 0,
      tickThickness: 0,
      // valueFormatString: " ", //space
      titleFontColor: 'red',
      lineColor: 'red',
      labelFontColor: 'red',
      tickColor: 'red',
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: 'column',
        name: 'right answers',
        legendText: 'right answers',
        showInLegend: true,
        dataPoints: generateDataPoints(levelOne, 'correct'),
      },
      {
        type: 'column',
        name: 'wrong answers',
        legendText: 'wrong answers',
        axisYType: 'secondary',
        showInLegend: true,
        dataPoints: generateDataPoints(levelOne, 'wrong'),
      },
    ],
  });

  chart1.render();

  var chart2 = new CanvasJS.Chart('chartContainer2', {
    animationEnabled: true,
    title: {
      text: 'Level two',
      textColor: '#379ae6',
    },
    axisX: {
      // lineThickness: 0,
      // tickThickness: 0,
      // valueFormatString: " ",
    },
    axisY: {
      // title: "Billions of Barrels",
      color: '#379ae6',
      maximum: 50,
      titleFontColor: '#379ae6',
      lineColor: '#379ae6',
      labelFontColor: '#379ae6',
      tickColor: '#379ae6',
    },
    axisY2: {
      // title: "Millions of Barrels/day",
      maximum: 50,
      lineThickness: 0,
      tickThickness: 0,
      // valueFormatString: " ", //space
      titleFontColor: 'red',
      lineColor: 'red',
      labelFontColor: 'red',
      tickColor: 'red',
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: 'column',
        name: 'right answers',
        legendText: 'right answers',
        showInLegend: true,
        dataPoints: generateDataPoints(levelTwo, 'correct'),
      },
      {
        type: 'column',
        name: 'wrong answers',
        legendText: 'wrong answers',
        axisYType: 'secondary',
        showInLegend: true,
        dataPoints: generateDataPoints(levelTwo, 'wrong'),
      },
    ],
  });

  chart2.render();

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart1.render();
    chart2.render();
  }
  let hardest = analyzeQuestions();

  //hardestQuestion for both level one and two
  document.getElementById('lvl1-hardest-id').innerText =
    hardest.mostWrongQuestionIdLevel1;
  document.getElementById('lvl1-hardest-count').innerText =
    hardest.maxWrongCountLevel1;
  document.getElementById('lvl2-hardest-id').innerText =
    hardest.mostWrongQuestionIdLevel2;
  document.getElementById('lvl2-hardest-count').innerText =
    hardest.maxWrongCountLevel2;
  //most easy
  document.getElementById('lvl1-easiest-id').innerText =
    hardest.mostCorrectQuestionIdLevel1;
  document.getElementById('lvl1-easiest-count').innerText =
    hardest.maxCorrectCountLevel1;
  document.getElementById('lvl2-easiest-id').innerText =
    hardest.mostCorrectQuestionIdLevel2;
  document.getElementById('lvl2-easiest-count').innerText =
    hardest.maxCorrectCountLevel2;

  //longest question
  let {
    longestTime: longestTimeLvl1,
    longestQuestionId: longestQuestionIdLvl1,
  } = logestQuestion(1);
  let {
    longestTime: longestTimeLvl2,
    longestQuestionId: longestQuestionIdLvl2,
  } = logestQuestion(2);
  document.getElementById('lvl1-longest-id').innerText = longestQuestionIdLvl1;
  document.getElementById('lvl1-longest-time').innerText = longestTimeLvl1;
  document.getElementById('lvl2-longest-id').innerText = longestQuestionIdLvl2;
  document.getElementById('lvl2-longest-time').innerText = longestTimeLvl2;
};
