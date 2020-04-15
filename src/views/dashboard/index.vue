<template>
  <div class="dashboard-container">
    <!-- 为了登录 -->
    <!-- <div class="dashboard-text">{{ name }}</div> -->
    <div class="li">
      <el-upload
        ref="ji"
        class="upload-demo"
        action="url"
        :file-list="list_ji"
        :on-change="handleChangeJi"
        :http-request="handleJiUpload"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取集装箱图片文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUploadJi"
        >上传集装箱图片</el-button>
      </el-upload>
      <el-image style="width: 600px; height: 400px" :src="jiimg" :preview-src-list="srcListJi"/>
      <span class="Jitxt">集装箱号:</span>
      <span class="Jicontent">{{ jinum }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },

  data() {
    return {
      urlji: '',
      jiimg: '',
      srcListJi: [],
      jinum: '',
      list_ji: []
    }
  },
  methods: {
    submitUploadJi() {
      this.$refs.ji.submit()
    },

    handleJiUpload() {
      const params = {
        img: this.urlji
      };
      this.service.postJi(params).then(res => {
        console.log(res);
        if (res.code === '00000000') {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.jinum = res.data.containerNum || '无';
        } else {
          this.$message.error('上传失败');
        }
      });
    },

    handleChangeJi(file, fileList) {
      // 每次只传一张图片
      let arr = []
      arr.push(fileList[fileList.length - 1])
      this.list_ji = arr
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      let that = this
      reader.onload = function(e) {
        that.jiimg = e.target.result;
        that.srcListJi.push(that.jiimg)
        let index=that.srcListJi.length-1
        that.srcListJi= that.srcListJi.slice(index).concat(that.srcListJi.slice(0,index))
        that.urlji = e.target.result.split('base64,')[1]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
  padding-bottom: 10px;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.li {
  margin-top: 10px;
}
span {
  display: block;
  text-align: left;
  margin-top: 20px;
}
.Jitxt {
  font-family: "STKaiti";
  font-size: 20px;
}
</style>
