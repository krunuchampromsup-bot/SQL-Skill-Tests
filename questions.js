const questions = [
  {
    id: 1,
    question: "สร้าง VIEW ชื่อ view_student_score",
    check: function(db) {
      let r = db.exec(
        "SELECT name FROM sqlite_master WHERE type='view' AND name='view_student_score';"
      );
      return r.length > 0;
    },
    score: 10
  },
  {
    id: 2,
    question: "แสดงข้อมูลจาก view_student_score",
    check: function(db) {
      try {
        let r = db.exec("SELECT * FROM view_student_score;");
        return r[0].values.length > 0;
      } catch {
        return false;
      }
    },
    score: 10
  }
];
