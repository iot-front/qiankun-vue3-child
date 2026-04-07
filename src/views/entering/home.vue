<template>
  <div class="common-module">
    <h-module-title :title="t('common.emptyText')"></h-module-title>
  </div>
</template>

<script setup>
// import { router } from '@/api/api.js';
import { apiSearchIndustryDesc } from '@/api/service'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
apiSearchIndustryDesc().then(res => {
  console.log('testDemo', res) 
})
</script>

<style lang="scss" scoped>

</style>
