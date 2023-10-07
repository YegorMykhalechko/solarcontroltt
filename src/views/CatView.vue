<script setup lang="ts">
import Galleria from 'primevue/galleria'
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCatsStore } from '@/stores/cats'
import type { IGraphOption } from '@/models/interface'

const catsStore = useCatsStore()
const route = useRoute()

onMounted(async () => {
  await catsStore.getCat(route.params.id, 10)
  birdsPerDayData.value.datasets[0].data = catsStore.catBirdsCount
  hourlyActivityData.value.datasets[0].data = catsStore.catActivityTime
  images.value = catsStore.cat?.images as unknown[]
})

const images = ref<unknown[]>([])

const birdsPerDayData = ref<IGraphOption>({
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Birds count',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
})
const birdsPerDayOptions = ref({
  scales: {
    y: {
      beginAtZero: false
    }
  },
  responsive: true,
  maintainAspectRatio: false
})

const hourlyActivityData = ref<IGraphOption>({
  labels: [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
  ],
  datasets: [
    {
      label: 'Activity minutes',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }
  ]
})

const hourlyActivityOptions = ref({
  scales: {
    y: {
      beginAtZero: false
    }
  },
  responsive: true,
  maintainAspectRatio: false
})
</script>

<template>
  <div class="wrapper">
    <div class="grid">
      <div class="col-12 md:col-6">
        <Card>
          <template #title>My Cat {{ route.params.id }}</template>
          <template #subtitle>{{ catsStore.cat?.name }}</template>
          <template #content>
            <ul>
              <li>Status: {{ catsStore.catStatus }}</li>
              <li>Hairless: {{ catsStore.cat?.hairless }}</li>
              <li>Color: {{ catsStore.cat?.color }}</li>
            </ul>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-6">
        <Galleria
          :value="images"
          :numVisible="5"
          :circular="true"
          :showItemNavigators="true"
          :showThumbnails="false"
        >
          <template #item="slotProps">
            <img class="image" :src="slotProps.item.url" />
          </template>
        </Galleria>
      </div>
      <div class="col-12 md:col-6">
        <Chart class="canvas" type="bar" :data="birdsPerDayData" :options="birdsPerDayOptions" />
      </div>
      <div class="col-12 md:col-6">
        <Chart
          class="canvas"
          type="line"
          :data="hourlyActivityData"
          :options="hourlyActivityOptions"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image {
  display: block;
  width: 100%;
  height: 350px;
  object-fit: contain;
}

.canvas {
  height: 300px;
}
</style>
