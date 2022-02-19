var music1 = "";
var music2 = "";
var leftwristY = 0;
var leftwristX = 0;
var leftscore = 0;
var rightwristY = 0;
var rightwristX = 0;
var rightscore = 0;

function preload() {
    music1 = loadSound("music.mp3");
    music2=loadSound("poc.mp3")
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 500, 500);
    stroke("red");
    fill("red");

    if (leftscore > 0.1) {
        circle(leftwristX, leftwristY, 20);
        music2.stop();
        music1.play();
        music1.rate(0.75);
        document.getElementById("songbtn").innerHTML = "Song Playing: " + "Harry Potter Song";
    }

    if (rightscore > 0.1) {
        circle(rightwristX, rightwristY, 20);
        music1.stop();
        music2.play();
        music2.rate(0.75);
        document.getElementById("songbtn").innerHTML = "Song Playing: " +"Pirates of the Carribean song";
    }
}

function stopmusic() {
    music.stop();
}

function modelLoaded() {
    console.log("posenet is initialised");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristY = results[0].pose.leftWrist.y;
        leftwristX = results[0].pose.leftWrist.x;
        leftscore = results[0].pose.keypoints[9].score;
        rightwristY = results[0].pose.rightWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightscore = results[0].pose.keypoints[10].score;
    }
}