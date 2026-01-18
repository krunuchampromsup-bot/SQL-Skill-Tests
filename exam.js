let db, current = 0, totalScore = 0;

initSqlJs({ locateFile: f => f }).then(SQL => {
  db = new SQL.Database();

  db.run(`
    CREATE TABLE student (id INTEGER, name TEXT);
    CREATE TABLE class (id INTEGER, name TEXT);
    CREATE TABLE score (student_id INTEGER, class_id INTEGER, score INTEGER);

    INSERT INTO student VALUES (1,'สมชาย'),(2,'สมหญิง');
    INSERT INTO class VALUES (101,'ฐานข้อมูล');
    INSERT INTO score VALUES (1,101,80),(2,101,90);
  `);

  showQuestion();
});

function showQuestion() {
  document.getElementById("qText").innerText =
    "ข้อ " + (current+1) + ": " + questions[current].question;
}

function submitAnswer() {
  let sql = document.getElementById("sqlInput").value;

  try {
    db.run(sql);
    let correct = questions[current].check(db);

    if (correct) {
      totalScore += questions[current].score;
      document.getElementById("feedback").innerText = "✅ ถูกต้อง";
    } else {
      document.getElementById("feedback").innerText = "❌ ยังไม่ถูกต้อง";
    }

    current++;
    document.getElementById("sqlInput").value = "";

    if (current < questions.length) {
      showQuestion();
    } else {
      localStorage.setItem("sql_score", totalScore);
      window.location = "summary.html";
    }
  } catch {
    document.getElementById("feedback").innerText = "❌ SQL Error";
  }
}
