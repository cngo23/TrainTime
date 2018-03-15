$(document).ready(function () {

    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyBgV1W6PnPs8OD2S3rxHThniB_NCdLNiZU",
        authDomain: "traintime-24541.firebaseapp.com",
        databaseURL: "https://traintime-24541.firebaseio.com",
        projectId: "traintime-24541",
        storageBucket: "traintime-24541.appspot.com",
        messagingSenderId: "523003573186"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var ref = database.ref("trains");

    var train = "";
    var destination = "";
    var firstDepartTime = 0;
    var frequency = 0;

    ref.on("value", getData, errData);
    $("#addTrain").on("click", function () {
        event.preventDefault();

        train = $("#trainInput").val().trim();
        destination = $("#destInput").val().trim();
        firstDepartTime = $("#firstDepartTime").val().trim();
        frequency = $("#freqInput").val().trim();

        console.log(train);
        console.log(destination);
        console.log(firstDepartTime);
        console.log(frequency);

        //time conversion
        var firstTimeConverted = moment(firstDepartTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("difference in time: " + diffTime);

        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        var minTillTrain = frequency - tRemainder;
        console.log("minutes till train: " + minTillTrain);

        var nextTrain = moment().add(minTillTrain, "minutes");
        var nextTrainFormat = moment(nextTrain).format("hh:mm");
        console.log(nextTrain);
        console.log(nextTrainFormat);

        var data = {
            train: train,
            destination: destination,
            firstDepartTime: firstDepartTime,
            frequency: frequency,
            nextTrainFormat: nextTrainFormat,
            minTillTrain: minTillTrain
        }

        ref.push(data);
        ref.once("value", getData, errData);
        $(".text").val("");

    });

    function getData(data) {
        
        var trains = data.val();
        var keys = Object.keys(data);

        $("#tableInfo").empty();
        for(var i = 0; i < keys.length; i++) {
            var tRow = $("<tr>");
            var k = keys[i];

        $("<td scope='col'>").text(trains[k].train).appendTo(tRow);
        $("<td scope='col'>").text(trains[k].destination).appendTo(tRow);
        $("<td scope='col'>").text(trains[k].frequency).appendTo(tRow);

        $("<td scope='col'>").text(trains[k].nextTrainFormat).appendTo(tRow);
        $("<td scope='col'>").text(trains[k].minTillTrain).appendTo(tRow);

        $("#tableInfo").append(tRow);

        // ref.on("child_added", function (snapshot) {

        //     console.log(snapshot.val());

        //     console.log(snapshot.val().train);

        //     console.log(snapshot.val().destination);

        //     console.log(snapshot.val().firstDepartTime);

        //     console.log(snapshot.val().frequency);

        //     console.log(snapshot.val().nextTrainFormat);

        //     console.log(snapshot.val().minTillTrain);

        // })

        }
    }

    function errData(err) {
        console.log("Oh NO! Error!");
        console.log(err);
    }

});

