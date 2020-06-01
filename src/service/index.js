import Server from './server.js'

export default {
  postJi(params) {
    return Server.post('/cloudwalk/customs/container/ocr/imgRecog', params)
  },
  postFeng(params) {
    return Server.post('/cloudwalk/customs/container/ocr/uploadImgSealRecog', params)
  },
  postReid(params) {
    return Server.post('/cloudwalk/wisdom/reid/picture/detect', params)
  },
  postPhotohouse(params) {
    return Server.post('/cloudwalk/wisdom/import/image/base', params)
  },
  postWhiteListRole(params) {
    return Server.post('/cloudwalk/customs/aios/customer/face/add', params)
  }
}
