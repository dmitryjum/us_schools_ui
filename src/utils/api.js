import axios from 'axios'
import { constants } from "../constants/env/us_states_api";
const USUAxios = axios.create({
  baseURL: constants.US_STATE_UNIVERSITIES_HOST
});

class USUApi {
  static getSchools(params={}) {
    return USUAxios.get(`/api/v1/schools`, {
      headers: { 'Accept': 'application/json' },
      params: params
    })
  }

  static updateSchool(params={}) {
    return USUAxios({
      url: `/api/v1/schools/${params['school']['id']}`,
      method: 'patch',
      headers: {Authorization: `Bearer ${params['auth_token']}`},
      data: {school: params['school']}
    })
  }

  static createSchool(params={}) {
    return USUAxios({
      url: `/api/v1/schools`,
      method: 'post',
      headers: { Authorization: `Bearer ${params['auth_token']}` },
      data: { school: params['school'] }
    })
  }

  static getTopTwentyKeys() {
    return USUAxios.get(`/api/v1/schools/top_twenty_keys`, {
      headers: {'Accept': 'application/json'}
    })
  }

  static search(params={'term': ''}) {
    return USUAxios.get(`/api/v1/schools/search`, {
      headers: { 'Accept': 'application/json' },
      params: params
    })
  }

  static signUp(params={}) {
    return USUAxios.post(`/api/v1/users`, {
      user: params
    })
  }

  static logIn(params={}) {
    return USUAxios.post(`/api/v1/users/login`, params)
  }

  static isAuthenticated(token) {
    return USUAxios.get(
      `/api/v1/users/is_authenticated`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ); 
  }
}

export default USUApi