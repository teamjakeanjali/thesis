var express = require("express");
var bodyParser = require("body-parser");
var SoxCommand = require("sox-audio");
var command = SoxCommand();
const fs = require("fs");
const speech = require("@google-cloud/speech");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE

var app = express();

app.use(express.static(__dirname + "/../react-client/dist"));

const convertAudio = inputStream => {
  let outputStream;

  command
    .input(inputStream)
    .inputSampleRate(1600)
    .inputEncoding("signed")
    .inputBits(16)
    .inputChannels(2)
    .inputFileType("wav");

  command
    .output(outputStream)
    .outputSampleRate(44100)
    .outputEncoding("FLAC")
    .outputBits(16)
    .outputChannels(1)
    .outputFileType("flac");
};

app.post("/audio", function(req, res) {
  // function syncRecognize(filename, encoding, sampleRateHertz, languageCode) {
  // [START speech_sync_recognize]
  // Imports the Google Cloud client library

  // Creates a client
  const client = new speech.SpeechClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  const filename = "./assets/test.flac";
  const encoding = "FLAC";
  const sampleRateHertz = 44100;
  const languageCode = "en-US";

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode
  };
  const audio = {
    content: fs.readFileSync(filename).toString("base64")
  };

  const request = {
    config: config,
    audio: audio
  };

  // Detects speech in the audio file
  client
    .recognize(request)
    .then(data => {
      const response = data[0];
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");
      console.log(`Transcription: `, transcription);
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
  // [END speech_sync_recognize]
  // }
});

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
