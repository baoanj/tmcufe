<template lang="html">
  <div :class="{ 'box-card-1': true, 'box-card-2': true, 'box-card-move': move}">
    <el-card>
      <div slot="header" class="clearfix">
        <span v-if="move"><i class="el-icon-rank"></i></span>
        <span>{{ classs.name }}</span>
        <router-link
          v-if="!move"
          class="card-text-btn"
          :to="{ name: 'ClassPage', params: { classId: classs.classId } }"
        >进入</router-link>
      </div>
      <div>
        <p>班级Id: {{ classs.classId }}</p>
        <p>密码: {{ classs.password }}</p>
        <p v-if="classs.teacherName">任课老师: {{ classs.teacherName }}</p>
        <p>作业数量: {{ classs.anountOfHws }}</p>
        <p>学生数量: {{ classs.amountOfStus }}</p>
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

@media only screen and (max-width: 480px) {
  .box-card-2 {
    width: 100%;
  }
}
@media only screen and (min-width: 481px) and (max-width: 799px) {
  .box-card-2 {
    width: 50%;
  }
}
@media only screen and (min-width: 800px) and (max-width: 1199px) {
  .box-card-2 {
    width: 33.33%;
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1600px) {
  .box-card-2 {
    width: 25%;
  }
}
@media only screen and (min-width: 1601px) and (max-width: 2048px) {
  .box-card-2 {
    width: 20%;
  }
}

.card-text-btn {
  float: right;
  text-decoration: none;
  color: #409eff;
  transition: all 0.2s;
}

.card-text-btn:hover {
  color: #66b1ff;
}
</style>
