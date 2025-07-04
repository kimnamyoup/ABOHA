import React, { createContext, useContext, useState } from "react";

// context 생성
const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    personality: [],
    hobbies: [],
    values: [],
  });
  

  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 기본 미션 세팅 함수
  const setDefaultMissions = () => {
    setMissions([
      { id: 1, title: "오늘 하루 감사한 일 3가지 적기", type: "default" },
      { id: 2, title: "30분 산책하기", type: "default" },
    ]);
  };

  const savePersonality = (data) => {
    setUserData(prev => ({ ...prev, personality: data }));
  };

  const saveHobbies = (data) => {
    setUserData(prev => ({ ...prev, hobbies: data }));
  };

  const saveValues = (data) => {
    setUserData(prev => ({ ...prev, values: data }));
  };

  const generateMissions = async () => {
    setLoading(true);

    try {


      const res = await fetch("https://8700-112-76-111-231.ngrok-free.app/good", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      console.log("API 응답 결과:", result);


      const rawArray = Object.keys(result)
        .filter((key) => key.startsWith("result"))
        .map((key) => result[key]);

      console.log("추출된 미션 리스트:", rawArray);


      const formatted = result.map((title, idx) => ({
        id: Date.now() + idx,
        title,
        type: "test4",
        
      }));
      setMissions(formatted);
      
    


    } catch (err) {
      console.error("미션 생성 오류:", err.message);
      setDefaultMissions();
    } finally {
      setLoading(false);
    }
  };

  const value = {
    userData,
    missions,
    loading,
    savePersonality,
    saveHobbies,
    saveValues,
    generateMissions,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
