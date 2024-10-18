// DOM이 로드된 후에 실행되도록 설정
document.addEventListener('DOMContentLoaded', function() {
    displayTasks(); // 초기화면에 일정 표시
});

// 일정 리스트 관리
let tasks = [
    { name: 'JS 공부', duration: 0.1, color: '#F28E36', completed: false }, // 시간 있는 예시 일정
    { name: '골밑슛 연습', duration: null, color: '#F1C40F', completed: false }, // 시간 없이 체크만 하는 일정
    { name: 'GTQ일러스트 연습', duration: 120, color: '#D676F7', completed: false }
];

// 마감 임박 작업
let urgentTasks = [
    { name: 'DD피그마 과제', duration: 10, color: '#3498DB', deadline: '23:59'} // 마감시간이 23:59로 설정됨
];

let intervals = {}; // 각 일정의 타이머를 저장

// 팝업 창을 보여주는 함수
function showCustomAlert(title, message) {
    const popup = document.getElementById('popup');
    const titleElement = document.getElementById('popup-title');
    const messageElement = document.getElementById('popup-message');

    // 팝업에 타이틀과 메시지를 동적으로 설정
    titleElement.textContent = title;
    messageElement.textContent = message;

    // 팝업을 보이게 하고 디졸브 효과 적용 (show 클래스 추가)
    popup.style.display = 'flex';
    setTimeout(() => {
        popup.classList.add('show'); // 점차 나타나게 함
    }, 10); // 약간의 지연을 줘서 display 설정 후 transition 적용

    // 3초 후 팝업 자동 닫기 (디졸브로 사라짐)
    setTimeout(() => {
        popup.classList.remove('show'); // 서서히 사라짐
        setTimeout(() => {
            popup.style.display = 'none'; // 완전히 사라진 후 display none 처리
        }, 500); // transition이 끝난 후 display를 none으로 설정    
    }, 1300); // 3초 후 팝업이 사라지기 시작
}



function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // 기존 목록 초기화

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        // 시간 있는 일정과 없는 일정 구분
        let buttonHtml;
        if (task.duration) {
            // 시간 있는 일정의 경우
            buttonHtml = `<button id="btn-${index}" style="background-color:${task.color};" onclick="toggleTask(${index})">▶</button>`;
        } else {
            // 시간 없는 일정의 경우
            buttonHtml = `<button id="btn-${index}" style="background-color:${task.color};" onclick="markTaskComplete(${index})">⚪</button>`;
        }

        taskElement.innerHTML = `
            ${buttonHtml}
            <h4>${task.name}</h4>
            ${task.duration ? `<span class="time" id="time-${index}">${formatTime(task.duration * 60)}</span>` : ''}
        `;
        taskList.appendChild(taskElement);
    });

    displayUrgentTasks(); // 마감 임박 작업 표시
}


// 마감 임박 작업 표시 함수
function displayUrgentTasks() {
    const urgentTaskList = document.getElementById('urgentTaskList');
    urgentTaskList.innerHTML = ''; // 기존 목록 초기화

    urgentTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const remainingTime = calculateTimeLeft(task.deadline);
        taskElement.innerHTML = `
            <button style="background-color:${task.color};" onclick="toggleUrgentTask(${index})" id="urgent-btn-${index}">▶</button>
            <h4>${task.name}</h4>
            <span class="time" id="urgent-time-${index}">${formatTime(task.duration * 60)}</span>
            <span class="due-time">${remainingTime}</span>
        `;
        urgentTaskList.appendChild(taskElement);
    });
}


// 시간을 포맷하는 함수
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// 시간 있는 일정 시작/멈춤 토글 함수
function toggleTask(index) {
    const task = tasks[index];

    // 이미 완료된 일정인 경우 경고 메시지 표시
    if (task.completed) {
        showCustomAlert('이미 완료한 일정입니다');
        return;
    }
    const button = document.getElementById(`btn-${index}`);
    let remainingTime = task.duration * 60;

    if (intervals[index]) {
        clearInterval(intervals[index]);
        delete intervals[index];
        button.textContent = '▶';
    } else {
        button.innerHTML = '<img src="../images/loading.png">';
        intervals[index] = setInterval(() => {
            remainingTime--;
            document.getElementById(`time-${index}`).innerText = formatTime(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(intervals[index]);
                delete intervals[index];
                button.textContent = '✔';
                showCustomAlert('일정 완료! 랜덤 도토리 포인트를 얻었습니다.');
                const randomPoints = awardRandomPoints(); // 랜덤 도토리 포인트 얻기
                updateAcornPoints(randomPoints); // 도토리 포인트 업데이트
                task.completed = true; // 일정 완료 상태로 설정
            }
        }, 1000);
    }
}


let acornPoints = 0; // 초기 도토리 포인트 10개

// 도토리 포인트 업데이트 함수
function updateAcornPoints(points) {
    acornPoints += points;
    document.getElementById('acornCount').textContent = `${acornPoints}개`; // 도토리 개수 업데이트
}

// 시간 없는 일정 완료 처리 함수 (동그라미 체크로 변경)
function markTaskComplete(index) {
    const task = tasks[index]; // 해당 일정 정보 가져오기

    // 이미 완료된 일정인 경우 경고 메시지 표시
    if (task.completed) {
        showCustomAlert('이미 완료한 일정입니다.');
        return;
    }

    const button = document.getElementById(`btn-${index}`);
    button.classList.add('completed'); // 버튼을 완료 상태로 변경
    button.textContent = '✔'; // 동그라미 안에 체크 표시

    const randomPoints = Math.floor(Math.random() * 10) + 1; // 1~10 랜덤 도토리 포인트
    showCustomAlert(`일정 완료! ${randomPoints} 도토리 포인트를 얻었습니다.`);
    updateAcornPoints(randomPoints); // 도토리 포인트 업데이트

    // 해당 일정을 완료 상태로 변경
    task.completed = true;
}



// 마감 임박 작업 시작/멈춤 토글 함수
function toggleUrgentTask(index) {
    const button = document.getElementById(`urgent-btn-${index}`);
    const task = urgentTasks[index];
    let remainingTime = task.duration * 60;

    if (intervals[`urgent-${index}`]) {
        clearInterval(intervals[`urgent-${index}`]);
        delete intervals[`urgent-${index}`];
        button.textContent = '▶';
    } else {
        button.innerHTML = '<img src="../images/loading.png">';
        intervals[`urgent-${index}`] = setInterval(() => {
            remainingTime--;
            document.getElementById(`urgent-time-${index}`).innerText = formatTime(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(intervals[`urgent-${index}`]);
                delete intervals[`urgent-${index}`];
                button.textContent = '✔';
                showCustomAlert('마감 임박 일정 완료! 랜덤 도토리 포인트를 얻었습니다.');
                awardRandomPoints();
            }
        }, 1000);
    }
}

// 현재 시간을 기준으로 마감시간까지 남은 시간 계산
function calculateTimeLeft(deadline) {
    const now = new Date();
    const [hours, minutes] = deadline.split(':').map(Number);
    const deadlineDate = new Date(now);
    deadlineDate.setHours(hours, minutes, 0, 0);

    const diff = deadlineDate - now;
    const remainingHours = Math.floor(diff / 1000 / 60 / 60);
    const remainingMinutes = Math.floor((diff / 1000 / 60) % 60);
    
    return `${remainingHours}시간 ${remainingMinutes}분 남음`;
}

// 랜덤 포인트 지급 함수
function awardRandomPoints() {
    const points = Math.floor(Math.random() * 10) + 1;
    showCustomAlert(`축하합니다! ${points} 도토리 포인트를 획득하셨습니다.`);
    return points; // 포인트를 반환
}

