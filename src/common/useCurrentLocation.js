import {useEffect, useState} from "react";

const useCurrentLocation = (options = {}) => {
  // 파라미터에 옵션을 따로 넣을 수 있도록 구성
  const [testLocation, setLocation] = useState();
  const [error, setError] = useState();

  const handleSuccess = () => {
    // 초기에는 newAccuracy를 0으로 설정
    let newAccuracy = 0;

    const intervalId = setInterval(() => {
      // 1초에 한 번식 위치를 요청하고 정확도 확인
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude, accuracy } = location.coords;
          newAccuracy = accuracy;
          // 정확도가 25 이하일 때 위치 설정 및 interval 종료
          if (accuracy <= 25) {
            setLocation({ latitude, longitude, accuracy });
            clearInterval(intervalId);
          }
        },
        () => {
          setError("Local navigation failed.");
          clearInterval(intervalId);
        }
      );
    }, 1000); // 1초에 한 번씩 위치 요청

    // intervalId 반환하여 컴포넌트가 언마운트되면 interval 정리
    return intervalId;
  };
  // 위치를 가져오는 것에 성공하면 좌표 저장

  const handleError = () => {
    setError("Local navigation failed.");
  };
// 실패시 에러 메세지 지정

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }
    // geolocation을 실행하는 것 자체를 실패할 경우 에러 메세지 지정

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, [options]);
// geolocaition 을 한 번 실행, option값이 바뀔 경우 재실행.

  return { testLocation, error };
};

export default useCurrentLocation;