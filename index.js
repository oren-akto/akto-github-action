const core = require('@actions/core');
const axios = require("axios")

async function run() {
  let AKTO_START_TEST_ENDPOINT = ""

  const AKTO_DASHBOARD_URL = core.getInput('AKTO_DASHBOARD_URL');
  const AKTO_API_KEY = core.getInput('AKTO_API_KEY');
  const AKTO_TEST_CONFIGURATION = core.getInput('AKTO_TEST_CONFIGURATION')
  
  const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY
  const GITHUB_REF_NAME = process.env.GITHUB_REF_NAME
  const GITHUB_SHA = process.env.GITHUB_SHA

  if (AKTO_DASHBOARD_URL.endsWith("/")) {
    AKTO_START_TEST_ENDPOINT = AKTO_DASHBOARD_URL + "api/startTest"
  } else {
    AKTO_START_TEST_ENDPOINT = AKTO_DASHBOARD_URL + "/api/startTest"
  }

  const config = {
    method: 'post',
    url: AKTO_START_TEST_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': AKTO_API_KEY,
      'account': 1000000
    },
    data: AKTO_TEST_CONFIGURATION
  }

  try {
    await axios(config)
    console.log("Akto CI/CD test started")
  } catch (error) {
    core.setFailed(error.message);
  }

}

run();