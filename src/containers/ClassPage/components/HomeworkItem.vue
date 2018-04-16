<template lang="html">
  <div class="box-card-1 box-card-2">
    <el-card>
      <div slot="header" class="clearfix">
        <router-link
          class="card-text-btn"
          :title="homework.title"
          :to="{
            name: 'HomeworkPage',
            params: { classId, createDate: homework.createDate }
          }"
        >{{ homework.title }}</router-link>
      </div>
      <div>
        <el-form label-width="80px" size="small">
          <el-form-item label="创建时间:">
            {{ formateDate(homework.createDate) }}
          </el-form-item>
          <el-form-item label="开始时间:">
            {{ formateDate(homework.beginDate) }}
          </el-form-item>
          <el-form-item label="结束时间:">
            {{ formateDate(homework.endDate) }}
          </el-form-item>
          <el-form-item label="提交人数:">
            {{ homework.amountOfSubs }}
          </el-form-item>
        </el-form>
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
.box-card-1 {
  float: left;
  padding: 10px;
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

.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
</style>
