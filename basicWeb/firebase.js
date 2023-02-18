let humi = 100;
let temp = 50;
let light = 100;
let fanStatus = Boolean(false);
let ledStatus = Boolean(false);
let lat = 0;
let long = 0;

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

// Firebase 정보 가져오기
var ref = database.ref("smartFarm");
ref.on("value", gotData, errData);

function gotData(data) {
  // console.log(data.val());
  var val = data.val();
  // console.log(val);
  var keys = Object.keys(val);
  // console.log(keys);
  var values = Object.values(val);
  // console.log(values);

  // firebase에서 가져온 딕셔너리 안의 값을 변수에 넣는 코드
  mois = val.mois;
  temp = val.temp;
  light = val.light;
  ledStatus = val.led;
  fanStatus = val.fan;

  //firebase에서 가져온 값을 HTML파일에 보여주는 코드
  document.getElementById("mois").innerHTML = "Moisture: " + mois;
  document.getElementById("temp").innerHTML = "Temperature: " + temp;
  document.getElementById("light").innerHTML = "Light: " + light;

  // console.log(val.mois)
  // console.log(val.temp)
  // console.log(val.light)
  // console.log(ledStatus)
  // console.log(fanStatus)

  // firebase에서 가져온 키와 값을 콘솔에 보여주는 코드
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    //console.log(k)
    var v = values[i];
    //console.log(v);
    console.log(k + ":" + v);
  }

  // 버튼 상태 싱크
  if (ledStatus == false) {
    // ledButton 토글
    const ledButton = document.getElementById('ledButton');
  }

  if (fanStatus == false) {
    // fanButton 토글
    const fanButton = document.getElementById('fanButton');
  }
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}

// led 상태를 확인하고 1(켜짐)이면 0(꺼짐)으로, 0(꺼짐)이면 1(켜짐)으로 Firebase 데이터를 업데이트 하고, 버튼 이미지의 밝기를 조정함
function ledOnOff() {
  if (ledStatus == false) {
    ledStatus = true;

    var ref = database.ref('smartFarm');
    ref.update({
      led: 1
    })
  } else {
    ledStatus = false;

    var ref = database.ref('smartFarm');
    ref.update({
      led: 0
    })
  }
  //console.log(ledStatus);
}

// fan 상태를 확인하고 1(켜짐)이면 0(꺼짐)으로, 0(꺼짐)이면 1(켜짐)으로 Firebase 데이터를 업데이트 하고, 버튼 이미지의 밝기를 조정함
function fanOnOff() {
  if (fanStatus == false) {
    fanStatus = true;

    var ref = database.ref('smartFarm');
    ref.update({
      fan: 1
    })
  } else {
    fanStatus = false;

    var ref = database.ref('smartFarm');
    ref.update({
      fan: 0
    })
  }
  //console.log(fanStatus);
}
