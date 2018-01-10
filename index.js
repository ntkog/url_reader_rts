
var exec = require('child_process').exec;

var extractor = require('unfluff');
var superagent = require('superagent');

const LANGUAGE = process.argv[2];
const URL = process.argv[3];
const FILENAME = process.argv[4];

superagent
  .get(URL)
  .end(function(err,res){
    let data = extractor.lazy(res.text, LANGUAGE);
      exec(`say -v Monica -o ${FILENAME}.wav --data-format=LEF32@22050 "${data.text()}"`, function (error, stdOut, stdErr) {
          // do what you want!
          console.log(`Text from [${URL} were save in [${FILENAME}]]`)
      });
  })
