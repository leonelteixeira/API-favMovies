export interface ListMoviesResponse {
    searchType: string
    expression: string
    results: Result[]
    errorMessage: string
  }
  
  interface Result {
    id: string
    resultType: string
    image: string
    title: string
    description: string
  }
  