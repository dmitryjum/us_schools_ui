export const constants = {
  development: {
    US_STATE_UNIVERSITIES_HOST: "http://localhost:3001",
  },
  production: {
    US_STATE_UNIVERSITIES_HOST: "http://usastateuniversities.herokuapp.com",
  },
  test: {
    US_STATE_UNIVERSITIES_HOST: "https://api.example.com"
  }
}[process.env.NODE_ENV];