const core = require('@actions/core');
const axios = require("axios")

async function run() {
  let AKTO_START_TEST_ENDPOINT = ""

  const AKTO_DASHBOARD_URL = core.getInput('AKTO_DASHBOARD_URL')
  const AKTO_API_KEY = core.getInput('AKTO_API_KEY')
  const AKTO_TEST_ID = core.getInput('AKTO_TEST_ID')
  const START_TIME_DELAY = core.getInput('START_TIME_DELAY')
  
  let startTimestamp = 0;
  if(START_TIME_DELAY!=''){
    let delay = parseInt(START_TIME_DELAY);
    if(!isNaN(delay)){
      startTimestamp = Date.now()/1000 + delay;
    }
  }

  if (AKTO_DASHBOARD_URL.endsWith("/")) {
    AKTO_START_TEST_ENDPOINT = AKTO_DASHBOARD_URL + "api/startTest"
  } else {
    AKTO_START_TEST_ENDPOINT = AKTO_DASHBOARD_URL + "/api/startTest"
  }

   const data = {
    "testingRunHexId": AKTO_TEST_ID,
    "startTimestamp" : startTimestamp,
    "metadata": {
      "platform": "Github Actions",
      "repository": process.env.GITHUB_REPOSITORY,
      "repository_url": process.env.GITHUB_SERVER_URL + "/" + process.env.GITHUB_REPOSITORY, 
      "branch": process.env.GITHUB_REF_NAME,
      "commit_sha": process.env.GITHUB_SHA
    }
  }

  const config = {
    method: 'post',
    url: AKTO_START_TEST_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': AKTO_API_KEY,
    },
    data: data
  }

  try {
    res = await axios(config)
    console.log("Akto CI/CD test started")
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();