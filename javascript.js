 
  var config = {
    apiKey: "AIzaSyA8RlQiJy2njlab0bNAB5noXX_yQuK8IrE",
    authDomain: "train-tracker-5a6bd.firebaseapp.com",
    databaseURL: "https://train-tracker-5a6bd.firebaseio.com",
    projectId: "train-tracker-5a6bd",
    storageBucket: "train-tracker-5a6bd.appspot.com",
    messagingSenderId: "498326329817"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var name;
  var dest;
  var time;
  var freq;

  $("button").on("click", function() {
  	event.preventDefault();
  	console.log(name);

  	name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    time = $("#time-input").val().trim();
    freq = $("#freq-input").val().trim();

    database.ref().push({
    	name: name,
    	dest: dest,
    	time: time,
    	freq: freq
    });

  });

  database.ref().on("child_added", function(childSnapshot) {
    var firstTrain = moment(childSnapshot.val().time, "hh:mm").subtract(1, "years");
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTrain), "minutes");

    var tRemainder = diffTime % childSnapshot.val().freq;

    var tMinutesTillTrain = childSnapshot.val().freq - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    	newRow = $("<tr>");
    	$("#trains").append(newRow);
    	newRow.append("<td>"+childSnapshot.val().name);
    	newRow.append("<td>"+childSnapshot.val().dest);
    	newRow.append("<td>"+childSnapshot.val().freq);
    	newRow.append("<td>"+moment(nextTrain).format("hh:mm"));    	
    	newRow.append("<td>"+tMinutesTillTrain);

    	$("input[type=text]").val("");
    	    
  });