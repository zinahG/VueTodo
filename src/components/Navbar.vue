<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <!-- Add more navigation links as needed -->
    </ul>
    <hr class="navbar-line" />
  </nav>
</template>

<!-- <script>
  export default {
    name: 'Navbar',
  }
  </script> -->

<style>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin-bottom: 10px;
}

li {
  margin: 0 10px;
}

hr.navbar-line {
  width: calc(100% - 20px);
  border: none;
  height: 1px;
  background-color: var(--dark);
  position: absolute;
  bottom: 0;
}
</style>
