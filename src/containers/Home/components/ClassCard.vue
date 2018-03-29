<template lang="html">
  <div class="box-card">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ classs.name }}</span>
        <el-button class="card-text-btn" type="text">进入</el-button>
        <el-button
          v-if="user.role === 'teacher'"
          class="card-text-btn"
          type="text"
        >编辑</el-button>
        <el-button
          v-if="user.role === 'student'"
          class="card-text-btn"
          type="text"
        >退出</el-button>
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
import { mapState } from 'vuex';

export default {
  name: 'ClassCard',
  props: {
    classs: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: mapState([
    'user',
  ]),
};
</script>

<style lang="css" scoped>
@media only screen and (max-width: 480px) {
  .box-card {
    width: 100%;
    float: left;
    padding: 10px;
  }
}
@media only screen and (min-width: 481px) and (max-width: 799px) {
  .box-card {
    width: 50%;
    float: left;
    padding: 10px;
  }
}
@media only screen and (min-width: 800px) and (max-width: 1199px) {
  .box-card {
    width: 33.33%;
    float: left;
    padding: 10px;
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1600px) {
  .box-card {
    width: 25%;
    float: left;
    padding: 10px;
  }
}
@media only screen and (min-width: 1601px) and (max-width: 2048px) {
  .box-card {
    width: 20%;
    float: left;
    padding: 10px;
  }
}

.card-text-btn {
  float: right;
  padding: 3px;
}
</style>
