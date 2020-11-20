<template>
    <div>Welcome to Everflow! <br/>
        <router-link :to="{ name: 'home-about'}">About Page</router-link>
        <hello-world></hello-world>
    </div>
</template>
<script lang="ts" src="./index.vue.ts"></script>
<style lang="scss" module>
@import "./style.module.scss";
</style>