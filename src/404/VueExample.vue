<template>
	<p class="vue-example">{{ message }}</p>
</template>

<script>
export default {
	props: ['message'],
};
</script>

<style>
.vue-example {
	color: red;
}
</style>
