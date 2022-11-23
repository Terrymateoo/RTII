function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('mobilenet', mloaded);
}

function mloaded() {
  console.log('mobilenet inició');
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, res);  
}

var prevRes = '';
function res(error, results) {
  if (error) {
    console.error(error);
  }
  else {
    if ((results[0].confidence > 0.5) && prevRes != results[0].label) {
      console.log(results);
      prevRes = results[0].label;
      var ss = window.speechSynthesis;
      var jText = 'Object detected is: ' + results[0].label;
      var newS = new SpeechSynthesisUtterance(jText);
      ss.speak(newS);
      document.getElementById("ObjSpan").innerHTML = results[0].label;
      document.getElementById("AccSpan").innerHTML = results[0].confidence.toFixed(2);
    }
  }
}