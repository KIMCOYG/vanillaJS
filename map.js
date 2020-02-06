const toDoMap = document.querySelector(".js-map"),
    toDoMapInput = toDoMap.querySelector("input"),
    jsToDoList = document.querySelector(".js-toDoList"),
    toDoList_lists = jsToDoList.querySelectorAll("li")
    editForm = document.querySelector(".js-edit-form")
    editInput = editForm.querySelector("input");

const COOORD = 'coords',
    toDos_LS = 'toDos',
    d_block = 'd-block';

var tempId; //showMap 사용

var mapGetLocalStorage;
var mapParseLocalStorage;

var map;
var infoWindow = new naver.maps.InfoWindow({
    anchorSkew: true
  });

function addListen(){
    toDoList_lists.forEach(function(childList){
        const toDoList_form = childList.querySelector("form");
        const toDoList_span = toDoList_form.querySelector("span");
        // console.log(toDoList_span);
        toDoList_span.addEventListener("click", showMap);
    });
}

function showMap(event){
    const clicked = event.target
    const spanText = clicked.innerText;
    tempId = clicked;
    editForm.classList.add(d_block, "mt-2");
    editInput.value = spanText;
    searchAddressToCoordinate(spanText);
    // console.log(tempId);
}

function getMap(lat, lng){
    var mapOptions = {
        // mapTypeControl: true,
        useStyleMap: true,
        zoomControl: true,
        zoomControlOptions: {
          // style: ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT
        },
        center: new naver.maps.LatLng(lat, lng),
        zoom: 10
    }
    // console.log(mapOptions);
    map = new naver.maps.Map('map', mapOptions);
    map.setCursor('pointer');
}

function searchAddressToCoordinate(address){
    naver.maps.Service.geocode({
        query: address
      }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          if (!address) {
            return alert('Geocode Error, Please check address');
          }
          return alert('Geocode Error, address:' + address);
        }
    
        if (response.v2.meta.totalCount === 0) {
          return alert('No result.');
        }
    
        var htmlAddresses = [],
          item = response.v2.addresses[0],
          point = new naver.maps.Point(item.x, item.y);

        // console.log(item);
    
        if (item.roadAddress) {
          htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        }
    
        if (item.jibunAddress) {
          htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
        }
    
        if (item.englishAddress) {
          htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
        }
    
        infoWindow.setContent([
          '<div style="padding:10px;min-width:200px;line-height:150%;">',
          '<h4 style="margin-top:5px;">검색 주소 : '+ address +'</h4><br />',
          htmlAddresses.join('<br />'),
          '</div>'
        ].join('\n'));
    
        map.setCenter(point);
        infoWindow.open(map, point);
      });
}

function loadMaps(){
    mapGetLocalStorage = localStorage.getItem(COORDS);
    mapParseLocalStorage = JSON.parse(mapGetLocalStorage);
    getMap(mapParseLocalStorage.latitude, mapParseLocalStorage.longitude);
}

function searchLocaiton(event){
    event.preventDefault();
    const searchedAddress = toDoMapInput.value;
    searchAddressToCoordinate(searchedAddress);
    // toDoMapInput.value = "";
}

function editLocation(){ //여기부터 작업하기
  event.preventDefault();

  mapGetLocalStorage = localStorage.getItem(toDos_LS);
  mapParseLocalStorage = JSON.parse(mapGetLocalStorage);

  const changeText = tempId;
  const locationForm = changeText.parentNode;
  const locationList = locationForm.parentNode;
  const editValue = editInput.value;

  mapParseLocalStorage[locationList.id-1].location = editValue;
  changeText.innerText = editValue;
  
  localStorage.removeItem(toDos_LS);
  localStorage.setItem(toDos_LS, JSON.stringify(mapParseLocalStorage));

  editForm.classList.remove(d_block, "mt-2");
}

function init(){
    loadMaps();
    toDoMap.addEventListener("submit", searchLocaiton);
    editForm.addEventListener("submit", editLocation);
    addListen();
}

init();