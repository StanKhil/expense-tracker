<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const router = useRouter();

const user = reactive({
  name: '',
  password: '',
});

const loginUser = async () => {
  try {
    const response = await axiosInstance.post('/login', {
      name: user.name,
      password: user.password, 
    });


    localStorage.setItem('token', response.data.token);
    console.log('Токен сохранен:', response.data.token);

    router.push('/incomes');
  } catch (error) {
    console.error('Ошибка при входе:', error.response?.data || error.message);
    alert('Неверное имя или пароль!');
  }
};

const registerUser = async () => {
  try {
    const response = await axiosInstance.post('/register', {
      name: user.name,
      password: user.password, 
    });

    console.log('Пользователь зарегистрирован:', response.data);

    localStorage.setItem('token', response.data.token);
    router.push('/incomes');
  } catch (error) {
    console.error('Ошибка при регистрации:', error.response?.data || error.message);
    alert('Ошибка при регистрации! Возможно, имя уже занято.');
  }
};
</script>

<template>
  <div class = "login"> 
    <h1>Вхід або реєстрація</h1>
    <form class = "input" @submit.prevent>
      <div class = "name">
        <label for="name" id="label-name">Ім'я:</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>
      <div class = "password">
        <label for="password" id="label-password">Пароль:</label>
        <input type="password" id="password" v-model="user.password" required />
      </div>
      <div class = "buttons">
        <button @click="loginUser">Вхід</button>
        <button @click="registerUser">Реєстрація</button>
      </div>

    </form>
  </div>
</template>


<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 20px;
  background: linear-gradient(to right, #57c84d, #3a8b29);
  color: rgb(255, 255, 255);
}

.input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.name {
  margin-bottom: 10px;
  width: 100%;
}

.password {
  margin-bottom: 10px;
  width: 100%;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
}

#name, #password {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  font-size: 20px;
}

button {
  padding: 5px 10px;
  font-size: 15px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  color: rgb(131, 223, 108);
  border: none;
  border-radius: 5px;
  height: 40px;
  width: 120px;
  font-size: 20px;
}

button:hover {
  background-color: rgb(61, 163, 36);
  color: rgb(255, 255, 255);
}
 
input{
  font-size: 20px;
  padding: 5px;
  margin-top: 5px;
  width: 100%;
  background-color: rgb(139, 236, 126);
}
</style>
