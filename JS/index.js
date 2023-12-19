// HTML에서 클래스가 "select"인 모든 요소를 선택하여 document.querySelectorAll에 저장
const selectBoxElements = document.querySelectorAll(".select");

// 선택 상자 함수
function toggleSelectBox(selectBox) {
    selectBox.classList.toggle("active");
}

// 옵션 선택 함수
function selectOption(optionElement) {
    // 선택한 옵션이 속한... 선택 상자를 찾고
    const selectBox = optionElement.closest(".select");

    // 그리고 선택 상자 내부에서 현재 선택된 항목을 나타내는 요소 찾고
    const selectedElement = selectBox.querySelector(".selected-value");

    // 선택한 옵션의 텍스트 내용을 현재 선택된 항목에 표시하고
    selectedElement.textContent = optionElement.textContent;
}

// 클릭 이벤트 핸들러 함수
function handleSelectBoxClick(e) {
    const targetElement = e.target;
    const isOptionElement = targetElement.classList.contains("option");

    // 클릭된 요소가 옵션인 경우 해당 옵션 선택 함수 호출, 그렇지 않으면 선택 상자 토글
    if (isOptionElement) {
        selectOption(targetElement);
    }

    toggleSelectBox(this);
}

// 각 선택 상자에 대한 이벤트 리스너
selectBoxElements.forEach(selectBoxElement => {
    selectBoxElement.addEventListener("click", handleSelectBoxClick);
});

// 문서 어느 곳이든 클릭할 때 발생하는 이벤트 리스너
function handleDocumentClick(e) {
    const targetElement = e.target;

    // 클릭된 요소가 선택 상자인지 또는 선택 상자의 하위 요소인지 확인
    const isSelect = targetElement.classList.contains("select") || targetElement.closest(".select");

    if (isSelect) {
        return;
    }

    // 클릭된 요소가 선택 상자 또는 선택 상자의 하위 요소가 아닌 경우 모든 선택 상자 비활성화
    const allSelectBoxElements = document.querySelectorAll(".select");

    allSelectBoxElements.forEach(boxElement => {
        boxElement.classList.remove("active");
    });
}

document.addEventListener("click", handleDocumentClick);


// -------------------------------------------------------------------------------------------
var pageSize = 10;
var currentPage = 1;
var totalPages;
var tableData;

// 페이지를 로딩하고 초기 데이터를 표시하는 함수
loadTableData();

// 테이블 데이터 로딩 함수
function loadTableData() {
  var url = "https://jbeteacherstytem-dev.azurewebsites.net/api/leaders/list";
  var data = {
    page: currentPage,
    pageSize: pageSize
  };

  $.ajax({
    url: url,
    type: "get",
    dataType: "json",
    data: data,
    success: function (result) {
      tableData = result; // 전체 데이터 저장
      pageInit(result.length);
      applySearchFilter();
      updatePagination();
      updateTable(getCurrentPageData());
    },
    error: function (xhr, status, error) {
      console.log("통신에러");
    }
  });
}

function pageInit(pagelength){
    let page = pagelength / 10;
    if(pagelength % 10 != 0){
        page++;
    }
    
    for(let i = 1; i <= page; i++){
        let content = '<li class="page-item"><a class="page-link" href="#">' + i +'</a></li>'
        $('#page').before(content);
    }
    
}

// 페이지네이션 업데이트 함수
function updatePagination() {
    totalPages = Math.ceil(tableData.length / pageSize);

     // 현재 페이지가 1이면 이전 버튼 비활성화
     $('#PreviousPageLink').prop('disabled', currentPage === 1);

     // 현재 페이지가 마지막 페이지면 다음 버튼 비활성화
     $('#NextPageLink').prop('disabled', currentPage === totalPages);

    // "1" 버튼 클릭 시 이전 페이지로 이동하는 이벤트
    $('.pagination .page-item:contains("1"), #PreviousPageLink').click(function () {
        if (currentPage > 1) {
            goToPage(1);
        }
    });

    // "2" 버튼 클릭 시 다음 페이지로 이동하는 이벤트
    $('.pagination .page-item:contains("2"), #NextPageLink').click(function () {
        var nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            goToPage(nextPage);
        }
    });
}

// 페이지 이동 함수
function goToPage(page) {
  currentPage = page;
  updateTable(getCurrentPageData());
  updatePagination();
}

// 현재 페이지에 해당하는 데이터 반환
function getCurrentPageData() {
  var startIndex = (currentPage - 1) * pageSize;
  var endIndex = Math.min(startIndex + pageSize, tableData.length);
  return tableData.slice(startIndex, endIndex);
}

// 검색 필터 적용 함수
function applySearchFilter() {
    var inputText = $('#searchInput').val();
    var searchType = $('.select .selected-value').text();

    // 검색어가 비어 있는 경우 페이지 초기화
    if (inputText === '') {
        currentPage = 1;
        updatePagination(); // 페이지네이션 업데이트 추가
        updateTable(getCurrentPageData());
        return;
    }

    // 조건에 따라 데이터 필터링
    var searchData = tableData.filter(function (item) {
        return (
            (searchType === '전체' && (item.leaderName.includes(inputText) || item.sportName.includes(inputText))) ||
            (searchType === '이름' && item.leaderName.includes(inputText)) ||
            (searchType === '종목' && item.sportName.includes(inputText))
        );
    });

    // "2" 버튼 숨기기
    $('.pagination .page-item:contains("2")').toggle(searchData <= pageSize);

    updateTable(searchData); // 필터링된 데이터를 표시
}

// 업데이트된 데이터로 테이블 갱신
function updateTable(data) {
    var str = '';

    if (data.length === 0) {
        // 검색된 결과가 없는 경우 메시지 표시
        str = '<tr><td colspan="6">검색된 결과가 없습니다.</td></tr>';
    } else {
        // 현재 페이지에서의 인덱스 계산
        var startIndex = (currentPage - 1) * pageSize;

        // 검색된 결과가 있는 경우 테이블 표시
        for (var i = 0; i < data.length; i++) {
            var number = startIndex + i + 1; // 현재 페이지에서의 인덱스 계산
            str += '<tr><td><input type="checkbox" class="checkbox">' + number + '</td><td>' + data[i].leaderNo + '</td><td>' + data[i].leaderName + '</td><td>' + data[i].sportName + '</td><td>' + data[i].schoolName + '</td><td><button class="detailsBtn">상세보기</button></td></tr>';
        }
    }

    $('.leaderTable_body').html(str);

    var totalLeaders = tableData.length;
    $('#totalleader').text('총 ' + totalLeaders + '명');

    // 전체 선택/해제 체크박스에 대한 이벤트
    $('#selectAll').change(function () {
        $('.leaderTable_body input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });

    // 개별 체크박스에 대한 이벤트
    $('.leaderTable_body').on('change', 'input[type="checkbox"]', function () {
        var allChecked = $('.leaderTable_body input[type="checkbox"]:checked').length === $('.leaderTable_body input[type="checkbox"]').length;
        $('#selectAll').prop('checked', allChecked);
    });
}

// 검색 필터 적용 버튼 클릭 이벤트
$('.search-button').click(function () {
    applySearchFilter();
});

// 검색어 입력 시 엔터 키 이벤트
$('#searchInput').keypress(function (e) {
    if (e.which === 13) { // 엔터 키
        applySearchFilter();
    }
});

// 삭제하기 버튼 클릭 시 팝업 창 표시
$('.button.delete').click(function () {
    var checkedItems = $('.leaderTable_body input[type="checkbox"]:checked');
    if (checkedItems.length > 0) {
        openDeletePopup(checkedItems);

        // 팝업 창 확인 버튼 클릭 시 삭제 동작
        $('#deletePopup .confirm').one('click', function () {
            checkedItems.each(function () {
                var row = $(this).closest('tr');
                var index = row.index();
                tableData.splice(index, 1); // 배열에서 해당 인덱스의 데이터 삭제
                row.remove();
            });

            // 팝업창 닫기
            $('#deletePopup').hide();

            // 페이지 업데이트
            updatePagination();
            updateTable(getCurrentPageData());
        });
    } else {
        alert('선택된 항목이 없습니다.');
    }
});


// 팝업 창 열기
function openDeletePopup(checkedItems) {
    // 팝업 열기
    var popup = document.getElementById('deletePopup');
    popup.style.display = 'block';

    // 확인 버튼 클릭
    document.querySelector('#deletePopup .confirm').addEventListener('click', function () {
        // 팝업 닫기
        popup.style.display = 'none';
    });

    $('#deletePopup .popup-button-box .register').on('click', function () {
        // 팝업창 닫기
        $('#deletePopup').hide();
    });
}

// ----------------------------------------------------------------------------------

// 페이지 로딩 시 실행되는 코드
$(document).ready(function () {

    // 클릭 이벤트
    $('.leaderTable_body').on('click', '.detailsBtn', function () {
        
        // 현재 클릭한 행에 있는 식별코드 가져오기
        var leaderNo = $(this).closest('tr').find('td:eq(1)').text();
        
        // 식별코드를 지도자 등록하기 페이지로 전달하여 이동
        window.location.href = 'detail.html?leaderNo=' + leaderNo;
    });

});