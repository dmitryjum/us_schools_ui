const initialState = {
  schools: [
    {
      'title': 'Test School',
      'details': {
        'location': 'Test Town'
      }
    }
  ]
}

export default function() {
  return initialState.schools
}