<template>
  <header class="header">
    <g-link to="/">
        <img alt="Vue logo" class="logo" src="@/assets/calendar.png" width="40" height="40" />
        <h1>Welcome to {{siteName}}</h1></g-link>
  </header>
</template>

<script>
export default {
  props: ["siteName"],
};
</script>

<style lang="css">
.logo {
    padding: 2px;
}

.header {
    display: block;
    justify-content: space-between;
}

h1, img {
    display: inline-block;
}
</style>