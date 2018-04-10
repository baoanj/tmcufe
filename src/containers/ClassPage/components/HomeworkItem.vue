<template lang="html">
  <div class="box-card">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ homework.title }}</span>
        <router-link
          :to="{
            name: 'HomeworkPage',
            params: { classId, createDate: homework.createDate }
          }"
        >进入</router-link>
        <el-button
          v-if="$store.state.user.role === 'teacher'"
          class="card-text-btn"
          type="text"
        >编辑</el-button>
      </div>
      <div>
        <p>创建时间: {{ formateDate(homework.createDate) }}</p>
        <p>开始时间: {{ formateDate(homework.beginDate) }}</p>
        <p>结束时间: {{ formateDate(homework.endDate) }}</p>
        <p>提交人数: {{ homework.amountOfSubs }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import utils from '@/utils';

export default {
  name: 'HomeworkItem',
  props: {
    homework: {
      type: Object,
      default() {
        return {};
      },
    },
    classId: {
      type: String,
      default: '',
    },
  },
  methods: {
    formateDate(timestamp) {
      return utils.formateDate(+timestamp);
    },
  },
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
