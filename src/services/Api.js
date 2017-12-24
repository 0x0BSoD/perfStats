import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'YOU_API_ADDR'
  })
}
