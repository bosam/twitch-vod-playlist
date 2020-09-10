<template>
  <div>
    <quick-search />
    <search />
  </div>
</template>

<script type="ts">
/* eslint-disable indent */
    import Vue from 'vue';
    import QuickSearch from './QuickSearch';
    import Search from './Search';

    export default Vue.extend({
        name: 'Home',
        components: {
            QuickSearch,
            Search
        }
    });
</script>

<style>
</style>
