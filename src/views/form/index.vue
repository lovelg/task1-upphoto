<template>
  <div class="app-container">
    <div class="li">
      <el-upload
        ref="feng"
        class="upload-demo"
        action="url"
        :file-list="list_feng"
        :on-change="handleChangeFeng"
        :http-request="handleFengUpload"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取封识号图片文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUploadFeng"
        >上传封识号图片</el-button>
      </el-upload>
      <el-image style="width: 600px; height: 400px" :src="fengimg" :preview-src-list="srcListFeng" />
      <!-- <span>封识号:{{fengnum}}</span> -->
      <span class="Fengtxt">封识号:</span>
      <span class="Fengcontent">{{ fengnum }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fengform',
  data() {
    return {
      urlfeng: '',
      fengimg: '',
      srcListFeng: [],
      fengnum: '',
      list_feng: []
    }
  },

  methods: {
    submitUploadFeng() {
      this.$refs.feng.submit()
    },
    handleFengUpload() {
      const params = {
        img: this.urlfeng
      }
      this.service.postFeng(params).then(res => {
        console.log(res)
        if (res.success) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.fengnum = res.data.toString() || '无'
        } else {
          this.$message.error('上传失败')
        }
      })
    },
    handleChangeFeng(file, fileList) {
      let arr = []
      arr.push(fileList[fileList.length - 1])
      this.list_feng = arr
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      let that = this
      reader.onload = function(e) {
        that.fengimg = e.target.result
        that.srcListFeng.push(that.fengimg)
        that.urlfeng = e.target.result.split('base64,')[1]
      }
    }
  }
}
</script>

<style scoped>
.upload-demo {
  padding-bottom: 10px;
}
.line {
  text-align: center;
}

.li {
  margin-top: 10px;
}
span {
  display: block;
  text-align: left;
  margin-top: 20px;
}
.Fengtxt {
  font-family: "STKaiti";
  font-size: 20px;
}
</style>

