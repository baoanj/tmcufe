<template lang="html">
  <fullscreen-dialog
    title="所有作业提交的数据统计"
    :visible="visible"
    @close="closeDialog"
  >
    <v-chart :forceFit="true" :height="height" :data="homeworks" :scale="scale">
      <v-tooltip :crosshairs="crosshairs" :showTitle="false" />
      <v-axis dataKey="title" :label="labels" :title="true" />
      <v-axis dataKey="amountOfSubs" :line="axisLine" :tickLine="tickLine" :title="true" />
      <v-line
        position="title*amountOfSubs"
        tooltip="title*createDate*beginDate*endDate*amountOfSubs"
      />
      <v-point position="title*amountOfSubs" shape="circle" />
    </v-chart>
  </fullscreen-dialog>
</template>

<script>
import FullscreenDialog from '@/components/FullscreenDialog';
import utils from '@/utils';

export default {
  name: 'ViewAllSubsDialog',
  components: {
    FullscreenDialog,
  },
  data() {
    const that = this;
    return {
      homeworks: [],
      visible: false,
      scale: [{
        dataKey: 'amountOfSubs',
        alias: '提交人数',
        tickInterval: 1,
        min: 0,
      }, {
        dataKey: 'title',
        alias: '作业名称',
      }, {
        dataKey: 'createDate',
        alias: '创建时间',
        formatter(val) {
          return that.formateDate(val);
        },
      }, {
        dataKey: 'beginDate',
        alias: '开始时间',
        formatter(val) {
          return that.formateDate(val);
        },
      }, {
        dataKey: 'endDate',
        alias: '截止时间',
        formatter(val) {
          return that.formateDate(val);
        },
      }],
      crosshairs: {
        type: 'line',
      },
      labels: {
        formatter(val) {
          if (val.length > 6) return `${val.slice(0, 5)}..`;
          return val;
        },
      },
      axisLine: {
        lineWidth: 2,
        stroke: '#dedede',
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#d1d1d1',
        strokeOpacity: 1,
        length: 5,
      },
      height: 400,
    };
  },
  methods: {
    show(homeworks) {
      this.homeworks = homeworks;
      this.visible = true;
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
