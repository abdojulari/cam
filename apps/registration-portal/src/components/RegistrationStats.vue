<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3>Total Registrations</h3>
        <div class="display-1 font-weight-bold text-h5"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> 2,345</div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3>By Branch</h3>
        <div class="display-1 font-weight-bold text-h5"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> 29</div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3>Adult Registrations</h3>
        <div class="display-1 font-weight-bold text-h5"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> 1,500</div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3>Child Registrations</h3>
        <div class="display-1 font-weight-bold text-h5"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> 845</div>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="8">
      <v-card class="pa-4 mb-4" variant="elevated" >
        <h3>Registrations by Branch</h3>
        <client-only>
          <v-chart :option="barOption" autoresize style="height: 300px;" />
        </client-only>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card class="pa-4 mb-4" variant="plain">
        <h3>Top 3 Branches</h3>
        <client-only>
          <v-chart :option="donutOption" autoresize style="height: 300px;" />
        </client-only>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import "echarts";
const VChart = defineAsyncComponent(() => import('vue-echarts'));


const barOption = ref({
  tooltip: {},
  xAxis: {
    type: 'category',
    data: Array.from({ length: 29 }, (_, i) => `Branch ${i + 1}`),
    axisLabel: { rotate: 45 }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 98, 150, 80, 200, 170, 90, 110, 130, 140, 100, 95, 160, 180, 75, 60, 155, 145, 135, 125, 115, 105, 165, 175, 185, 195, 205, 215, 225],
      type: 'bar',
      itemStyle: {
        color: '#1976D2'
      }
    }
  ]
});

const donutOption = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Top Branches',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 225, name: 'Branch 29' },
        { value: 215, name: 'Branch 28' },
        { value: 205, name: 'Branch 27' }
      ]
    }
  ]
});
</script> 