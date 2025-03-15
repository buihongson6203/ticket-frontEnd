<template>
    <div class="detail-event">
      <WeeklyEventsComponents />
    </div>
  </template>
  
  <script>
import WeeklyEventsComponents from '@/components/WeeklyEventsComponents.vue';
  
  export default {
    name: 'WeeklyEvents',
    components: {
        WeeklyEventsComponents
    }
  }
  </script>
  