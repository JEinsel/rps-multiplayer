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

p1Name = ""
p1Enter = false
p1Wins = 0
p1Losses = 0
p1Guess = ""

p2Name = ""
p2Enter = false
p2Wins = 0
p2Losses = 0
p2Guess = ""


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
    database.ref().set({
        p1Name: p1Name,
        p1Enter: true,
    })
})
$("#player2Enter").on("click", function () {
    console.log("I have been clicked");
    p2Name = prompt("What is your name?");
    $("#player2Enter").attr("disabled", true);
    p2Enter = true;
    database.ref().add({
        p2Name: p2Name,
        p2Enter: true,
    })
})


$("#player1Enter").on("click", function () {
    console.log("I have been clicked (rock)");
    p1Guess = "rock"
    database.ref().set({
        p1Guess: p1Guess
    })
})
$("#player1Enter").on("click", function () {
    console.log("I have been clicked (rock)");
    database.ref().set({
        p1Guess: "rock"
    })
    p1Guess = "rock"
})

$("#reset").on("click", function () {
    $("#player1Enter").attr("disabled", false)
    $("#player2Enter").attr("disabled", false)
    // Setting values back to default
    p1Name = ""
    p1Enter = false
    p1Wins = 0
    p1Losses = 0
    p1Guess = ""

    p2Name = ""
    p2Enter = false
    p2Wins = 0
    p2Losses = 0
    p2Guess = ""

    database.ref().set({
        p1Name: p1Name,
        p1Enter: false,
        p1Wins: 0,
        p1Losses: 0,
        p1Guess: "",

        p2Name: p1Name,
        p2Enter: false,
        p2Wins: 0,
        p2Losses: 0,
        p2Guess: "",
    })
})

$("#player1Losses").text(database.ref().p1Losses)

database.on("value", function (snapshot) {

    if (p1Guess === "rock" && p2Guess === "paper") {
        p1Wins++
        alert("P1 wins!")
    }

})