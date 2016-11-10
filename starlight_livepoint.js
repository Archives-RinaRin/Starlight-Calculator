function dmod(x,y){return x-(y * Math.floor(x / y));}

function maxPointsByLevel(){
var level = new Number(document.getElementById("prod_level").value);

if(level == 1){return 40;}
else if(level >= 2 && level <= 3){return 41;}
else if(level >= 4 && level <= 5){return 42;}
else if(level >= 6 && level <= 7){return 43;}
else if(level >= 8 && level <= 9){return 44;}
else if(level >= 10 && level <= 11){return 45;}
else if(level >= 12 && level <= 13){return 46;}
else if(level >= 14 && level <= 15){return 47;}
else if(level >= 16 && level <= 17){return 48;}
else if(level >= 18 && level <= 19){return 49;}
else if(level >= 20 && level <= 22){return 50;}
else if(level >= 23 && level <= 25){return 51;}
else if(level >= 26 && level <= 28){return 52;}
else if(level >= 29 && level <= 31){return 53;}
else if(level >= 32 && level <= 34){return 54;}
else if(level >= 35 && level <= 37){return 55;}
else if(level >= 38 && level <= 40){return 56;}
else if(level >= 41 && level <= 43){return 57;}
else if(level >= 44 && level <= 46){return 58;}
else if(level >= 47 && level <= 49){return 59;}
else if(level >= 50 && level <= 53){return 60;}
else if(level >= 54 && level <= 57){return 61;}
else if(level >= 58 && level <= 61){return 62;}
else if(level >= 62 && level <= 65){return 63;}
else if(level >= 66 && level <= 69){return 64;}
else if(level >= 70 && level <= 73){return 65;}
else if(level >= 74 && level <= 77){return 66;}
else if(level >= 78 && level <= 81){return 67;}
else if(level >= 82 && level <= 85){return 68;}
else if(level >= 86 && level <= 89){return 69;}
else if(level >= 90 && level <= 94){return 70;}
else if(level >= 95 && level <= 99){return 71;}
else if(level >= 100 && level <= 104){return 72;}
else if(level >= 105 && level <= 109){return 73;}
else if(level >= 110 && level <= 114){return 74;}
else if(level >= 115 && level <= 119){return 75;}
else if(level >= 120 && level <= 124){return 76;}
else if(level >= 125 && level <= 129){return 77;}
else if(level >= 130 && level <= 134){return 78;}
else if(level >= 135 && level <= 139){return 79;}
else if(level >= 140 && level <= 149){return 80;}
else if(level >= 150 && level <= 159){return 81;}
else if(level >= 160 && level <= 169){return 82;}
else if(level >= 170 && level <= 179){return 83;}
else if(level >= 180 && level <= 189){return 84;}
else if(level >= 190 && level <= 199){return 85;}
else if(level >= 200 && level <= 209){return 86;}
else if(level >= 210 && level <= 219){return 87;}
else if(level >= 220 && level <= 229){return 88;}
else if(level >= 230 && level <= 239){return 89;}
else if(level >= 240 && level <= 249){return 90;}
else if(level >= 250 && level <= 259){return 91;}
else if(level >= 260 && level <= 269){return 92;}
else if(level >= 270 && level <= 279){return 93;}
else if(level >= 280 && level <= 289){return 94;}
else if(level >= 290 && level <= 299){return 95;}
else if(level == 300){return 96;}
else{return 0;}
}

function displayMaxPoint(){
document.getElementById("max_point").innerHTML = maxPointsByLevel();
}

function calcPoint(){

var curTimestamp = new Date();
var maxPoint = maxPointsByLevel();
var curPoint = new Number(document.getElementById("point_now").value);

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

document.getElementById("calc_result").innerHTML = "최대치 : "+maxPoint+", 현재 수치 : "+curPoint+"<br />기준 시간 : "+curTimeFormat+"<br />예상 시간 : "+estimatedTimeFormat+" 전후 ("+elapsedHours+"시간 "+elapsedMins+"분 전후)"


}


