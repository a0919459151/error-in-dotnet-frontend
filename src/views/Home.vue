<template>
  <div class="home">
    <h1>Welcome to Your Vue App!</h1>
    <p>This is a protected page that requires user authentication to access.</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

h1 {
  color: #333;
}

p {
  color: #666;
}
</style>