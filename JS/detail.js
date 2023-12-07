$(document).ready(function () {
    // URL에서 식별코드 파라미터 읽기
    var urlParams = new URLSearchParams(window.location.search);
    var leaderNo = urlParams.get('leaderNo');

    loadLeaderDetails(leaderNo);
});

function loadLeaderDetails(leaderNo) {
    $.ajax({
        url: 'https://jbeteacherstytem-dev.azurewebsites.net/api/leaders/' + leaderNo,
        method: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result);

            // 근무 이력 테이블
            var historyStr = '';
            $.each(result.history, function (i, val) {
                console.log('i:', i, 'val:', val);
                historyStr += '<tr><td>' + val.startDT + '</td><td>' + val.endDT + '</td><td>' + val.schoolName + '</td><td>' + val.sportName + '</td></tr>';
            });
            $('.historyTable_body').append(historyStr);

            // 자격사항 테이블
            var certificateStr = '';
            $.each(result.certificate, function (i, val) {
                console.log('i:', i, 'val:', val);
                certificateStr += '<tr><td>' + val.certificateName + '</td><td>' + val.certificateNumber + '</td><td>' + val.certificateDT + '</td><td>' + val.organization + '</td></tr>';
            });
            $('.certificateTable_body').append(certificateStr);

            displayData(result);

        },
        error: function (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    });
}

// 받아온 데이터를 화면에 표시하는 함수
function displayData(data) {
    console.log(`data: ${typeof data}`);
    console.log(`data: ${JSON.stringify(data)}`);

    // 이미지 태그
    var imageTag = '<img src="data:image/png;base64,' + data.leaderImg + '" alt="image A" />';

    console.log(imageTag);

    // 다른 데이터 표시
    $('#imageResult').html(imageTag);
    $('#leaderNoResult').text(data.leaderNo);
    $('#schoolNoResult').text(data.schoolNo);
    $('#leaderNameResult').text(data.leaderName);
    $('#birthdayResult').text(data.birthday);
    $('#genderResult').text(data.gender);
    $('#sportNameResult').text(data.sportName);
    $('#telNoResult').text(data.telNo);
    $('#empDTResult').text(data.empDT);
}
