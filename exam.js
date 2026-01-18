let db, current = 0, totalScore = 0;
let examFinished = false;

// ================================
// โหลด SQL.js
// ================================
initSqlJs({
  locateFile: file => `https://sql.js.org/dist/${file}`
}).then(SQL => {

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

// ================================
// แสดงคำถาม
// ================================
function showQuestion() {
  document.getElementById("qText").innerText =
    "ข้อ " + (current + 1) + ": " + questions[current].question;

  document.getElementById("feedback").innerText = "";
}

// ================================
// ส่งคำตอบ
// ================================
function submitAnswer() {
  if (examFinished) return;

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
      finishExam();
    }

  } catch (e) {
    document.getElementById("feedback").innerText = "❌ SQL Error";
  }
}

// ================================
// จบการสอบ
// ================================
function finishExam() {
  examFinished = true;
  localStorage.setItem("sql_score", totalScore);
  window.location = "summary.html";
}

// ================================
// ตัวจับเวลา
// ================================
let timeLeft = 300; // 5 นาที

let timer = setInterval(() => {
  document.getElementById("timer").innerText =
    "⏱ เหลือเวลา: " + timeLeft + " วินาที";

  if (timeLeft <= 0) {
    clearInterval(timer);
    finishExam();
  }

  timeLeft--;
}, 1000);
function finishExam(){
  let record = {
    name: localStorage.getItem("studentName"),
    id: localStorage.getItem("studentId"),
    total: totalScore,
    detail: detailScore,
    time: new Date().toLocaleString()
  };

  let all = JSON.parse(localStorage.getItem("allScores") || "[]");
  all.push(record);
  localStorage.setItem("allScores", JSON.stringify(all));

  window.location = "summary.html";
}

