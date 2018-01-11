
var exec = require('child_process').exec;

var extractor = require('unfluff');
var superagent = require('superagent');

const LANGUAGE = process.argv[2];
const URL = process.argv[3];
const FILENAME = process.argv[4];

console.log(`LANGUAGE: [${LANGUAGE}] , URL: [${URL}, FILENAME: [${FILENAME}.wav]`);
const SPEAKER = LANGUAGE === "es"
  ? "Monica"
  : "Alex";
superagent
  .get(URL)
  .end(function(err,res){
    let data = extractor.lazy(res.text, LANGUAGE);
    let OS_PLATFORM_COMMAND =  /^win/.test(process.platform)
    ? `voice.exe -f -o "${FILENAME}.wav" "${data.text()}"`
    : `say -v ${SPEAKER} -o ${FILENAME}.wav --data-format=LEF32@22050 "${data.text()}"`
      exec(OS_PLATFORM_COMMAND, function (error, stdOut, stdErr) {
          // do what you want!
          console.log(`Text from [${URL} were save in [${FILENAME}]]`)
      });
  })
