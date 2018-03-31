<template lang="html">
  <div>
    <div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10}"
        placeholder="请输入内容"
        v-model="answer">
      </el-input>
    </div>
    <div class="submit-btn">
      <el-button type="primary" @click="submitAnswer">提交</el-button>
    </div>
  </div>
</template>

<script>
import { submitHw } from '../api';

export default {
  name: 'SubmitHomework',
  props: {
    classId: {
      type: String,
      default: '',
    },
    createDate: {
      type: Number,
      default: Date.now(),
    },
  },
  data() {
    return {
      answer: '',
      file: '',
    };
  },
  methods: {
    submitAnswer() {
      submitHw(this.classId, this.createDate, this.answer, this.file, Date.now())
        .then(() => {
          this.$emit('fetchData');
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
  },
};
</script>

<style lang="css">
</style>
