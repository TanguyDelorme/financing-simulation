<script lang="ts" setup>
import {defineProps, onMounted, onUpdated, ref} from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  years:{
    type: Array<Number>,
    default: 'Custom Message'
  },
  taxes:{
    type: Array<Number>,
    default: []
  },
});

const chart = ref();
const initOptions = () => {
  chart.value = echarts.init(document.getElementById('graph'));

  const options = {
    title: {
      left: 'center',
      text: 'Taxes over years'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {backgroundColor: '#6a7985'}
      }
    },
    legend: {
      data: ['Taxes'],
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
      max: Math.ceil(Math.max(...props.taxes)),
      boundaryGap: [0, '100%']
    },
    series: [
      {
        name: 'Taxes',
        type: 'line',
        data: props.taxes
      },
    ]
  };

  chart.value.setOption(options);
}

onMounted(() => {
  initOptions();
});

onUpdated(() => {
  if (props.years.length > 0 && props.taxes.length > 0) {
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