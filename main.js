song_one = "";
song_two = "";

song_one_status = "";
song_two_status = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

score_rightWrist = 0;
score_leftWrist = 0;

function preload() {
    song_one = loadSound("music.mp3");
    song_two = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 700);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is initialized.');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("score_leftWrist: " + score_leftWrist + " score_rightWrist: " + score_rightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX: " + leftWristX + " leftWristY: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX: " + rightWristX + " rightWristY: " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    song_one_status = song_one.isPlaying();
    song_two_status = song_two.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if (score_rightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song_two.stop();

        if (song_one_status == false) {
            song_one.play();
            document.getElementById("song_name").innerHTML = "Now playing: Harry Potter Theme Song";
        }
    }

    if (score_leftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song_one.stop();

        if (song_two_status == false) {
            song_two.play();
            document.getElementById("song_name").innerHTML = "Now playing: Peter Pan Song";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}