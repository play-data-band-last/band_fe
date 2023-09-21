export function saveToLocalStorage(data) {
  const maxItems = 10; // 최대 항목 수

  // 로컬 스토리지에서 저장된 항목 불러오기
  let storedData = JSON.parse(localStorage.getItem('storedData')) || [];

  // 새로운 데이터 추가
  storedData.unshift(data);

  // 최대 항목 수를 초과하는 경우 가장 오래된 항목 제거
  if (storedData.length > maxItems) {
    storedData.pop();
  }

  // 로컬 스토리지에 저장
  localStorage.setItem('storedData', JSON.stringify(storedData));
}