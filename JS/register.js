// $.ajax({ //jquery ajax
//     type:"get", //get방식으로 가져오기
//     url:"data.json", //값을 가져올 경로
//     data: "전송할 데이터", //전송할 데이터 입력
//     dataType:"json", //html, xml, text, script, json, jsonp 등 다양하게 쓸 수 있음
//     success: function(data){   //요청 성공시 실행될 메서드
//         console.log("통신성공");
//     },
//     error:function(){		 //요청 실패시 에러 확인을 위함
//         console.log("통신에러");
//     }
// })

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('myModal1');
    var button = document.getElementById('button-addon2');
    var closeBtn = document.getElementsByClassName('close')[0];
    var cancelleaders = document.getElementById('cancelleaders');
    var selectedLeaderCode = null;
    var selectedLeaderName = null;

    button.onclick = function () {
        modal.style.display = 'block';
        searchLeaders();
    };

    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    cancelleaders.onclick = function () {
        modal.style.display = 'none';
    };

    function openregisterPopup1() {
        var popup = document.getElementById('registerPopup1');
        popup.style.display = 'block';

        document.querySelector('#registerPopup1 .confirm').addEventListener('click', function () {
            popup.style.display = 'none';
        });
    }

    function renderLeaderTable(result) {
        var str = '';
        result.forEach(function (item, i) {
            var number = i + 1;
            str += '<tr><td>' + number + '</td><td>' + item.leaderName + '</td><td>' + item.leaderNO + '</td></tr>';
        });
        document.querySelector('.leaderTable_body').innerHTML = str;

        document.querySelectorAll('.leaderTable_body tr').forEach(function (tr) {
            tr.addEventListener('click', function () {
                document.querySelectorAll('.leaderTable_body tr').forEach(function (row) {
                    row.style.backgroundColor = '';
                });
                tr.style.backgroundColor = '#F9F9F9';
        
                var tds = tr.querySelectorAll('td');
                selectedLeaderCode = tds[2].innerText;
                selectedLeaderName = tds[1].innerText;
            });
        });
        
    }

    function searchLeaders() {
        var inputText = document.getElementById('leaderCodeInput').value;

        $.ajax({
            url: "https://jbeteacherstytem-dev.azurewebsites.net/api/leaders",
            type: "get",
            dataType: "json",
            data: { keyword: inputText },
            success: function (result) {
                renderLeaderTable(result);

                // 등록하기 버튼 클릭 이벤트
                document.getElementById('registerleaders').addEventListener('click', function () {
                    if (selectedLeaderCode) {
                        document.getElementById('code-heading').querySelector('input').value = selectedLeaderCode;
                        document.getElementById('name-heading').querySelector('input').value = selectedLeaderName;
                        modal.style.display = 'none';
                    } else {
                        openregisterPopup1();
                    }
                });

                // 총 지도자 수 업데이트
                document.getElementById('totalLeaders').innerText = '총 ' + result.length + '명';
            },
            error: function (xhr, status, error) {
                console.log("통신에러");
            }
        });
    }

    // 최초 실행 시 호출
    searchLeaders();
});


// -------------------------------------------------

// 모달2 창
var modal2 = document.getElementById('myModal2');

// 모달을 열기 위한 버튼
var button2 = document.getElementById('button-addon3');

// 모달을 닫기 위한 닫기 버튼
var closeBtn2 = modal2.querySelector('.close');

// "학교 식별코드검색" 버튼 클릭 시 모달2 열기
button2.onclick = function() {
    modal2.style.display = 'block';
};

// 모달2 닫기 버튼 클릭 시 모달2 닫기
closeBtn2.onclick = function() {
    modal2.style.display = 'none';
};

// 취소 버튼 클릭 시 모달2 닫기
cancelSchool.onclick = function() {
    modal2.style.display = 'none';
};

// 학교 정보 초기화 및 검색하는 함수
function initializeAndSearchSchoolInfo(keyword) {
    $.ajax({
        url: "https://jbeteacherstytem-dev.azurewebsites.net/api/schools",
        type: "get",
        dataType: "json",
        data: { keyword: keyword },
        success: function(result) {
            handleSchoolSearchResult(result);
        },
        error: function(xhr, status, error) {
            console.log("통신에러");
        }
    });
}

// 학교 정보 검색 결과 처리 함수
function handleSchoolSearchResult(result) {
    var str = '';
    $.each(result, function(i, item) {
        var number = i + 1;
        str += '<tr><td>' + number + '</td><td>' + item.schoolName + '</td></tr>';
    });
    $('.schoolTable_body').html(str);

    // 총 학교 수를 가져와서 표시
    var totalSchools = result.length;
    $('#totalSchool').text('총 ' + totalSchools + '개');

    // 선택된 학교의 식별코드
    var selectedSchoolCode = null;

    // 학교 행 클릭 이벤트
    $('.schoolTable_body tr').on('click', function() {
        $('.schoolTable_body tr').css('background-color', '');
        $(this).css('background-color', '#F9F9F9');

        // 선택된 학교의 식별코드 가져오기
        selectedSchoolCode = $(this).find('td:eq(1)').text();
    });

    // 등록하기 버튼 클릭 이벤트
    $('#registerSchool').on('click', function() {
        if (selectedSchoolCode) {
            // 가져온 식별코드를 입력란에 넣기
            $('#school-heading input').val(selectedSchoolCode);
            modal2.style.display = 'none';
        } else {
            // 클릭하지 않고 등록하기 버튼을 누른 경우
            openregisterPopup2();
        }
    });

    // 팝업 창 열기
    function openregisterPopup2() {
        // 팝업 열기
        var popup = document.getElementById('registerPopup2');
        popup.style.display = 'block';

        // 확인 버튼 클릭
        document.querySelector('#registerPopup2 .confirm').addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }
}

// 초기화 함수 호출
initializeAndSearchSchoolInfo('');


// -------------------------------------

// 파일 입력의 변화를 감지하는 이벤트 리스너
document.getElementById("file-input").addEventListener("change", function () {

    // 파일 입력
    const fileInput = this;

    // 이미지를 표시할 엘리먼트와 선택된 이미지를 표시할 엘리먼트를 가져오기
    const imagePlaceholder = document.getElementById("image-placeholder");
    const selectedImage = document.getElementById("selected-image");

    // 만약 파일 입력에 파일이 선택되었다면
    if (fileInput.files && fileInput.files[0]) {

        // FileReader 객체를 생성하기
        const reader = new FileReader();

        // 파일 읽기 작업이 완료되면 실행됨
        reader.onload = function (e) {
            // 선택된 이미지 엘리먼트의 src 속성을 읽어온 데이터 URL로 설정함
            selectedImage.src = e.target.result;
            
            // 선택된 이미지를 표시하고 이미지 플레이스홀더를 감춤
            selectedImage.style.display = "block";
            imagePlaceholder.style.display = "none";
        };

        // 파일을 Data URL로 변환하여 읽어옴......
        reader.readAsDataURL(fileInput.files[0]);
    }
});


// ---------------------------------------------------------

$(document).ready(function () {
    // AJAX 호출
    $.ajax({
        url: "https://jbeteacherstytem-dev.azurewebsites.net/api/sports", 
        type: "get",
        dataType: "json",
        success: function (data) {

            // DB 이용하여 옵션 동적으로 추가
            var optionsHtml = '';
            $.each(data, function (index, item) {
                optionsHtml += '<option value="' + item.sportsNo + '">' + item.sportsName + '</option>';
            });

            // 옵션 추가
            $('#sport-select-container1').append(optionsHtml);
            $('#sport-select-container2').append(optionsHtml);
        },
        error: function (xhr, status, error) {
            console.log("통신에러");
        }
    });
});

// ---------------------------------------------------------

function addRow1(button) {
    var table = document.getElementById("Employment-History-Table");
    var row = button.parentNode.parentNode; // 현재 행 가져오기
    var newRow = row.cloneNode(true); // 행 복제

    // 유효성 검사 함수
    function validateRow(row) {
        // 각 입력 필드에 대한 유효성 검사
        var schoolName = row.querySelector('input[type="text"]').value;
        var startDate = row.querySelector('input[type="date"][name="start-date"]').value;

        // 유효성 검사
        if (schoolName === "" || startDate === "") {
            alert("필수 입력값을 모두 입력해주세요.");
            return false;
        }
        return true;
    }

    // 새로운 행 추가 전에 유효성 검사
    if (validateRow(newRow)) {
        // 입력값 초기화
        var inputs = newRow.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.value = '';
        });

        // 추가 버튼을 삭제 버튼으로 변경
        var buttons = newRow.querySelectorAll('button');
        buttons.forEach(function (button) {
            if (button.textContent === '추가') {
                button.textContent = '삭제';
                button.onclick = function () {
                    deleteRow1(this);
                };
                button.classList.add('delete'); // 삭제 버튼에 delete 추가
            }
        });

        // 새로운 행을 테이블의 자식으로 추가
        table.appendChild(newRow);
    }
}

// 삭제 함수
function deleteRow1(button) {
    var row = button.parentNode.parentNode; 
    row.parentNode.removeChild(row); 
}

// --------------------------------------

function addRow2(button) {
    var table = document.getElementById("Certificate-Table");
    var row = button.parentNode.parentNode; 
    var newRow = row.cloneNode(true);

    // 유효성 검사 함수
    function validateRow(row) {
        var qualification = row.querySelector('input[type="text"]').value;
        var qualificationNumber = row.querySelector('input[type="text"]').value;
        var getDate = row.querySelector('input[type="date"][name="get-date"]').value;
        var issuingAuthority = row.querySelector('input[type="text"]').value;

        if (qualification === "" || qualificationNumber === "" || getDate === "" || issuingAuthority === "") {
            alert("필수 입력값을 모두 입력해주세요.");
            return false;
        }
        return true;
    }

    // 새로운 행 추가 전에 유효성 검사 실행
    if (validateRow(newRow)) {
        var inputs = newRow.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.value = '';
        });

        // 추가 버튼을 삭제 버튼으로 변경
        var buttons = newRow.querySelectorAll('button');
        buttons.forEach(function (button) {
            if (button.textContent === '추가') {
                button.textContent = '삭제';
                button.onclick = function () {
                    deleteRow2(this);
                };
                button.classList.add('delete');
            }
        });

        table.appendChild(newRow);
    }
}

// 삭제 함수
function deleteRow2(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// --------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    initializeEventListeners();
});

function initializeEventListeners() {
    // 등록하기 버튼 클릭 시 처리
    document.querySelector('.register').addEventListener('click', function () {
        handleRegistration();
    });

    // 등록 모달창에서 취소 버튼 클릭 시 모달창 닫기
    document.querySelector('#button-register-success .cancel').addEventListener('click', function () {
        document.getElementById('button-register-success').style.display = 'none';
    });

    // 오류 모달창에서 확인 버튼 클릭 시 모달창 닫기
    document.querySelector('#button-register-error .confirm').addEventListener('click', function () {
        document.getElementById('button-register-error').style.display = 'none';
    });
}

function handleRegistration() {
    // 이미지 유효성 검사
    var fileInput = document.getElementById('file-input');
    var selectedImage = document.getElementById('selected-image');
    var fileValid = fileInput.files.length > 0;
    var maxFileSizeKB = 1; // 최대 허용 파일 크기 (MB)
    //  console.log('Image Valid:', fileValid);

    // 이미지 유효성 검사
        var fileInput = document.getElementById('file-input');
        var selectedImage = document.getElementById('selected-image');
        var fileValid = fileInput.files.length > 0;
        var maxFileSizeKB = 1; // 최대 허용 파일 크기 (MB)
       //  console.log('Image Valid:', fileValid);
        
        // 식별코드 유효성 검사
        var codeInput = document.querySelector('#code-heading input');
        var codeValid = codeInput.value.trim() !== '';
       // console.log('codeValid:', codeValid);

        // 학교명 유효성 검사
        var schoolInput = document.querySelector('#school-heading input');
        var schoolValid = schoolInput.value.trim() !== '';
        // console.log('schoolValid:', schoolValid);

        // 성명 유효성 검사
        var nameInput = document.querySelector('#name-heading input');
        var nameValid = nameInput.value.trim() !== '';
        // console.log('nameValid:', nameValid);

        // 생년월일 유효성 검사
        var dobInput = document.querySelector('#dob-heading input');
        var dobValid = dobInput.value.trim() !== '';
       // console.log('dobValid:', dobValid);

        // 종목 유효성 검사
        var sportSelect = document.querySelector('#sport-select-container1');
        var sportValid = sportSelect.value !== '';

        // 근무지 전화번호 유효성 검사
        var telInput1 = document.querySelector('#tel-heading input[name="tel1"]');
        var telInput2 = document.querySelector('#tel-heading input[name="tel2"]');
        var telInput3 = document.querySelector('#tel-heading input[name="tel3"]');

        var telValid =
            /^\d{3}$/.test(telInput1.value.trim()) &&
            /^\d{4}$/.test(telInput2.value.trim()) &&
            /^\d{4}$/.test(telInput3.value.trim());
            console.log('telValid:', telValid);

        // 최초채용 유효성 검사
        var hireInput = document.querySelector('#hire-date-heading input');
        var hireValid = hireInput.value.trim() !== '';
       // console.log('hireValid:', hireValid);


        // 근무 이력 테이블 필수 입력값 체크
        var workTableInputs = document.querySelectorAll('#Employment-History-Tr input[required], #Employment-History-Tr select[required]');
        var workTableFilled = Array.from(workTableInputs).every(function (input) {
            return input.value.trim() !== '';
        });
        console.log('workTableFilled:', workTableFilled);

        // 자격사항 테이블 필수 입력값 체크
        var qualTable = document.getElementById('Certificate-Table');
        var qualTableInputs = qualTable.querySelectorAll('input[required]');
        var qualTableFilled = Array.from(qualTableInputs).every(function (input) {
            return input.value.trim() !== '';
        });
        console.log('qualTableFilled:', qualTableFilled);

        var qualificationNumberInput = document.querySelector('#Certificate-Table input[placeholder="영문, 숫자만 입력해주세요."]');
        var qualificationNumberValid = /^[A-Za-z0-9]+$/.test(qualificationNumberInput.value.trim());
        console.log('qualificationNumberValid:', qualificationNumberValid);

    // 필수 입력값이 모두 채워져 있을 때 등록 모달창 띄우기
    if (
        codeValid &&
        schoolValid &&
        nameValid &&
        dobValid &&
        telValid &&
        sportValid &&
        hireValid &&
        workTableFilled &&
        qualTableFilled &&
        qualificationNumberValid
    ) {
        document.getElementById('button-register-success').style.display = 'block';

        sendDataToServer({
            code: codeInput.value.trim(),
            school: schoolInput.value.trim(),
            name: nameInput.value.trim(),
            dob: dobInput.value.trim(),
            tel: `${telInput1.value.trim()}-${telInput2.value.trim()}-${telInput3.value.trim()}`,
            sport: sportSelect.value,
            hireDate: hireInput.value.trim(),
            // employmentHistory: employmentHistoryData,
            // qualification: qualificationData
        });
    } else {
        // 필수 입력값이 비어있어간 조건을 만족하지 못할 때 오류 모달창 띄우기
        document.getElementById('button-register-error').style.display = 'block';
    }
}

function sendDataToServer(data) {
    fetch('https://', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('서버에 저장되었습니다.');
                // 모달창 닫기
                document.getElementById('button-register-success').style.display = 'none';
            } else {
                alert('서버 저장에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('서버 통신 오류:', error);
            alert('서버 통신 중 오류가 발생했습니다.');
        });
}


// --------------------------------------------------

// 취소하기 버튼 클릭 시 팝업 띄우기
document.querySelector('.button.delete').addEventListener('click', function () {
    openCancelPopup();
});

// 팝업에서 취소 또는 확인 버튼 클릭 시 동작 정의
function openCancelPopup() {
// 팝업 열기
    var popup = document.getElementById('cancelPopup');
    popup.style.display = 'block';

    // 취소 버튼 클릭 시
    document.querySelector('#cancelPopup .cancel').addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // 확인 버튼 클릭 시
    document.querySelector('#cancelPopup .confirm').addEventListener('click', function () {
        window.location.href = './index.html';
    });
}

function openSuccessPopup(message) {
    // 성공 팝업에 확인 버튼 클릭 시
    document.querySelector('#successPopup .confirm').addEventListener('click', function () {
        window.location.href = '#';
    });
}