<template>
  <div class="app-container">
    <div class="li">
      <span class="Photohousetxt">
        图库类型:
        <el-select v-model="selectoption" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </span>
      <el-upload
        class="upload-demo"
        ref="photohouse"
        action="url"
        :file-list="list_photohouse"
        :on-change="handleChangePhotohouse"
        :http-request="handlePhotohouseUpload"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取图库图片文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUploadPhotohouse"
        >上传图库图片</el-button>
      </el-upload>
      <el-image
        style="width: 600px; height: 400px"
        :src="photohouseimg"
        :preview-src-list="srcListPhotohouse"
      ></el-image>
      <span class="Photohousetxt">图库号:</span>
      <span class="Photohousecontent">{{photohousenum}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoHouse',
  data() {
    return {
      urlphotohouse: '',
      photohouseimg: '',
      srcListPhotohouse: [],
      photohousenum: '',
      list_photohouse: [],
      selectoption: "0",
      options: [
        {
          value: "0",
          label: "实货监管视图库"
        },
        {
          value: "1",
          label: "散货监管视图库"
        },
        {
          value: "2",
          label: "快件监管视图库"
        },
        {
          value: "3",
          label: "跨境电商监管视图库"
        },
        {
          value: "4",
          label: "旅检重点人员视图库"
        }
      ],
      value: ""
    };
  },

  methods: {
    submitUploadPhotohouse() {
      this.$refs.photohouse.submit();
    },
    handlePhotohouseUpload() {
      const params = {
        img: this.urlphotohouse,
        appType: this.selectoption
      };
      this.service.postPhotohouse(params).then(res => {
        console.log(res);
        if (res.success) {
          this.$message({
            message: "上传成功",
            type: "success"
          });
          this.photohousenum = res.data.toString() || "无";
        } else {
          this.$message.error("上传失败");
        }
      });
    },
    handleChangePhotohouse(file, fileList) {
      let arr = [];
      arr.push(fileList[fileList.length - 1]);
      this.list_photohouse = arr;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      let that = this;
      reader.onload = function(e) {
        that.photohouseimg = e.target.result;
        that.srcListPhotohouse.push(that.photohouseimg);
        let index=that.srcListPhotohouse.length-1
        that.srcListPhotohouse= that.srcListPhotohouse.slice(index).concat(that.srcListPhotohouse.slice(0,index))
        that.urlphotohouse = e.target.result.split("base64,")[1];
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
.Photohousetxt {
  font-family: "STKaiti";
  font-size: 20px;
  padding-bottom: 20px;
}
</style>

