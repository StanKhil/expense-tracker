<template>
    <nav class="navbar">
      <router-link to="/incomes">Доходи</router-link>
      <router-link to="/expenses">Витрати</router-link>
      <router-link to="/reports">Звіти</router-link>
    </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4CAF50;
  padding: 15px;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin: 0 20px;
  font-size: 18px;
  font-weight: bold;
  transition: 0.3s;
}

.navbar a:hover {
  text-decoration: underline;
}

.navbar a.router-link-exact-active {
  text-decoration: underline;
}
</style>