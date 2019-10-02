// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC1YJufOXeRj4Fmf71hu1zvDCLvotZ_uB8",
    authDomain: "rps-multiplayer-40d11.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-40d11.firebaseio.com",
    projectId: "rps-multiplayer-40d11",
    storageBucket: "",
    messagingSenderId: "808909169259",
    appId: "1:808909169259:web:63f07c749eb29288df872e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database()


// Establishing values


var p1Name = ""
var p1Enter = false
var p1Wins = 0
var p1Losses = 0
var p1Guess = ""
var ties = 0
var p2Name = ""
var p2Enter = false
var p2Wins = 0
var p2Losses = 0
var p2Guess = ""

var message = $("#messages").val()

// var messageTest




$("#submitButton").on("click", function (event) {
    event.preventDefault()
    message = $("#message").val()
    console.log(message)
    $("#messages").append(message + "<br>")
    database.ref().update({
        message: message
    })
    $("#message").val(" ");

})

var chatDatabase = database.ref("/messages");

// TESTING CONNECTIONS
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function (snapshot) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#watchers").text(snapshot.numChildren());
});




// Enter buttons 
$("#player1Enter").on("click", function () {
    console.log("I have been clicked");
    p1Name = prompt("What is your name?");
    $("#player1Enter").attr("disabled", true);
    p1Enter = true;
    database.ref().update({
        p1Name: p1Name,
        p1Enter: true,
    })
})

$("#player2Enter").on("click", function () {
    console.log("I have been clicked");
    p2Name = prompt("What is your name?");
    $("#player2Enter").attr("disabled", true);
    p2Enter = true;
    database.ref().update({
        p2Name: p2Name,
        p2Enter: true,
    })
})


$("#player1Rock").on("click", function () {
    console.log("I have been clicked (rock)");
    p1Guess = "rock"
    database.ref().update({
        p1Guess: p1Guess
    })
})

$("#player1Paper").on("click", function () {
    console.log("I have been clicked (paper)");
    p1Guess = "paper"
    database.ref().update({
        p1Guess: p1Guess
    })
})

$("#player1Scissors").on("click", function () {
    console.log("I have been clicked (scissors)");
    p1Guess = "scissors"
    database.ref().update({
        p1Guess: p1Guess
    })
})

$("#player2Rock").on("click", function () {
    console.log("I have been clicked (rock2)");
    p2Guess = "rock"
    database.ref().update({
        p2Guess: p2Guess
    })
})

$("#player2Paper").on("click", function () {
    console.log("I have been clicked (paper2)");
    p2Guess = "paper"
    database.ref().update({
        p2Guess: p2Guess
    })
})

$("#player2Scissors").on("click", function () {
    console.log("I have been clicked (scissors2)");
    p2Guess = "scissors"
    database.ref().update({
        p2Guess: p2Guess
    })
})



$("#reset").on("click", function () {
    $("#player1Enter").attr("disabled", false)
    $("#player2Enter").attr("disabled", false)
    // $("#watchers").text(snapshot.numChildren());

    // updating values back to default
    p1Name = ""
    p1Enter = false
    p1Wins = 0
    p1Losses = 0
    p1Guess = ""
    ties = 0
    p2Name = ""
    p2Enter = false
    p2Wins = 0
    p2Losses = 0
    p2Guess = ""

    chatDatabase.ref().set({
        messages: " ",
    })

    database.ref().set({
        messages: " ",
        p1Name: p1Name,
        p1Enter: false,
        p1Wins: 0,
        p1Losses: 0,
        p1Guess: "",
        ties: 0,
        p2Name: p2Name,
        p2Enter: false,
        p2Wins: 0,
        p2Losses: 0,
        p2Guess: "",
    })
})

$("#player1Losses").text(database.ref().p1Losses)

database.ref().on("value", function (snapshot) {
    $("#player1Name").text(snapshot.val().p1Name)
    $("#player2Name").text(snapshot.val().p2Name)

    $("#player1Wins").text(snapshot.val().p1Wins);
    $("#player2Wins").text(snapshot.val().p2Wins);
    $("#player1Losses").text(snapshot.val().p1Losses);
    $("#player2Losses").text(snapshot.val().p2Losses);
    $("#ties").text(snapshot.val().ties);
    if (p1Guess != "" && p2Guess != "") {
        // if ((p1Guess === "rock") || (p1Guess === "paper") || (p1Guess === "scissors")) {
        if ((p1Guess === "rock" && p2Guess === "scissors") ||
            (p1Guess === "scissors" && p2Guess === "paper") ||
            (p1Guess === "paper" && p2Guess === "rock")) {
            p1Wins++;
            alert("Player 1 win - " + p1Guess + " vs " + p2Guess)
            p2Losses++;
            p1Guess = ""
            p2Guess = ""
        } else if (p1Guess === p2Guess) {
            alert("Tie! " + p1Guess + " " + p2Guess)
            ties++;
            p1Guess = ""
            p2Guess = ""
        } else {
            alert("Player 2 win - " + p1Guess + " vs " + p2Guess)
            p1Losses++;
            p2Wins++;
            p1Guess = ""
            p2Guess = ""
        }
        database.ref().update({
            p1Wins: p1Wins,
            p2Wins: p2Wins,
            p1Losses: p1Losses,
            p2Losses: p2Losses,
            p1Guess: "",
            p2Guess: "",
            ties: ties,
        })
        // }
    }
})


database.ref().on("value", function (snap) {

    // $("#messages").append(database.ref().messages)
    $("#messages").append(message + "<br>")



    database.ref().update({


    })


})
