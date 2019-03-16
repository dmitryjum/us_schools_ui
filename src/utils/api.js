import axios from 'axios'
import * as constants from "../constants/env/us_states_api";

class USUApi {
  static async getSchools(params={}) {
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

  static async search(params={'term': ''}) {
    return axios.get(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/schools/search`, {
      headers: { 'Accept': 'application/json' },
      params: params
    })
  }
}

export default USUApi