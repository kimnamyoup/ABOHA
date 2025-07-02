import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Sbutton from "../component/Sbutton";
import "../css/choice.css"
import { useUserData } from "../../contexts";

const Choice3 = () => {
  const navigate = useNavigate();
  const {saveValues}=useUserData();
  const question = [
    {
      key: "three",
      opts: [
        { value: "success", label: "성공 · 성취" },
        { value: "family", label: "가족 · 인간관계" },
        { value: "dependency", label: "자유 · 독립" },
        { value: "stable", label: "안정 · 안전" },
        { value: "growth", label: "개인적 성장" },
        { value: "happy", label: "즐거움 · 행복" },
        { value: "free", label: "자유 · 독립" },
        { value: "mean", label: "기여 · 의미" },
        { value: "wisdom", label: "지식 · 지혜" },
        { value: "care", label: "인정 · 존중" },
      ],
    },
  ];

  const [answers, setAnswer] = useState(
    question.reduce((acc, q) => ({ ...acc, [q.key]: [] }), {})
  );

  const toggleSelect = (qkey, val) => {
    setAnswer((prev) => {
      const arr = prev[qkey];
      const has = arr.includes(val);
      return {
        [qkey]: has ? arr.filter((x) => x !== val) : [val],
      };
    });
  };

  const makeGrouped = () => {
    return question.map((q) => ({
      key: q.key,
      select: q.opts
        .filter((opt) => answers[q.key].includes(opt.value))
        .map((opt) => ({ value: opt.value, label: opt.label })),
    }));
  };
  const downJson = () => {
    const grouped = makeGrouped();
    const json = JSON.stringify(grouped, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const herf = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = herf;
    link.download = "grouped-answers.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(herf);
  };

  const handleNext = (e) => {
    const groupedData= makeGrouped();
    // downJson();
    saveValues(groupedData);
    navigate("/start");
  };

  const handlebefore = (e) => {
    navigate("/Choice2");
  };
  const dotRoutes = ["/choice1", "/choice2", "/choice3", "/start"];
  return (
    <div className="select3">
      <div className="progress_bar">
        <div className="cur_bar3" />
      </div>
      <div className="quebox">
        <h2 className="question">당신의 가치관을 알려주세요</h2>
        <p className="sub">선택지를 보고 가치관을 선택해주세요</p>
      </div>

      <div className="s_main">
        {question.map((q) => (
          <div key={q.key} className="question-block">
            <div className="btns">
              {q.opts.map((opt) => (
                <Sbutton
                  key={opt.value}
                  active={answers[q.key].includes(opt.value)}
                  onClick={() => {
                    toggleSelect(q.key, opt.value);
                    console.log(q.key, opt.value);
                  }}
                >
                  {opt.label}
                </Sbutton>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="next-wrapper">
        <button className="next-btn" onClick={handleNext}>
          다음 <FaArrowRight className="nb" />
        </button>
      </div>

      <button className="before-btn" onClick={handlebefore}>
        <FaArrowLeft className="nb" /> 이전{" "}
      </button>
      <div className="pogressdot">
        {dotRoutes.map((path, idx) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) => (isActive ? "dot active" : "dot")}
          />
        ))}
      </div>
    </div>
  );
};

export default Choice3;
