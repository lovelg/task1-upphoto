import Server from './server.js'

export default {
  postJi (params) {
    return Server.post('/cloudwalk/customs/container/ocr/imgRecog', params)
  },
  postFeng (params) {
    return Server.post('/cloudwalk/customs/container/ocr/uploadImgSealRecog', params)
  }
}
