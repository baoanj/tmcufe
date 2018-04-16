<template lang="html">
  <el-dialog
    :title="`${stuName}(${stuId})-所有作业提交的数据统计`"
    :fullscreen="true"
    :visible="visible"
    @close="closeDialog"
  >
    <el-row v-loading="loading">
      <v-chart
        :forceFit="true"
        :height="height"
        :data="dvRows"
        :scale="scale"
      >
        <v-tooltip itemTpl="<li></li>" />
        <v-axis dataKey="hwTitle" :label="labels" :title="true" />
        <v-axis dataKey="commit" :label="null" :line="null"/>
        <v-legend :clickable="false" />
        <v-stack-bar
          position="hwTitle*commit"
          color="name"
          :onClick="showSubDetail"
        />
      </v-chart>
    </el-row>
    <p>温馨提示: 点击柱状图查看每次作业的提交详情</p>
    <div v-if="showDetail">
      <p>作业: {{ subDetail.hwTitle }}</p>
      <p>
        <span>提交时间: {{ formateDate(subDetail.date) }}</span>
      </p>
      <div>
        <p v-if="subDetail.checked">
          <span>已审阅</span>
          <span>反馈结果: {{ subDetail.feedback || '无' }}</span>
        </p>
        <p v-else>未审阅</p>
      </div>
      <div>
        <p>提交内容:</p>
        <markdown-editor
          :value="subDetail.answer"
          :edit="false"
        />
        <file-list :files="subDetail.files" />
      </div>
    </div>
    <p v-if="showDetail === null">学生尚未提交</p>
  </el-dialog>
</template>

<script>
import utils from '@/utils';
import MarkdownEditor from '@/components/MarkdownEditor';
import FileList from '@/components/FileList';
import { getStuSubs } from '../api';

const DataSet = require('@antv/data-set');

export default {
  name: 'ViewStuSubsDialog',
  components: {
    MarkdownEditor,
    FileList,
  },
  computed: {
    dvRows() {
      const sourceData = [
        { name: '已提交' },
        { name: '未提交' },
      ];
      const fields = [];

      for (let i = 0; i < this.submissions.length; i += 1) {
        if (this.submissions[i].commit === true) {
          sourceData[0][this.submissions[i].hwTitle] = 1;
          sourceData[1][this.submissions[i].hwTitle] = 0;
        } else {
          sourceData[0][this.submissions[i].hwTitle] = 0;
          sourceData[1][this.submissions[i].hwTitle] = 1;
        }
        fields.push(this.submissions[i].hwTitle);
      }

      const dv = new DataSet.View().source(sourceData);
      dv.transform({
        type: 'fold',
        fields,
        key: 'hwTitle',
        value: 'commit',
      });
      return dv.rows;
    },
  },
  data() {
    return {
      submissions: [],
      classId: '',
      userId: '',
      stuName: '',
      stuId: '',
      subDetail: {},
      showDetail: false,
      visible: false,
      loading: false,
      scale: [{
        dataKey: 'hwTitle',
        alias: '作业名称',
      }],
      labels: {
        formatter(val) {
          return val.length > 6 ? `${val.slice(0, 5)}..` : val;
        },
      },
      height: 400,
    };
  },
  methods: {
    show(classId, userId, stuName, stuId) {
      this.visible = true;
      this.loading = true;
      this.showDetail = false;
      this.stuName = stuName;
      this.stuId = stuId;
      this.classId = classId;
      this.userId = userId;
      getStuSubs(classId, userId).then((subs) => {
        this.submissions = subs;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
        this.$message.error(error);
      });
    },
    showSubDetail(ev) {
      if (ev.data._origin.name === '已提交') { // eslint-disable-line
        for (let i = 0; i < this.submissions.length; i += 1) {
          if (this.submissions[i].hwTitle === ev.data._origin.hwTitle) { // eslint-disable-line
            const sub = this.submissions[i];
            this.subDetail = {
              hwTitle: sub.hwTitle,
              date: sub.date,
              answer: sub.answer,
              files: sub.files,
              checked: sub.checked,
              feedback: sub.feedback,
            };
            break;
          }
        }
        this.showDetail = true;
      } else {
        this.showDetail = null;
      }
    },
    formateDate(timestamp) {
      return utils.formateDate(+timestamp);
    },
    closeDialog() {
      this.visible = false;
    },
  },
};
</script>

<style lang="css" scoped>
</style>
