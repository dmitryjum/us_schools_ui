const environments = {
  development: {
    US_STATE_UNIVERSITIES_HOST: 'http://localhost:3001'
  },
  production: {
    US_STATE_UNIVERSITIES_HOST: 'http://usastateuniversities.herokuapp.com'
  }
}

export const US_STATE_UNIVERSITIES_HOST =
         environments[process.env.NODE_ENV]['US_STATE_UNIVERSITIES_HOST'];