import axios from "axios"

const busAPI = axios.create({
    baseURL: 'https://ticket-booking-swd-project.azurewebsites.net',
    timeout: 3000,
    headers: {
      "Content-Type": "application/json"
    }
  })

export default busAPI