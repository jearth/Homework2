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



$.ajax({ //jquery ajax
    url: "https://jbeteacherstytem-dev.azurewebsites.net/api/leaders", //값을 가져올 경로
    type : "get", //get방식으로 가져오기
    dataType:"json", //html, xml, text, script, json, jsonp 등 다양하게 쓸 수 있음
    success : function(result){ //요청 성공시 실행될 메서드
        var str = '';
        $.each(result, function(i, item){
            var number = i + 1;
            str += '<tr><td>' + number + '</td><td>' + result[i].leaderName + '</td><td>' + result[i] .leaderNO + '</td></tr>';
        });
        $('.leaderTable_body').append(str);
    },
    error : function(xhr, status, error){ //요청 실패시 에러 확인을 위함
    console.log("통신에러");
    }
});

$.ajax({ //jquery ajax
    url: "https://jbeteacherstytem-dev.azurewebsites.net/api/schools", //값을 가져올 경로
    type : "get", //get방식으로 가져오기
    dataType:"json", //html, xml, text, script, json, jsonp 등 다양하게 쓸 수 있음
    success : function(result){ //요청 성공시 실행될 메서드
        var str = '';
        $.each(result, function(i,){
            str += '<tr><td>' + result[i].schoolNo + '</td><td>' + result[i] .schoolName + '</td></tr>';
        });
        $('.schoolTable_body').append(str);
    },
    error : function(xhr, status, error){ //요청 실패시 에러 확인을 위함
    console.log("통신에러");
    }
});

// -------------------------------------------------

// 모달 창
var modal = document.getElementById('myModal1');

// 모달을 열기 위한 버튼
var button = document.getElementById('button-addon2');

// 모달을 닫기 위한 닫기 버튼
var closeBtn = document.getElementsByClassName('close')[0];

// "식별코드검색" 버튼 클릭 시 모달 열기
button.onclick = function() {
    modal.style.display = 'block';
};

// 모달 닫기 버튼 클릭 시 모달 닫기
closeBtn.onclick = function() {
    modal.style.display = 'none';
};

// 모달 외부 클릭 시 모달 닫기
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// 모달 검색 기능
function searchLeaderCode() {
    var inputText = $('#leaderCodeInput').val(); // #leaderCodeInput ID를 가진 입력란에서 값을 가져와 inputText 변수에 저장
    $.ajax({
        url: "https://jbeteacherstytem-dev.azurewebsites.net/api/leaders",
        type: "get",
        dataType: "json",
        data: { name: inputText }, // name????이라는 키에 inputText라는 변수의 값을 할당
        success: function(result) {
            var str = '';

            $.each(result, function(i, item) {
                if (item.leaderName === inputText) {
                    var number = i + 1;
                    str += '<tr><td>' + number + '</td><td>' + item.leaderName + '</td><td>' + item.leaderNO + '</td></tr>';
                }
            });

            if (str !== '') {
                $('.leaderTable_body').html(str); // 선택된 요소의 내용을 지정된 문자열 str로 설정
            } else {
                $('.leaderTable_body').html('<tr><td colspan="3">검색된 결과가 없습니다.</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            console.log("통신에러");
        }
    });
}


// -------------------------------------------------

// 모달 창
var modal2 = document.getElementById('myModal2');

// 모달을 열기 위한 버튼
var button2 = document.getElementById('button-addon3');

// 모달을 닫기 위한 닫기 버튼
var closeBtn2 = modal2.querySelector('.close');

// "학교 식별코드검색" 버튼 클릭 시 모달 열기
button2.onclick = function() {
    modal2.style.display = 'block';
};

// 모달 닫기 버튼 클릭 시 모달 닫기
closeBtn2.onclick = function() {
    modal2.style.display = 'none';
};

// 모달 외부 클릭 시 모달 닫기
window.onclick = function(event) {
    if (event.target === modal2) {
        modal2.style.display = 'none';
    }
};

// 학교 식별코드를 검색하는 함수
function searchSchoolCode() {
    var schoolCode = document.getElementById('schoolCodeInput').value;
    if (schoolCode.trim() !== '') {
        alert('검색 로직을 수행합니다. 학교명: ' + schoolCode);
        modal2.style.display = 'none';
    } else {
        alert('학교명을 입력해주세요.');
    }
}

// 모달 닫기 함수
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// 모달 검색 기능
function searchSchoolCode() {
    var inputText = $('#schoolCodeInput').val(); // #schoolCodeInput ID를 가진 입력란에서 값을 가져와 inputText 변수에 저장
    $.ajax({
        url: "https://jbeteacherstytem-dev.azurewebsites.net/api/schools",
        type: "get",
        dataType: "json",
        data: { name: inputText }, // name????이라는 키에 inputText라는 변수의 값을 할당
        success: function(result) {
            var str = '';

            $.each(result, function(i, item) {
                if (item.schoolName === inputText) {
                    var number = i + 1;
                    str += '<tr><td>' + result[i].schoolNo + '</td><td>' + result[i] .schoolName + '</td></tr>';
                }
            });

            if (str !== '') {
                $('.schoolTable_body').html(str); // 선택된 요소의 내용을 지정된 문자열 str로 설정
            } else {
                $('.schoolTable_body').html('<tr><td colspan="3">검색된 결과가 없습니다.</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            console.log("통신에러");
        }
    });
}
// -------------------------------------

document.getElementById("file-input").addEventListener("change", function () {
    const fileInput = this;
    const imagePlaceholder = document.getElementById("image-placeholder");
    const selectedImage = document.getElementById("selected-image");

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
        selectedImage.src = e.target.result;
        selectedImage.style.display = "block";
        imagePlaceholder.style.display = "none";
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});

// ---------------------------------------------------------

const selectBoxElements = document.querySelectorAll(".select");

function toggleSelectBox(selectBox) {
    selectBox.classList.toggle("active");
}

function selectOption(optionElement) {
    const selectBox = optionElement.closest(".select");
    const selectedElement = selectBox.querySelector(".selected-value");
    selectedElement.textContent = optionElement.textContent;
}

selectBoxElements.forEach(selectBoxElement => {
    selectBoxElement.addEventListener("click", function (e) {
        const targetElement = e.target;
        const isOptionElement = targetElement.classList.contains("option");

        if (isOptionElement) {
        selectOption(targetElement);
        }

        toggleSelectBox(selectBoxElement);
    });
});

document.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isSelect = targetElement.classList.contains("select") || targetElement.closest(".select");

    if (isSelect) {
        return;
    }

    const allSelectBoxElements = document.querySelectorAll(".select");

    allSelectBoxElements.forEach(boxElement => {
        boxElement.classList.remove("active");
    });
}); 

// --------------------------------------

function addRow1(button) {
    var table = document.getElementById("myTable1");
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
    var table = document.getElementById("myTable2");
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

// 등록하기 버튼 클릭 시 실행되는 함수
document.querySelector('.button.register').addEventListener('click', function () {
    validateAndRegister();
});

// 유효성 검사 및 팝업창 표시 함수
function validateAndRegister() {
    var isValid = validateInputs();

    if (isValid) {
        openSuccessPopup('지도자 등록이 성공했습니다.');
    } else {
        openErrorPopup('필수입력값을 모두 입력해주세요.');
    }
}

function validateInputs() {
    // 사진 첨부 여부 확인
    var photoInput = document.getElementById('file-input');
    if (!photoInput.files.length) {
    alert('사진을 첨부해주세요.');
    return false;
    }

    // 식별코드 확인
    var codeInput = document.querySelector('#code-heading input');
    if (codeInput.value.trim() === '') {
    alert('식별코드를 입력해주세요.');
    return false;
    }

    // 성명 확인
    var nameInput = document.getElementById('exampleFormControlInput1');
    if (nameInput.value.trim() === '') {
    alert('성명을 입력해주세요.');
    return false;
    }

    // 생년월일 확인
    var birthdateInput = document.getElementById('birthdate');
    if (birthdateInput.value === '') {
    alert('생년월일을 입력해주세요.');
    return false;
    }

    // 학교명 확인
    var schoolInput = document.querySelector('#school-heading input');
    if (schoolInput.value.trim() === '') {
    alert('학교명을 입력해주세요.');
    return false;
    }

    // 종목 확인
    var sportInput = document.querySelector('#sport-heading .selected-value');
    if (sportInput.textContent === '종목을 선택해주세요.') {
    alert('종목을 선택해주세요.');
    return false;
    }

    // 근무지 전화번호 확인
    var tel1Input = document.querySelector('#phone-heading [name="tel1"]');
    var tel2Input = document.querySelector('#phone-heading [name="tel2"]');
    var tel3Input = document.querySelector('#phone-heading [name="tel3"]');
    if (tel1Input.value.trim() === '' || tel2Input.value.trim() === '' || tel3Input.value.trim() === '') {
    alert('근무지 전화번호를 입력해주세요.');
    return false;
    }

    // 최초채용 확인
    var hireDateInput = document.getElementById('hire');
    if (hireDateInput.value === '') {
    alert('최초채용일을 입력해주세요.');
    return false;
    }

    // 성별 확인
    var genderInput = document.querySelector('#gender-heading input:checked');
    if (!genderInput) {
    alert('성별을 선택해주세요.');
    return false;
    }

    // 근무 이력 확인
    var startDateInput = document.querySelector('#myTable1 [name="start-date"]');
    var endDateInput = document.querySelector('#myTable1 [name="end-date"]');
    var sportHistoryInput = document.querySelector('#myTable1 select');
    if (startDateInput.value === '' || endDateInput.value === '' || sportHistoryInput.value === '') {
    alert('근무 이력을 입력해주세요.');
    return false;
    }

    // 자격사항 확인
    var qualificationInput = document.querySelector('#myTable2 [name="qualification"]');
    var numberInput = document.querySelector('#myTable2 [name="number"]');
    var getDateInput = document.querySelector('#myTable2 [name="get-date"]');
    var issuingAuthorityInput = document.querySelector('#myTable2 [name="issuing-authority"]');
    if (qualificationInput.value.trim() === '' || numberInput.value.trim() === '' || getDateInput.value === '' || issuingAuthorityInput.value.trim() === '') {
    alert('자격사항을 입력해주세요.');
    return false;
    }

    // 모든 필수 입력값이 유효하면 true를 반환
    return true;
    }

    document.querySelector('.button.register').addEventListener('click', function () {
    if (validateInputs()) {
        openSuccessPopup('지도자 등록이 성공했습니다.');
    }
});


// 성공 팝업창 표시 함수
function openSuccessPopup(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successPopup').style.display = 'block';
}

// 에러 팝업창 표시 함수
function openErrorPopup(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorPopup').style.display = 'block';
}

// 팝업창 닫기 함수
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
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