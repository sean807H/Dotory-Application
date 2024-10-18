document.querySelector('button').addEventListener('click', async () => {
    const questName = document.querySelector('.TaskInput input').value;
    const deadlineDateTime = document.querySelector('#calendar').value;
    
    // 마감 시간과 날짜를 분리
    const [deadline_date, deadline_time] = deadlineDateTime.split('T');

    if (!questName || !deadlineDateTime) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:3000/quest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quest_name: questName,
                deadline_date: deadline_date,
                deadline_time: deadline_time
            }),
        });

        if (response.ok) {
            alert('퀘스트가 성공적으로 저장되었습니다.');
        } else {
            const errorData = await response.json();
            alert(`에러 발생: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('서버와의 통신에 실패했습니다.');
    }
});