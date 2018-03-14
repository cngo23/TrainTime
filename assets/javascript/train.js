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

  var train = "";
  var destination = "";
  var firstDepartTime = 0;
  var frequency = 0;

  $("#addTrain").on("click", function() {
      event.preventDefault();
      

      train = $("#trainInput").val().trim();
      destination = $("#destInput").val().trim();
      firstDepartTime = $("#firstDepartTime").val().trim();
      frequency = $("#freqInput").val().trim();

      console.log(train);
      console.log(destination);
      console.log(firstDepartTime);
      console.log(frequency);

      database.ref().push({
          train: train,
          destination: destination,
          firstDepartTime: firstDepartTime,
          frequency: frequency
      });

      
  });
  $(".adds").remove();

  database.ref().on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
          $("#trainInfo").append(`<tr class="adds"> 
          <td> ${train} </td> 
          <td> ${destination} </td>
          <td> ${frequency} </td>
          <td> ${firstDepartTime} </td> 
          <td> will know later </td>
           </tr>`);

      })
  })

  
