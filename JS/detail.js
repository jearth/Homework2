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
            console.log(result)
            var str = '';
            $.each(result, function (i) {
                str += '<tr><td>' + result[i].startDT + '</td><td>' + result[i].endDT + '</td><td>' + result[i].schoolName + '</td><td>' + result[i].sportName + '</td></tr>';
            });
            $('.historyTable_body').append(str);

            $.each(result, function (i) {
                str += '<tr><td>' + result[i].certificateName + '</td><td>' + result[i].certificateNumber + '</td><td>' + result[i].certificateDT + '</td><td>' + result[i].organization + '</td></tr>';
            });
            $('.certificateTable_body').append(str);

            // 성공적으로 데이터를 받아오면 실행되는 함수
            displayData(result);

            // 이미지를 표시하는 함수 호출
            displayImage(result.leaderImg);
        },
        error: function (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    });
}

// 받아온 데이터를 화면에 표시하는 함수
function displayData(data) {
    $('#leaderNoResult').text(data.leaderNo);
    $('#schoolNoResult').text(data.schoolNo);
    $('#leaderNameResult').text(data.leaderName);
    $('#birthdayResult').text(data.birthday);
    $('#genderResult').text(data.gender);
    $('#sportNameResult').text(data.sportName);
    $('#telNoResult').text(data.telNo);
    $('#empDTResult').text(data.empDT);
}

// 이미지를 표시하는 함수
function displayImage(leaderImg) {
    // 이미지 데이터를 데이터 URI로 변환하여 img 태그의 src에 지정
    $('#imageResult').attr('src', 'data:image/jpeg;base64,' + leaderImg);
}
