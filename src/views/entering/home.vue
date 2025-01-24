<template>
  <div class="common-module">
    <h-module-title title="客诉明细数据"></h-module-title>
  </div>
</template>

<script setup>
// import { router } from '@/api/api.js';
import { apiSearchIndustryDesc } from '@/api/service'
apiSearchIndustryDesc().then(res => {
  console.log('testDemo', res) 
})
</script>

<style lang="scss" scoped>

</style>
