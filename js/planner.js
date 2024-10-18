// 모든 planner-grid 요소들을 가져옴
const plannerGrids = document.querySelectorAll('[id^="planner-grid-"]');

// 각 planner-grid에 대해 동작 수행
plannerGrids.forEach((grid, index) => {
    // 6개의 hour <div>를 만들고 추가
    for (let i = 0; i < 6; i++) {
        const hourDiv = document.createElement('div');
        hourDiv.classList.add('hour');  // 'hour' 클래스를 추가
        hourDiv.textContent = ``;  // div에 텍스트로 hour 번호 추가
        grid.appendChild(hourDiv);  // planner-grid의 하위에 div 추가
    }
});
