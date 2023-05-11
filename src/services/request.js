import { axiosGet, axiosPost } from '@/libs/http'

const ip_address = "http://192.168.1.2:1003"

function getPointLocs() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `${ip_address}/point_locs`,
      success (data) {
        resolve(data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}

function getCityLocs() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `${ip_address}/city_locs`,
      success (data) {
        resolve(data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}

function saveSelData(data_infor) {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `${ip_address}/save_sel_data/${data_infor}`,
      success (data) {
        resolve(data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}

function getExistedDataNames() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `${ip_address}/existed_data_names`,
      success (data) {
        resolve(data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}

function trainModel(type, points, time_rage, input_features, output_features) {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `${ip_address}/train_model/${type}/${points}/${time_rage}/${input_features}/${output_features}`,
      success (data) {
        resolve(data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}

export {
  getPointLocs,
  getCityLocs,
  saveSelData,
  getExistedDataNames,
  trainModel
}