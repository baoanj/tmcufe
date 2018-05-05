<template lang="html">
  <div :class="{ 'box-card-1': true, 'box-card-2': true, 'box-card-move': move}">
    <el-card>
      <div slot="header" class="clearfix text-line">
        <router-link
          class="card-text-btn"
          :title="classs.name"
          :to="{ name: 'ClassPage', params: { classId: classs.classId } }"
        >{{ classs.name }}</router-link>
        <el-tooltip v-if="isTA" effect="light" content="你是这个班级的助教" placement="right">
          <span class="ta-tag">TA</span>
        </el-tooltip>
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
  computed: {
    isTA() {
      const userEmail = this.$store.state.user.email;
      for (let i = 0; i < this.classs.tas.length; i += 1) {
        if (this.classs.tas[i].email === userEmail) return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../style/box-card-media';

.box-card-move {
  cursor: move;
}

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

.text-line {
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-form-item--small.el-form-item {
  margin-bottom: 0;
}

.ta-tag {
  position: absolute;
  right: 5px;
  top: 5px;
  color: $tmcu-primary-color;
  border: 1px solid $tmcu-primary-color;
  border-radius: 50%;
  padding: 4px 5px;
}
</style>
