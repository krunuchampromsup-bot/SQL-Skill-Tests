// คลังข้อสอบทั้งหมด
const allQuestions = [
  {
    id: 1,
    question: "สร้าง VIEW view_student_score",
    score: 10,
    check: function (db) {
      let r = db.exec(
        "SELECT name FROM sqlite_master WHERE type='view' AND name='view_student_score';"
      );
      return r.length > 0;
    }
  },

  {
    id: 2,
    question: "แสดงข้อมูลจาก view_student_score",
    score: 10,
    check: function (db) {
      try {
        let r = db.exec("SELECT * FROM view_student_score;");
        return r[0].values.length > 0;
      } catch (e) {
        return false;
      }
    }
  },

  {
    id: 3,
    question: "เลือกข้อมูลคะแนนมากกว่า 85",
    score: 10,
    check: function (db) {
      try {
        let r = db.exec(
          "SELECT * FROM view_student_score WHERE score > 85;"
        );
        return r[0].values.length > 0;
      } catch (e) {
        return false;
      }
    }
  }
];

// ================================
// สุ่มข้อสอบ (เช่น สุ่ม 2 ข้อ)
// ================================
const questions = [...allQuestions]
  .sort(() => 0.5 - Math.random())
  .slice(0, 2);
