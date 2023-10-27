const positionOptions = {
  maximumAge: 0,
  // 뭔지 잘 모르겠다. MDN에서 5번 읽었는데 외계어 같다. 구글링 해봐도 잘 모르겠다.
  timeout: 5000,
  // 위치를 찾기 위해 최대 몇 ms를 소모할 것인가? 만약 infinity로 설정한다면 위치 정보를 받아오기 전까
  // 지는 아무 것도 반환하지 않는다.
  enableHighAccuracy: true,
  // 더 정밀한 위치 추적을 할 것인가? 다만 사용 시 시간 지연이나 배터리 사용량이 증가될 수있음.
  // 이거 켜도 전혀 정밀하지 않은데 끄면 얼마나 이상한 위치에 보내놓을 지 모름. 무조건 켜도록 하자.
};

export default positionOptions;