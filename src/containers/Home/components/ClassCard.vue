<template lang="html">
  <div :class="{ 'box-card-1': true, 'box-card-2': true, 'box-card-move': move}">
    <el-card>
      <div slot="header" class="clearfix text-line">
        <router-link
          class="card-text-btn"
          :title="classs.name"
          :to="{ name: 'ClassPage', params: { classId: classs.classId } }"
        >{{ classs.name }}</router-link>
      </div>
      <div>
        <el-form label-width="80px" size="small">
          <el-form-item label="班级Id:">
            {{ classs.classId }}
          </el-form-item>
          <el-form-item label="密码:">
            {{ classs.password }}
          </el-form-item>
          <el-form-item label="任课老师:">
            {{ classs.teacherName || '--' }}
          </el-form-item>
          <el-form-item label="作业数量:">
            {{ classs.anountOfHws }}
          </el-form-item>
          <el-form-item label="学生数量:">
            {{ classs.amountOfStus }}
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ClassCard',
  props: {
    classs: {
      type: Object,
      default() {
        return {};
      },
    },
    move: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="css" scoped>
.box-card-1 {
  float: left;
  padding: 10px;
}

.box-card-move {
  cursor: move;
}

@media only screen and (max-width: 699px) {
  .box-card-2 {
    width: 100%;
  }
}
@media only screen and (min-width: 700px) and (max-width: 1049px) {
  .box-card-2 {
    width: 50%;
  }
}
@media only screen and (min-width: 1050px) and (max-width: 1399px) {
  .box-card-2 {
    width: 33.33%;
  }
}
@media only screen and (min-width: 1400px) and (max-width: 1749px) {
  .box-card-2 {
    width: 25%;
  }
}
@media only screen and (min-width: 1750px) {
  .box-card-2 {
    width: 20%;
  }
}

.card-text-btn {
  text-decoration: none;
  color: #409eff;
  white-space: nowrap;
  transition: all 0.2s;
}

.card-text-btn:hover {
  color: #66b1ff;
}

.text-line {
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
</style>
