<template>
    <div>
        <quick-search />
        <search />
    </div>
</template>

<script>
/* eslint-disable indent */
    'use strict';

    import QuickSearch from './QuickSearch';
    import Search from './Search';

    export default {
        name: 'Home',
        components: {
            QuickSearch,
            Search
        }
    };
</script>

<style>
</style>
