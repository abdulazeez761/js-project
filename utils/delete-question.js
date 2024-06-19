function deleteLevelQuestion(l, QID) {
  if (l == 1) {
    let level = "level-one";
    let levelData = JSON.parse(localStorage.getItem(level));
    console.log(levelData);
    delete levelData[QID];
    localStorage.setItem(level, JSON.stringify(levelData));
  } else {
    let level = "level-two";
    let levelData = JSON.parse(localStorage.getItem(level));

    delete levelData[QID];
    localStorage.setItem(level, JSON.stringify(levelData));
  }
}
