<template lang="html">
  <div class="box-card-1 box-card-2">
    <el-card>
      <div slot="header"  class="clearfix text-line">
        <router-link
          class="card-text-btn"
          :title="homework.title"
          :to="{
            name: 'HomeworkPage',
            params: { classId, createDate: homework.createDate }
          }"
        >{{ homework.title }}</router-link>
        <el-tag class="hw-status" size="mini" :type="expired | hwTagType">
          {{ expired | hwStatus }}
        </el-tag>
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
        <div v-if="$store.state.user.role === 'student' && !isTA" class="stu-hw-status">
          <el-tag size="mini" :type="homework.submit | hwSubTagType">
            {{ homework.submit | hwSubStatus }}
          </el-tag>
          <el-tag size="mini" :type="homework.checked | subCheckTagType">
            {{ homework.checked | subCheckSubStatus }}
          </el-tag>
        </div>
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
    isTA: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formateDate(timestamp) {
      return timestamp ? utils.formateDate(+timestamp) : '--';
    },
  },
  computed: {
    expired() {
      if (this.homework.beginDate && this.homework.beginDate > Date.now()) {
        return 0;
      } else if (this.homework.endDate && this.homework.endDate < Date.now()) {
        return 1;
      }
      return 2;
    },
  },
  filters: {
    hwStatus(val) {
      if (val === 0) {
        return '未开始';
      } else if (val === 1) {
        return '已截止';
      }
      return '进行中';
    },
    hwTagType(val) {
      if (val === 0) {
        return 'warning';
      } else if (val === 1) {
        return 'info';
      }
      return 'success';
    },
    hwSubStatus(val) {
      return val ? '已提交' : '未提交';
    },
    hwSubTagType(val) {
      return val ? 'success' : 'danger';
    },
    subCheckSubStatus(val) {
      return val ? '已审阅' : '未审阅';
    },
    subCheckTagType(val) {
      return val ? 'success' : 'warning';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../style/box-card-media';

.card-text-btn {
  display: inline-block;
  text-decoration: none;
  color: $tmcu-primary-color;
  white-space: nowrap;
  transition: all 0.2s;
}

.card-text-btn:hover {
  color: $tmcu-primary-hover-color;
}

.el-form-item--small.el-form-item {
  margin-bottom: 0;
}

.hw-status {
  position: absolute;
  right: 5px;
  top: 10px;
}

.text-line {
  overflow: hidden;
  text-overflow: ellipsis;
}

.stu-hw-status {
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 2px;
}
</style>
