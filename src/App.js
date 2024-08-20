import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaUmbrellaBeach, FaMountain, FaCoffee, FaUtensils, FaArrowRight } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

const CategoryIcon = ({ Icon, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-1">
      <Icon className="text-lg text-blue-500" />
    </div>
    <span className="text-xs font-medium text-gray-700">{label}</span>
  </div>
);

const JejuTravelPlanner = () => {
  useEffect(() => {
    // 카카오 SDK 스크립트를 동적으로 추가
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('7d5fc3d9813c4b9ec915513d2054e8f6'); // 여기서 YOUR_JAVASCRIPT_KEY를 실제 키로 대체하세요
      }
    };
    document.body.appendChild(script);

    // 클린업 함수로 스크립트를 제거 (컴포넌트 언마운트 시)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleKakaoLogin = () => {
    if (window.Kakao) {
      window.Kakao.Auth.login({
        success: function (authObj) {
          console.log(authObj);
          // 로그인 성공 시, 원하는 동작을 여기에 추가합니다.
        },
        fail: function (err) {
          console.error(err);
        },
      });
    }
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      {/* 메인 컨텐츠 */}
      <animated.div style={fadeIn} className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md md:max-w-lg lg:max-w-xl relative z-10 p-6">
        <div className="p-6">
          <img src="/logo200.png" alt="Logo" className="h-40 mb-5 mx-auto" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-800 text-center">제주도 여행 플래너</h1>
          <p className="text-sm md:text-base lg:text-lg mb-6 text-gray-600 text-center">친구들과 함께 제주도 여행을 계획해보세요!</p>
          
          <button
            onClick={handleKakaoLogin}
            className="bg-orange-500 text-white px-6 py-3 rounded-full text-sm md:text-base lg:text-lg font-semibold shadow-lg hover:bg-yellow-400 transition duration-300 w-full flex items-center justify-center"
          >
            <RiKakaoTalkFill className="mr-2 text-lg" /> 카카오톡으로 계속하기
          </button>
        </div>

        <div className="flex justify-between px-6 py-4 bg-gray-100">
          <CategoryIcon Icon={FaUmbrellaBeach} label="해변" />
          <CategoryIcon Icon={FaMountain} label="관광지" />
          <CategoryIcon Icon={FaCoffee} label="카페" />
          <CategoryIcon Icon={FaUtensils} label="맛집" />
        </div>

        <div className="p-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-gray-800 text-center">제주 여행의 모든 것</h2>
          <ul className="text-sm md:text-base lg:text-lg space-y-2">
            <li className="flex items-center">
              <FaArrowRight className="text-green-500 mr-2" /> 알잘딱 맞춤 일정 추천
            </li>
            <li className="flex items-center">
              <FaArrowRight className="text-green-500 mr-2" /> 숨은 명소 추천
            </li>
            <li className="flex items-center">
              <FaArrowRight className="text-green-500 mr-2" /> 빅데이터 기반 맛집, 카페
            </li>
          </ul>
        </div>
      </animated.div>
    </div>
  );
};

export default JejuTravelPlanner;
