import getAxiosInstance from './Api'

export default () => {
  const instance = getAxiosInstance();

  function getAllEASensors() {
    return instance.get(`/easensor`)
  }

  function getAllLocalSensors() {
    return instance.get(`/localsensor`)
  }

  function getEASensorData(id) {
    return instance.get(`/easensor/${id}`)
  }

  function getLocalSensorData(id) {
    return instance.get(`/localsensor/${id}`)
  }

  return {
    getAllEASensors,
    getAllLocalSensors,
    getEASensorData,
    getLocalSensorData
  }
}
