<template>
    <nav class="navbar">
      <router-link to="/incomes">Доходи</router-link>
      <router-link to="/expenses">Витрати</router-link>
      <router-link to="/reports">Звіти</router-link>
      <button @click="logout" class="logout-btn">Вийти</button>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('token');
      router.push('/');
    };

    return { logout };
  }
};
</script>

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

.logout-btn {
  margin-left: 20px;
  padding: 8px 15px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #d9534f;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.logout-btn:hover {
  background-color: #c9302c;
}
</style>
