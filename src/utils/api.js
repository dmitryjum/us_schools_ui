import axios from 'axios'
import * as constants from "../constants/env/us_states_api";

class USUApi {
  static async getSchools(params) {
    params = params || {}
    return axios.get(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/schools`, {
      headers: { 'Accept': 'application/json' },
      params: params
    })
  }

  static async getTopTwentyKeys() {
    return axios.get(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/schools/top_twenty_keys`, {
      headers: {'Accept': 'application/json'}
    })
  }
}

export default USUApi