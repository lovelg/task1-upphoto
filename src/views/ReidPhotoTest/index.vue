<template>
  <div class="app-container">
    <div class="li">
      <el-upload
        class="upload-demo"
        ref="reid"
        action="url"
        :file-list="list_reid"
        :on-change="handleChangeReid"
        :http-request="handleReidUpload"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取Reid图片文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUploadReid"
        >上传Reid图片</el-button>
      </el-upload>
      <el-image style="width: 600px; height: 400px" :src="reidimg" :preview-src-list="srcListReid"></el-image>
      <span class="Reidtxt">Reid号:</span>
      <span class="Reidcontent">{{reidnum}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "form",
  data() {
    return {
      urlreid: "",
      reidimg: "",
      srcListReid: [],
      reidnum: "",
      list_reid: []
    };
  },

  methods: {
    submitUploadReid() {
      this.$refs.reid.submit();
    },
    handleReidUpload() {
      const params = {
        img: this.urlreid
      };
      this.service.postReid(params).then(res => {
        console.log(res);
        if (res.success) {
          this.$message({
            message: "上传成功",
            type: "success"
          });
          this.reidnum = res.data.toString() || "无";
        } else {
          this.$message.error("上传失败");
        }
      });
    },
    handleChangeReid(file, fileList) {
      let arr = [];
      arr.push(fileList[fileList.length - 1]);
      this.list_reid = arr;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      let that = this;
      reader.onload = function(e) {
        that.reidimg = e.target.result;
        that.srcListReid.push(that.reidimg);
        let index=that.srcListReid.length-1
        that.srcListReid= that.srcListReid.slice(index).concat(that.srcListReid.slice(0,index))
        that.urlreid = e.target.result.split("base64,")[1];
      };
    }
  }
};
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
.Reidtxt {
  font-family: "STKaiti";
  font-size: 20px;
}
</style>

