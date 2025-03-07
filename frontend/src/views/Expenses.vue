<script setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import '../assets/style.css';
import Navigation from '../components/Navigation.vue';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const formatDate = (dateStr) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('uk-UA', options);
};

const expense = reactive({
  title: '',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  category: '',
});

const expenses = reactive({ list: [] });

const categories = [
  'Продукти',
  'Медицина',
  'Розваги',
  'Тварини',
  'Транспорт',
  'Рослини',
  'Навчання',
  'Харчування',
  'Бізнес',
  'Інше'
];

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const addExpense = async () => {
  try {
    const response = await axiosInstance.post(
      '/expenses',
      {
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
        category: expense.category,
      },
      getAuthHeaders()
    );

    console.log('Витрату додано:', response.data);

    expense.title = '';
    expense.amount = '';
    expense.date = new Date().toISOString().split('T')[0];
    expense.category = '';

    await getExpenses();
  } catch (error) {
    console.error('Помилка при додаванні витрати:', error.response?.data || error.message);
  }
};

const getExpenses = async () => {
  try {
    const response = await axiosInstance.get('/expenses', getAuthHeaders());
    expenses.list = response.data;
    console.log('Витрати отримані:', response.data);
  } catch (error) {
    console.error('Помилка при отриманні витрат:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      alert('Помилка авторизації! Будь ласка, увійдіть знову.');
    } else {
      alert('Помилка при отриманні витрат!');
    }
  }
};

const deleteExpense = async (id) => {
  try {
    await axiosInstance.delete(`/expenses/${id}`, getAuthHeaders());
    console.log('Витрату видалено:', id);

    await getExpenses();
  } catch (error) {
    console.error('Помилка при видаленні витрати:', error.response?.data || error.message);
    alert('Помилка при видаленні витрати!');
  }
};

onMounted(getExpenses);
</script>

<template>
  <Navigation />
  <div class="background">
    <div class="container">
      <div class="section">
        <h1>Додати витрату</h1>
        <form @submit.prevent="addExpense" class="input-form">
          <label for="title">Назва:</label>
          <input type="text" id="title" v-model="expense.title" required />

          <label for="amount">Сума:</label>
          <input type="number" id="amount" v-model="expense.amount" required />

          <label for="date">Дата:</label>
          <input type="date" id="date" v-model="expense.date" required />

          <label for="category">Категорія:</label>
          <select id="category" v-model="expense.category" required>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>

          <button type="submit">Додати</button>
        </form>
      </div>

      <div class="list">
        <h1>Список витрат</h1>
        <ul v-if="expenses.list.length > 0" class="item-list">
          <li v-for="exp in expenses.list" :key="exp.id" class="item-card">
            <div class="item-info">
              <strong>{{ exp.title }}</strong>
              <p>{{ exp.amount }} грн ({{ formatDate(exp.date) }})</p>
              <span class="category">Категорія: {{ exp.category }}</span>
            </div>
            <button @click="deleteExpense(exp._id)" class="delete-btn">Видалити</button>
          </li>
        </ul>
        <p v-else>Витрат поки що немає.</p>
      </div>
    </div>
  </div>
</template>
