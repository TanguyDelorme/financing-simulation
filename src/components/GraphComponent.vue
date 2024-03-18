<script lang="ts" setup>
import {defineProps, onMounted, onUpdated, ref} from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  years:{
    type: Array<Number>,
    default: 'Custom Message'
  },
  traditionnalData:{
    type: Array<Number>,
    default: []
  },
  compoundInterestData:{
    type: Array<Number>,
    default: []
  }
});

const chart = ref();
const initOptions = () => {
  chart.value = echarts.init(document.getElementById('graph'));

  const options = {
    title: {
      left: 'center',
      text: 'Compound Interests simulation'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {backgroundColor: '#6a7985'}
      }
    },
    legend: {
      data: ['Compound interests', 'Without compound interests'],
      right: '20',
      orient: 'vertical'
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.years
    },
    yAxis: {
      type: 'value',
      max: Math.ceil(Math.max(...props.compoundInterestData) / 100000) * 100000,
      boundaryGap: [0, '100%']
    },
    series: [
      {
        name: 'Compound interests',
        type: 'line',
        data: props.compoundInterestData
      },
      {
        name: 'Without compound interests',
        type: 'line',
        data: props.traditionnalData
      }
    ]
  };

  chart.value.setOption(options);
}

onMounted(() => {
  initOptions();
});

onUpdated(() => {
  if (props.years.length > 0 && props.traditionnalData.length > 0 && props.compoundInterestData.length > 0) {
    console.log(1)
    initOptions();
  }
});
</script>

<template>
  <div class="mGraph-wrapper">
    <div id="graph" class="mGraph">
    </div>
  </div>
</template>

<style>
.mGraph-wrapper {
  width: 100%;
  height: 400px;
  background: #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mGraph-wrapper .mGraph {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
</style>