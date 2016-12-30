function dmod(x,y){return x-(y * Math.floor(x / y));}

function maxPointsByLevel(){
 var level = new Number(document.getElementById("prod_level").value); // 입력 프로듀서 레벨
 
 var basePoint = 40; // 1레벨 때의 최대 스태미나
 var maxPoint = basePoint;
 for(var k=0; k<level; k++){
  if(k < 20){maxPoint += (1 / 2);} // 20레벨 이하 : 2레벨당 1 증가
  else if(k < 50){maxPoint += (1 / 3);} // 21~50레벨 : 3레벨당 1 증가
  else if(k < 90){maxPoint += (1 / 4);} // 51~90레벨 : 4레벨당 1 증가
  else if(k < 140){maxPoint += (1 / 5);} // 91~140레벨 : 5레벨당 1 증가
  else if(k < 300){maxPoint += (1 / 10);} // 141~300레벨 : 10레벨당 1 증가
  else{maxPoint = 0;}
 }
 if(level == 300){maxPoint++;}
 
 return Math.floor(maxPoint);
}

function displayMaxPoint(){document.getElementById("max_point").innerHTML = maxPointsByLevel();}


/**
 * 잔여 스태미나에 따른 회복 계산
 */
function calcPoint(){

 var curTimestamp = new Date();
 var maxPoint = maxPointsByLevel();
 var curPoint = new Number(document.getElementById("point_now").value); // 현재 스태미나

 var elapsedTime = (5 * 60 * (maxPoint-curPoint));
 var estimatedMaxPointTime = new Date(new Number(curTimestamp)+(1000 * elapsedTime));

 var curMonth = curTimestamp.getMonth()+1;
 var curDate = curTimestamp.getDate();
 var curHour = curTimestamp.getHours();
 var curMin = curTimestamp.getMinutes();


 var estimatedMonth = estimatedMaxPointTime.getMonth()+1;
 var estimatedDate = estimatedMaxPointTime.getDate();
 var estimatedHour = estimatedMaxPointTime.getHours();
 var estimatedMin = estimatedMaxPointTime.getMinutes();

 var elapsedHours = Math.floor(((maxPoint-curPoint) * 5) / 60);
 var elapsedMins = dmod(((maxPoint-curPoint) * 5),60);


 var estimatedTimeFormat = estimatedMonth+"월 "+estimatedDate+"일 "+estimatedHour+"시 "+estimatedMin+"분";
 var curTimeFormat = curMonth+"월 "+curDate+"일 "+curHour+"시 "+curMin+"분";

 document.getElementById("calc_result").innerHTML = "최대치 : "+maxPoint+", 현재 수치 : "+curPoint+"<br />기준 시간 : "+curTimeFormat+"<br />예상 시간 : "+estimatedTimeFormat+" 전후 ("+elapsedHours+"시간 "+elapsedMins+"분 전후)";
}

/**
 * 곡 갯수별 소모 스태미나에 따른 계산
 */
function calcPointPerSong(){
var pointsPerSong = new Number(document.getElementById("pts_per_song").value); // 곡당 스태미나
var numOfSongs = new Number(document.getElementById("num_songs").value); // 곡 갯수
var eventCommodities = (25+((pointsPerSong-10) * 3))+Math.floor(pointsPerSong / 15); // 곡당 이벤트 재화 (재화수집 이벤트) 획득 수 계산

var totalPoints = (pointsPerSong * numOfSongs); // 합계 소모 스태미나
var totalEventCommodities = (eventCommodities * numOfSongs); // 획득 이벤트 재화

var curTimestamp = new Date();
var maxPoint = maxPointsByLevel();

var elapsedTime = Math.abs(5 * 60 * (maxPoint-(maxPoint-totalPoints)));

if((maxPoint-totalPoints) < 0){
 alert("소모되는 스태미나가 최대 스태미나보다 많습니다.");
 return;
}

var estimatedMaxPointTime = new Date(new Number(curTimestamp)+(1000 * elapsedTime));

var curMonth = curTimestamp.getMonth()+1;
var curDate = curTimestamp.getDate();
var curHour = curTimestamp.getHours();
var curMin = curTimestamp.getMinutes();


var estimatedMonth = estimatedMaxPointTime.getMonth()+1;
var estimatedDate = estimatedMaxPointTime.getDate();
var estimatedHour = estimatedMaxPointTime.getHours();
var estimatedMin = estimatedMaxPointTime.getMinutes();

var elapsedHours = Math.floor(((maxPoint-(maxPoint-totalPoints)) * 5) / 60);
var elapsedMins = dmod(((maxPoint-(maxPoint-totalPoints)) * 5),60);


var estimatedTimeFormat = estimatedMonth+"월 "+estimatedDate+"일 "+estimatedHour+"시 "+estimatedMin+"분";
var curTimeFormat = curMonth+"월 "+curDate+"일 "+curHour+"시 "+curMin+"분";

document.getElementById("calc_result").innerHTML = "최대치 : "+maxPoint+", 소모량 : "+totalPoints+" ("+pointsPerSong+" x "+numOfSongs+"곡)<br />(획득 이벤트 재화 : "+totalEventCommodities+"개)<br />기준 시간 : "+curTimeFormat+"<br />예상 시간 : "+estimatedTimeFormat+" 전후 ("+elapsedHours+"시간 "+elapsedMins+"분 전후)";

}

/**
 * 그루브(버스트) 소모 스태미나 회복 계산
 */
function calcLiveGroove(){
 var pointsPerDifficulty = new Number(document.getElementById("pts_per_difficulty").value);
 var isSpecialDifficulty = document.getElementById("special_difficulty").checked; // 앵콜곡 마스터+ 난이도 여부
 if(pointsPerDifficulty == 20){ // 데뷔
  var eventPointsShort = 144;
  var eventPointsLong = eventPointsShort+32;
 }else if(pointsPerDifficulty == 30){ // 레귤러
  var eventPointsShort = 239;
  var eventPointsLong = eventPointsShort+53;
 }else if(pointsPerDifficulty == 40){ // 프로
  var eventPointsShort = 343;
  var eventPointsLong = eventPointsShort+76;
 }else if(pointsPerDifficulty == 50){ // 마스터
  var eventPointsShort = 461;
  var eventPointsLong = (isSpecialDifficulty == true) ? (eventPointsShort+114) : (eventPointsShort+103);
 }
 
 var curTimestamp = new Date();
 var maxPoint = maxPointsByLevel();

 var elapsedTime = Math.abs(5 * 60 * (maxPoint-(maxPoint-pointsPerDifficulty)));
 if((maxPoint-pointsPerDifficulty) < 0){
  alert("소모되는 스태미나가 최대 스태미나보다 많습니다.");
  return;
 }

 var estimatedMaxPointTime = new Date(new Number(curTimestamp)+(1000 * elapsedTime));

 var curMonth = curTimestamp.getMonth()+1;
 var curDate = curTimestamp.getDate();
 var curHour = curTimestamp.getHours();
 var curMin = curTimestamp.getMinutes();


 var estimatedMonth = estimatedMaxPointTime.getMonth()+1;
 var estimatedDate = estimatedMaxPointTime.getDate();
 var estimatedHour = estimatedMaxPointTime.getHours();
 var estimatedMin = estimatedMaxPointTime.getMinutes();

 var elapsedHours = Math.floor(((maxPoint-(maxPoint-pointsPerDifficulty)) * 5) / 60);
 var elapsedMins = dmod(((maxPoint-(maxPoint-pointsPerDifficulty)) * 5),60);


 var estimatedTimeFormat = estimatedMonth+"월 "+estimatedDate+"일 "+estimatedHour+"시 "+estimatedMin+"분";
 var curTimeFormat = curMonth+"월 "+curDate+"일 "+curHour+"시 "+curMin+"분";
  
 document.getElementById("calc_result").innerHTML = "최대치 : "+maxPoint+", 소모량 : "+pointsPerDifficulty+"<br />(최대 획득 이벤트 포인트 : "+eventPointsShort+"~"+eventPointsLong+"pts)<br />기준 시간 : "+curTimeFormat+"<br />예상 시간 : "+estimatedTimeFormat+" 전후 ("+elapsedHours+"시간 "+elapsedMins+"분 전후)";
}

/**
 * 퍼레이드(투어) 소모 스태미나 회복 계산
 */
function calcLiveTour(){
 var pointsPerCourse = new Number(document.getElementById("pts_per_course").value);
 var eventAudiences = 0; // 확보 관객수
 if(pointsPerCourse == 10){var eventAudiences = 3400;} // 1곡
 else if(pointsPerCourse == 15){var eventAudiences = 5600;} // 1곡
 else if(pointsPerCourse == 20){var eventAudiences = 8000;} // 1곡
 else if(pointsPerCourse == 25){var eventAudiences = 8900;} // 2곡
 else if(pointsPerCourse == 30){var eventAudiences = 11700;} // 2곡
 else if(pointsPerCourse == 35){var eventAudiences = 14700;} // 2곡
 else if(pointsPerCourse == 40){var eventAudiences = 14900;} // 3곡
 else if(pointsPerCourse == 45){var eventAudiences = 18400;} // 3곡
 else if(pointsPerCourse == 50){var eventAudiences = 22000;} // 3곡
  
 var curTimestamp = new Date();
 var maxPoint = maxPointsByLevel();
 var elapsedTime = Math.abs(5 * 60 * (maxPoint-(maxPoint-pointsPerCourse)));

 if((maxPoint-pointsPerCourse) < 0){
  alert("소모되는 스태미나가 최대 스태미나보다 많습니다.");
  return;
 }

 var estimatedMaxPointTime = new Date(new Number(curTimestamp)+(1000 * elapsedTime));

 var curMonth = curTimestamp.getMonth()+1;
 var curDate = curTimestamp.getDate();
 var curHour = curTimestamp.getHours();
 var curMin = curTimestamp.getMinutes();

 var estimatedMonth = estimatedMaxPointTime.getMonth()+1;
 var estimatedDate = estimatedMaxPointTime.getDate();
 var estimatedHour = estimatedMaxPointTime.getHours();
 var estimatedMin = estimatedMaxPointTime.getMinutes();

 var elapsedHours = Math.floor(((maxPoint-(maxPoint-pointsPerCourse)) * 5) / 60);
 var elapsedMins = dmod(((maxPoint-(maxPoint-pointsPerCourse)) * 5),60);

 var estimatedTimeFormat = estimatedMonth+"월 "+estimatedDate+"일 "+estimatedHour+"시 "+estimatedMin+"분";
 var curTimeFormat = curMonth+"월 "+curDate+"일 "+curHour+"시 "+curMin+"분";
 
 document.getElementById("calc_result").innerHTML = "최대치 : "+maxPoint+", 소모량 : "+pointsPerCourse+"<br />(확보 관객수 : 최소 "+eventAudiences+"명 이상)<br />기준 시간 : "+curTimeFormat+"<br />예상 시간 : "+estimatedTimeFormat+" 전후 ("+elapsedHours+"시간 "+elapsedMins+"분 전후)";
}

