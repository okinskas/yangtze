import getAxiosInstance from './Api'

export default () => {
  const instance = getAxiosInstance();

  function getAllFloodAreas() {
    return instance.get('/floodareas')
  }

  function getFloodAlerts() {
    return instance.get('/floodalert')
  }

  function subscribeToFloodArea(subscriptionData) {
    return instance.post('/subscribe', subscriptionData)
  }

  function forceEmailNotification() {
    return instance.get('/forcemail')
  }

  return {
    getAllFloodAreas,
    getFloodAlerts,
    subscribeToFloodArea,
    forceEmailNotification
  }
}
