<template>
  <v-row>
    <v-col cols="12" md="12">
      <!-- FILTERS SECTION -->
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3 class="mb-3">Dashboard Filters</h3>
        
        <v-row>
          <!-- Filter Type Selection -->
          <v-col cols="12" md="3">
            <v-select
              v-model="filterType"
              :items="filterTypes"
              label="Filter Type"
              variant="outlined"
              density="compact"
              @update:model-value="onFilterTypeChange"
            ></v-select>
          </v-col>

          <!-- Library Filter (always visible) -->
          <v-col cols="12" md="3">
            <v-select
              v-model="filters.library"
              :items="libraryOptions"
              label="Library"
              variant="outlined"
              density="compact"
              clearable
            ></v-select>
          </v-col>

          <!-- Year Filter -->
          <v-col cols="12" md="2" v-if="showYearFilter">
            <v-select
              v-model="filters.year"
              :items="yearOptions"
              label="Year"
              variant="outlined"
              density="compact"
            ></v-select>
          </v-col>

          <!-- Month Filter (only for monthly filter type) -->
          <v-col cols="12" md="2" v-if="filterType === 'month'">
            <v-select
              v-model="filters.month"
              :items="monthOptions"
              label="Month"
              variant="outlined"
              density="compact"
            ></v-select>
          </v-col>

          <!-- Date Range Filters (only for date_range filter type) -->
          <v-col cols="12" md="2" v-if="filterType === 'date_range'">
            <v-date-input
              v-model="filters.start_date"
              label="Start Date"
              variant="outlined"
              density="compact"
              format="yyyy-mm-dd"
            ></v-date-input>
          </v-col>
          
          <v-col cols="12" md="2" v-if="filterType === 'date_range'">
            <v-date-input
              v-model="filters.end_date"
              label="End Date"
              variant="outlined"
              density="compact"
              format="yyyy-mm-dd"
            ></v-date-input>
          </v-col>

          <!-- Apply Filters Button -->
          <v-col cols="12" md="2">
            <v-btn
              color="primary"
              variant="flat"
              @click="applyFilters"
              class="mt-1"
              block
            >
              <v-icon left>mdi-filter</v-icon>
              Apply
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="3">
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3>Total Registrations (All)</h3>
        <div class="display-1 font-weight-bold text-h5"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> 
        {{ totalRegistrations }}
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3>Total Branch Registrations</h3>
        <div class="display-1 font-weight-bold text-h5"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> 
        {{ byBranch }}
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3>Total Adult Registrations</h3>
        <div class="display-1 font-weight-bold text-h5"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> 
        {{ adultRegistrations }}
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3>Total Child Registrations</h3>
        <div class="display-1 font-weight-bold text-h5"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> 
        {{ childRegistrations }}
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="8">
      <v-card class="pa-4 mb-4" variant="outlined" >
        <h3>Registrations by Branch</h3>
        <client-only>
          <v-chart :option="barOption" autoresize style="height: 300px;" />
        </client-only>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card class="pa-4 mb-4" variant="outlined">
        <h3>Top 3 Branches</h3>
        <client-only>
          <v-chart :option="donutOption" autoresize style="height: 300px;" />
        </client-only>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, computed } from  'vue';
import "echarts";
const VChart = defineAsyncComponent(() => import('vue-echarts'));
import { apiService } from '@cam/shared-components/services/api-service';
import { useRegistrationStore } from '@cam/shared-components/store/registration-store';
import { ipRanges } from '../constants/ipRangeMatching';

const registrationStore = useRegistrationStore();
const networkName = computed(() => registrationStore.networkName);

const dashboardData = ref<any>({});

  // Filter state and options
  const filterType = ref('year');
  const filters = ref({
    library: '',
    year: '2024', // Use 2024 as default instead of current year to avoid future year issues
    month: '',
    start_date: '',
    end_date: '',
    filter_type: 'year'
  });

  // Filter options
  const filterTypes = ref([
    { title: 'Yearly', value: 'year' },
    { title: 'Monthly', value: 'month' },
    { title: 'Date Range', value: 'date_range' }
  ]);

  const libraryOptions = ref();

  const yearOptions = computed(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2023; // Base year to start from
    const endYear = currentYear + 2; // Include 2 years in the future
    
    const years = [];
    for (let year = endYear; year >= startYear; year--) {
      years.push({
        title: year.toString(),
        value: year.toString()
      });
    }
    return years;
  });

  const monthOptions = ref([
    { title: 'January', value: '1' },
    { title: 'February', value: '2' },
    { title: 'March', value: '3' },
    { title: 'April', value: '4' },
    { title: 'May', value: '5' },
    { title: 'June', value: '6' },
    { title: 'July', value: '7' },
    { title: 'August', value: '8' },
    { title: 'September', value: '9' },
    { title: 'October', value: '10' },
    { title: 'November', value: '11' },
    { title: 'December', value: '12' }
  ]);

  // Show/hide year filter based on filter type
  const showYearFilter = computed(() => {
    return filterType.value === 'year' || filterType.value === 'month';
  });

  // Filter methods
  const onFilterTypeChange = () => {
    filters.value.filter_type = filterType.value;
    
    // Clear irrelevant filters when type changes
    if (filterType.value !== 'month') {
      filters.value.month = '';
    }
    if (filterType.value !== 'date_range') {
      filters.value.start_date = '';
      filters.value.end_date = '';
    }
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    if (typeof date === 'string') return date;
    if (date instanceof Date) {
      return date.toISOString().split('T')[0]; // Format as yyyy-mm-dd
    }
    return '';
  };

  const applyFilters = async () => {
    // Build filter object, removing empty values
    const filterParams: any = {};
    
    if (filters.value.library) filterParams.library = filters.value.library;
    if (filters.value.year && showYearFilter.value) filterParams.year = filters.value.year;
    if (filters.value.month && filterType.value === 'month') filterParams.month = filters.value.month;
    if (filters.value.start_date && filterType.value === 'date_range') {
      filterParams.start_date = formatDate(filters.value.start_date);
    }
    if (filters.value.end_date && filterType.value === 'date_range') {
      filterParams.end_date = formatDate(filters.value.end_date);
    }
    if (filters.value.filter_type) filterParams.filter_type = filters.value.filter_type;

    // Fetch filtered data
   dashboardData.value = await apiService.dashboardData(filterParams) as any;
  };

  onMounted(async () => {
      // Load initial data with default filters
      await applyFilters();
      
      // Create proper key-value pairs for v-select
      const customersList = ipRanges.map((item) => ({
        title: item.name,
        value: item.name
      }));
      
      // Add "All Libraries" option at the beginning
      libraryOptions.value = [
        { title: 'All Libraries', value: '' },
        ...customersList
      ];
      
      console.log('libraryOptions', libraryOptions.value);
      console.log('networkName', networkName.value);
  })

const totalRegistrations = computed(() => {
  return dashboardData.value?.dashboard?.total_registrations;
});

const byBranch = computed(() => {
  //return dashboardData.value?.dashboard?.by_branch;
  // filter this by networkName and return the value. If is not found, return 0 
  const byBranchData = dashboardData.value?.dashboard?.registrations_by_branch;
  
  if (!byBranchData || !networkName.value) {
    return 0;
  }
  
  // Find the key that includes the networkName
  const matchingKey = Object.keys(byBranchData).find(key => 
    key.includes(networkName.value)
  );
  
  // Return the value if found, otherwise return 0
  return matchingKey ? byBranchData[matchingKey] : 0;
});

const adultRegistrations = computed(() => {
  return dashboardData.value?.dashboard?.adult_registrations;
});

const childRegistrations = computed(() => {
  return dashboardData.value?.dashboard?.child_registrations;
});

const branchNames = computed(() => {
  const registrations = dashboardData.value?.dashboard?.registrations_by_branch;
  return registrations ? Object.keys(registrations) : [];
});

const branchValues = computed(() => {
  const registrations = dashboardData.value?.dashboard?.registrations_by_branch;
  return registrations ? Object.values(registrations) : [];
});

const topBranches = computed(() => {
  const branches = dashboardData.value?.dashboard?.top_3_branches;
  return branches ? Object.keys(branches).map(name => ({
    value: branches[name],
    name: name
  })) : [];
});

const barOption = computed(() =>({
  tooltip: {},
  xAxis: {
    type: 'category',
    data: branchNames.value,
    axisLabel: { rotate: 45 }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: branchValues.value,
      type: 'bar',
      itemStyle: {
        color: '#1976D2'
      }
    }
  ]
}));

const donutOption = computed(() => ({
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
      data: topBranches.value
    }
  ]
}));
</script> 