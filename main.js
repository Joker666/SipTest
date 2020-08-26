import {Web} from "sip.js";
import $ from "jquery";

const user = "1060";
const user2 = "1061";
const pass = "password";
const host = "3.20.234.178";
const port = "50600";
const sport = "8088";

const aor = "sip:" + user + "@" + host + ":" + port
const dest = "sip:" + user2 + "@" + host + ":" + port

// Helper function to get an HTML audio element
function getElement(id) {
    return document.getElementById(id);
}

// Options for SimpleUser
const options = {
    media: {
        constraints: { audio: true, video: false }, // audio only call
        remote: { audio: getElement("remoteAudio") } // play remote audio
    },
    aor: aor, // caller
    userAgentOptions: {
        authorizationUsername: user,
        authorizationPassword: pass
    }
};

// WebSocket server to connect with
const server = "ws://" + host + ":" + sport + "/ws";

// Construct a SimpleUser instance
const simpleUser = new Web.SimpleUser(server, options);


$(document).ready(() => {
    $("#startCall").click(function() {
        // Connect to server and place call
        simpleUser.connect()
            .then(() => {
                console.log("=======================> Connected to server");
                simpleUser.call(dest).then(() => {
                    console.log("=======================> Call connected");
                }).catch((error) => {
                    console.error(error);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    });
})