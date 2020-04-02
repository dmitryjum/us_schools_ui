import axios from 'axios'
import * as constants from "../constants/env/us_states_api";

class USUApi {
  static getSchools(params={}) {
    return axios.get(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/schools`, {
      headers: { 'Accept': 'application/json' },
      params: params
    })
  }

  static updateSchool(params={}) {
    return axios.patch(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/schools`, {
      headers: {'Authorization': `Bearer ${params['auth_token']}`},
      id: params['id'],
      school: params['school']
    })
  }

  static getTopTwentyKeys() {
    return axios.get(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/schools/top_twenty_keys`, {
      headers: {'Accept': 'application/json'}
    })
  }

  static search(params={'term': ''}) {
    return axios.get(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/schools/search`, {
      headers: { 'Accept': 'application/json' },
      params: params
    })
  }

  static signUp(params={}) {
    return axios.post(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/users`, {
      user: params
    })
  }

  static logIn(params={}) {
    return axios.post(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/users/login`, params)
  }

  static isAuthenticated(token) {
    return axios.get(
      `${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/users/is_authenticated`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ); 
  }
}

export default USUApi