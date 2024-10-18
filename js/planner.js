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

let randomColor;
setRandomColor();

function setRandomColor(){
    randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// 오늘 날짜를 가져와 .day-title에 표시
function displayCurrentDate() {
    const today = new Date();
    const dayTitleElement = document.querySelector('.day-title');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dayTitleElement.textContent = today.toLocaleDateString('ko-KR', options);
}

// 현재 시간을 가져와 .day-time에 표시
function displayCurrentTime() {
    const now = new Date();
    const dayTimeElement = document.querySelector('.day-time');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    dayTimeElement.textContent = `${hours}:${minutes}`;
}

// study-rectangle 요소들에 대해 랜덤 색상 생성 및 적용
function applyRandomColorsToStudyRectangles() {
    const rectangles = document.querySelectorAll('.study-rectangle');
    rectangles.forEach(rect => {
        rect.style.backgroundColor = randomColor;
    });
}

// 가상의 퀘스트 페이지에서 학습 목록 받아 study-list 요소에 표시
function displayStudyListFromQuestPage() {
    const studyListElement = document.querySelector('.study-list');
    // 가상의 퀘스트 목록
    const questStudyList = ['Math', 'Science', 'History']; // 이 리스트는 나중에 동적으로 가져올 수 있음
    studyListElement.textContent = questStudyList.join(', ');
}

// 가상의 타이머 페이지에서 공부 시간 받아 study-time 요소에 표시
function displayStudyTimeFromTimerPage() {
    const studyTimeElement = document.querySelector('.study-time');
    // 가상의 공부 시간
    const studyTime = '2시간 30분'; // 이 값은 타이머로부터 받아옴
    studyTimeElement.textContent = studyTime;
}

// 타이머 시간 기준으로 hour 요소 채우기 (공부한 시간을 숫자로 변환 후 랜덤 색상 적용)
function fillHourDivsBasedOnTime(studyTime) {
    const hourDivs = document.querySelectorAll('.hour');
    //const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // 랜덤 색상 생성
    const totalHours = Math.floor(studyTime); // 공부 시간을 정수 시간으로 변환

    // totalHours만큼 hour div를 채움
    for (let i = 0; i < totalHours && i < hourDivs.length; i++) {
        hourDivs[i].style.backgroundColor = randomColor; // 색상 적용
    }
}

// 예시로 사용해 볼 수 있는 부분
const studyTime = 2.5; // 예: 2시간 30분 (소수점으로 표현)
fillHourDivsBasedOnTime(studyTime);

// 주기적으로 시간 업데이트 (1분마다)
setInterval(displayCurrentTime, 60000);

// 페이지가 로드되면 초기 작업 수행
window.onload = function() {
    displayCurrentDate();
    displayCurrentTime();
    applyRandomColorsToStudyRectangles();
    displayStudyListFromQuestPage();
    displayStudyTimeFromTimerPage();
    fillStudyRectanglesBasedOnTime();
};
