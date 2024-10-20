document.addEventListener('DOMContentLoaded', function() {
    // 로컬 스토리지에서 도토리 포인트를 불러오기
    let acornPoints = localStorage.getItem('acornPoints');

    // 만약 로컬 스토리지에 도토리 포인트가 없으면 기본값(10) 설정
    if (!acornPoints) {
        acornPoints = 10;
        localStorage.setItem('acornPoints', acornPoints);
    } else {
        acornPoints = parseInt(acornPoints, 10);
    }

    // 도토리 포인트를 HTML에 표시
    document.querySelector('.dotory').textContent = acornPoints;
});
