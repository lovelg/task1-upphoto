<template>
  <div class="wrapper">
    <div class="upload-wrapper">
      <div class="upload-container">
        <el-form ref="addPhotoForm" :rules="addFromRules" :model="addFormData" label-width="170px">
          <el-form-item label="姓名">
            <el-input
              v-model="addFormData.name"
              class="width-320"
            />
          </el-form-item>
          <el-form-item label="职务">
            <el-input
              v-model="addFormData.duty"
              class="width-320"
            />
          </el-form-item>
          <el-form-item label="工号">
            <el-input
              v-model="addFormData.jobNum"
              class="width-320"
            />
          </el-form-item>
          <el-form-item label="科室">
            <el-input
              v-model="addFormData.desk"
              class="width-320"
            />
          </el-form-item>
          <el-form-item ref="uploadElement" label="上传单证" prop="image">
            <el-upload
              class="width-320"
              :limit="1"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :on-change="handleChangeWhitePhoto"
              :auto-upload="false"
              action="aaa"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img :src="dialogImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button-group class="page-next">
      <el-button type="primary" @click="submitAllPhotos()">提交</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'CreateModel',
  data() {
    return {
      addFormData: {
        image: '',
        name: '',
        duty: '', // 职务
        jobNum: '', // 工号
        desk: '', // 科室
        channelCode: '0104', // 渠道编码
        groupName: 'customsFaceList',
        timeStamp: '', //  时间戳
        nonceStr: '', // 请求随机字符串 8位数
        serviceModelVersion: '180814' // 服务模型版本
      },
      addFromRules: {
        // modelName: [
        //   { required: true, message: '请输入模型名称', trigger: 'blur' },
        //   { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        // ],
        image: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'blur'
          }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      // console.log('11')
      this.addFormData.image = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    submitAllPhotos(formName) {
      this.getTime() // 时间戳
      this.createCode() // 随机8位数
      // 上传表单内容
      this.$refs.addPhotoForm.validate((valid) => {
        // console.log(this.addFormData)
        if (valid) {
          console.log('form:', this.addFormData)
          this.service.postWhiteListRole(this.addFormData).then(res => {
            console.log(res)
            if (res.code === '00000000') {
              this.$message({
                message: '上传成功',
                type: 'success'
              })
            } else {
              this.$message.error('上传失败')
            }
          })
        }
      })
    },

    getTime() {
      this.addFormData.timeStamp = new Date().getTime()
      // console.log(this.addFormData.timeStamp)
    },
    createCode() {
      var code = ''
      // 设置长度，这里看需求，我这里设置了4
      var codeLength = 8

      // 循环codeLength 我设置的8就是循环8次
      for (var i = 0; i < codeLength; i++) {
        // 设置随机数范围,这设置为0 ~ 9
        var index = Math.floor(Math.random() * 9)

        // 字符串拼接 将每次随机的字符 进行拼接
        code += index
      }

      // 将拼接好的字符串赋值给展示的code
      this.addFormData.nonceStr = code
      // console.log(this.addFormData.nonceStr)
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    },
    handleChangeWhitePhoto(file, fileList) {
      // console.log(file)
      this.getBase64(file.raw).then(res => {
        this.addFormData.image = res
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.width-320 {
  width: 320px;
}
.wrapper {
  margin: 1rem;
  background: #fff;
  height: 88vh;
  padding: 1rem;

  .upload-wrapper {
    background: #F8F8F8;
    margin: 0rem 3rem 1rem;
    padding: 3rem 6%;
    height: 90%;
    border-top: 1.2px solid #DDDDDD;
    border-bottom: 1.2px solid #DDDDDD;

    .upload-container {
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
    .img-remark {
      flex: 1;
      justify-self: flex-start;
      margin-top:1rem;
      margin-left: 10.5rem;
      font-size :0.8rem;
      color: 		#696969
    }
    .page-next{
      display flex
      justify-content center
      button {
        width 10rem
        margin 0 4rem

      }
    }
}
</style>
