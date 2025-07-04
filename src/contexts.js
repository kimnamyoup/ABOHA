import React, { createContext, useCallback, useContext, useState, useEffect } from "react";

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

  const [userData, setUserData] = useState(() => {
    try {
      const savedUserData = sessionStorage.getItem('userData');
      return savedUserData ? JSON.parse(savedUserData) : { personality: [], hobbies: [], values: [] };
    } catch (error) {
      console.error("저장된 사용자 데이터를 불러오는 데 실패했습니다.", error);
      return { personality: [], hobbies: [], values: [] };
    }
  });
  
 
  const [missions, setMissions] = useState(() => {
    try {
      const savedMissions = sessionStorage.getItem('missions');
      return savedMissions ? JSON.parse(savedMissions) : [];
    } catch (error) {
      console.error("저장된 미션을 불러오는 데 실패했습니다.", error);
      return [];
    }
  });

 
  const [completedMissions, setCompletedMissions] = useState(() => {
    try {
      const saved = sessionStorage.getItem('completedMissions');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("저장된 완료 미션을 불러오는 데 실패했습니다.", error);
      return [];
    }
  });

 
  const [refreshCount, setRefreshCount] = useState(() => {
    try {
      const saved = sessionStorage.getItem('refreshCount');
  
      return saved ? parseInt(saved, 10) : 0;
    } catch (error) {
      console.error("저장된 새로고침 횟수를 불러오는 데 실패했습니다.", error);
      return 0;
    }
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    try {
      sessionStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error("사용자 데이터를 저장하는 데 실패했습니다.", error);
    }
  }, [userData]);


  useEffect(() => {
    try {
      sessionStorage.setItem('missions', JSON.stringify(missions));
    } catch (error) {
      console.error("미션을 저장하는 데 실패했습니다.", error);
    }
  }, [missions]);


  useEffect(() => {
    try {
      sessionStorage.setItem('completedMissions', JSON.stringify(completedMissions));
    } catch (error) {
      console.error("완료 미션을 저장하는 데 실패했습니다.", error);
    }
  }, [completedMissions]);

  useEffect(() => {
    try {
      sessionStorage.setItem('refreshCount', refreshCount.toString());
    } catch (error) {
      console.error("새로고침 횟수를 저장하는 데 실패했습니다.", error);
    }
  }, [refreshCount]);

  const setDefaultMissions = () => {
    setMissions([
      { id: 1, title: "오늘 하루 감사한 일 3가지 적기", type: "default" },
      { id: 2, title: "30분 산책하기", type: "default" },
      { id: 3, title: "좋아하는 노래 들으며 휴식하기", type: "default" },
    ]);
  };

  const savePersonality = (data) => setUserData(prev => ({ ...prev, personality: data }));
  const saveHobbies = (data) => setUserData(prev => ({ ...prev, hobbies: data }));
  const saveValues = (data) => setUserData(prev => ({ ...prev, values: data }));

  const generateMissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://8700-112-76-111-231.ngrok-free.app/good", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error(`API 요청 실패: ${res.status}`);
      
      const result = await res.json();
      let rawArray = [];
      if (Array.isArray(result)) {
        rawArray = result;
      } else if (typeof result === 'object' && result !== null) {
        rawArray = Object.keys(result).filter(key => key.startsWith("result")).map(key => result[key]);
      }

      if (rawArray.length === 0) {
        setDefaultMissions();
      } else {
        const formatted = rawArray.map((title, idx) => ({ id: Date.now() + idx, title, type: "test4" }));
        setMissions(formatted);
      }
    } catch (err) {
      console.error("미션 생성 중 오류 발생:", err.message);
      setDefaultMissions();
    } finally {
      setLoading(false);
    }
  }, [userData]);

  const refreshUncompletedMissions = useCallback(async () => {
    setLoading(true);
    try {
      const neededCount = missions.length - completedMissions.length;
      if (neededCount === 0) {
        setLoading(false);
        return;
      }

      const res = await fetch("https://8700-112-76-111-231.ngrok-free.app/good", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error(`API 요청 실패: ${res.status}`);
      const result = await res.json();

      let rawArray = [];
      if (Array.isArray(result)) {
        rawArray = result;
      } else if (typeof result === 'object' && result !== null) {
        rawArray = Object.keys(result).filter(key => key.startsWith("result")).map(key => result[key]);
      }
      
      const currentTitles = missions.map(m => m.title);
      const newAvailableMissions = rawArray.filter(title => !currentTitles.includes(title)).slice(0, neededCount);

      if (newAvailableMissions.length === 0) {
        setLoading(false);
        return; 
      }

      const formattedNewMissions = newAvailableMissions.map((title, idx) => ({ id: Date.now() + idx, title, type: "test4" }));
      const finalMissions = missions.map(mission => completedMissions.includes(mission.id) ? mission : formattedNewMissions.shift() || mission);
      setMissions(finalMissions);

    } catch (err) {
      console.error("미션 갱신 오류:", err.message);
    } finally {
      setLoading(false);
    }
  }, [missions, userData, completedMissions]);

  const value = {
    userData,
    missions,
    loading,
    completedMissions, 
    refreshCount,      
    setCompletedMissions, 
    setRefreshCount,      
    savePersonality,
    saveHobbies,
    saveValues,
    generateMissions,
    refreshUncompletedMissions,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
