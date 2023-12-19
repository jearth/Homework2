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

            fillHistoryTable(result.history);
            fillCertificateTable(result.certificate);
            displayData(result);
        },
        error: function (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    });
}

function fillHistoryTable(historyData) {
    var historyStr = '';
    $.each(historyData, function (i, val) {
        var formattedStartDT = formatDate(val.startDT); // 날짜 형식 가공
        var formattedEndDT = formatDate(val.endDT); // 종료일도 가공이 필요하다면

        historyStr += '<tr><td>' + formattedStartDT + '</td><td>' + formattedEndDT + '</td><td>' + val.schoolName + '</td><td>' + val.sportName + '</td></tr>';
    });
    $('.historyTable_body').append(historyStr);
}

// 날짜 형식을 가공하는 함수
function formatDate(dateString) {
    var date = new Date(dateString);
    var formattedDate = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    return formattedDate;
}

function fillCertificateTable(certificateData) {
    var certificateStr = '';
    $.each(certificateData, function (i, val) {
        var formattedCertificateDT = formatDate(val.certificateDT); // 날짜 형식 가공

        certificateStr += '<tr><td>' + val.certificateName + '</td><td>' + val.certificateNumber + '</td><td>' + formattedCertificateDT + '</td><td>' + val.organization + '</td></tr>';
    });
    $('.certificateTable_body').append(certificateStr);
}

// 날짜 형식을 가공하는 함수
function formatDate(dateString) {
    var date = new Date(dateString);
    var formattedDate = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    return formattedDate;
}

// 받아온 데이터를 화면에 표시하는 함수
function displayData(data) {
    console.log(`data: ${typeof data}`);
    console.log(`data: ${JSON.stringify(data)}`);

    // 이미지 태그
    var imageTag = '<img src="data:image/png;base64,' + data.leaderImg + '" alt="image A" />';

    console.log(imageTag);

    var birthday = new Date(data.birthday);
    var empDT = new Date(data.empDT);

    // 원하는 형식으로 가공하기
    var formattedbirthday = birthday.getFullYear() + '.' + (birthday.getMonth() + 1) + '.' + birthday.getDate();
    var formattedempDT = empDT.getFullYear() + '.' + (empDT.getMonth() + 1) + '.' + empDT.getDate();

    // 다른 데이터 표시
    $('#imageResult').html(imageTag);
    $('#leaderNoResult').text(data.leaderNo);
    $('#schoolNoResult').text(data.schoolNo);
    $('#leaderNameResult').text(data.leaderName);
    $('#birthdayResult').text(formattedbirthday);
    $('#genderResult').text(data.gender);
    $('#sportNameResult').text(data.sportName);
    $('#telNoResult').text(data.telNo);
    $('#empDTResult').text(formattedempDT);
}
