import React, { createContext, useContext, useState } from "react";

//context 생성
const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

//상태 관리
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    personality: [], // 성향 데이터
    hobbies: [], // 취미 데이터
    values: [], // 가치관 데이터
  });

  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 취미 데이터 저장
  const savePersonality = (data) => {
    setUserData((prev) => ({
      ...prev,
      personality: data,
    }));
  };

  // Choice2 데이터 저장
  const saveHobbies = (data) => {
    setUserData((prev) => ({
      ...prev,
      hobbies: data,
    }));
  };

  // Choice3 데이터 저장
  const saveValues = (data) => {
    setUserData((prev) => ({
      ...prev,
      values: data,
    }));
  };

  // AI 모델에서 미션 생성
  const generateMissions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "api_key_links",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personality: userData.personality,
            hobbies: userData.hobbies,
            values: userData.values,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setMissions(result.missions);
      } else {
        console.error("미션 생성 실패:", result.error);
        // 기본 미션 설정
        setMissions([
          { id:1, title: "오늘 하루 감사한 일 3가지 적기", type:"default" },
          { id:2, title: "30분 산책하기", type:"default" },
        ]);
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 기본 미션 설정
      setMissions([
        { id:1, title: "오늘 하루 감사한 일 3가지 적기", type:"default" },
        { id:2, title: "30분 산책하기", type:"default" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    userData, //선택정보
    missions, //미션들
    loading, //로딩
    savePersonality, //성향저장
    saveHobbies, // 취미저장
    saveValues, //가치관 저장
    generateMissions, //미션 생성
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
