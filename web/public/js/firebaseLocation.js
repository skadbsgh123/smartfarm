// GPS좌표 및 위치 리음 설정
let lat = 0;
let long = 0;
let label = "윤호 집"

// Firebase 접근 정보
var config = {
  apiKey: "AIzaSyCQaI6w7uYNInG4qm0_kYDQO4c1MTRvlkQ",
  authDomain: "smartfarm-by-uno.firebaseapp.com",
  databaseURL: "https://smartfarm-by-uno-default-rtdb.firebaseio.com",
  projectId: "smartfarm-by-uno",
  storageBucket: "smartfarm-by-uno.appspot.com",
  messagingSenderId: "539594160685",
  appId: "1:539594160685:web:ad641665e582b7b71a96a4",
  measurementId: "G-BJ95YQZSYS"
};
firebase.initializeApp(config);
database = firebase.database();


// 지도 정보 가져오기
function initMap() {
  // 위치 정보 가져오기
  var refLocation = database.ref("location");
  refLocation.on("value", gotLocation, errData);

  function gotLocation(data) {
    console.log(data.val());
    // console.log(data.val()["lat"])
    // console.log(data.val()["long"])
    lat = data.val()["lat"]
    long = data.val()["long"]

    // console.log(lat, long)
    var seoul = { lat: lat, lng: long };
    var map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 12,
        center: seoul
      });

      new google.maps.Marker({
      position: seoul,
      map: map,
      label: label
    });
  }

  function errData(err) {
    console.log("Error!");
    console.log(err);
  }


}
