<script setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import '../assets/style.css';
import Navigation from '../components/Navigation.vue';


const formatDate = (dateStr) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('uk-UA', options);
};

const income = reactive({
  title: '',
  amount: '',
  date: '',
  category: '',
});

const incomes = reactive({ list: [] });

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const addIncome = async () => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/incomes',
      {
        title: income.title,
        amount: income.amount,
        date: income.date,
        category: income.category,
      },
      getAuthHeaders()
    );

    console.log('Дохід додано:', response.data);

    income.title = '';
    income.amount = '';
    income.date = '';
    income.category = '';

    await getIncomes();
  } catch (error) {
    console.error('Помилка при додаванні доходу:', error.response?.data || error.message);
  }
};

const getIncomes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/incomes', getAuthHeaders());
    incomes.list = response.data;
    console.log('Доходи отримані:', response.data);
  } catch (error) {
    console.error('Помилка при отриманні доходів:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      alert('Помилка авторизації! Будь ласка, увійдіть знову.');
    } else {
      alert('Помилка при отриманні доходів!');
    }
  }
};


const deleteIncome = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/incomes/${id}`, getAuthHeaders());
    console.log('Дохід видалено:', id);

    await getIncomes();
  } catch (error) {
    console.error('Помилка при видаленні доходу:', error.response?.data || error.message);
    alert('Помилка при видаленні доходу!');
  }
};

onMounted(getIncomes);
</script>

<template>
  <Navigation />
  <div class="background">
    <div class="container">
      <div class="section">
        <h1>Додати дохід</h1>
        <form @submit.prevent="addIncome" class="input-form">
          <label for="title">Назва:</label>
          <input type="text" id="title" v-model="income.title" required />

          <label for="amount">Сума:</label>
          <input type="number" id="amount" v-model="income.amount" required />

          <label for="date">Дата:</label>
          <input type="date" id="date" v-model="income.date" required />

          <label for="category">Категорія:</label>
          <input type="text" id="category" v-model="income.category" required />

          <button type="submit">Додати</button>
        </form>
      </div>

      <div class="list">
        <h1>Список доходів</h1>
        <ul v-if="incomes.list.length > 0" class="item-list">
          <li v-for="inc in incomes.list" :key="inc.id" class="item-card">
            <div class="item-info">
              <strong>{{ inc.title }}</strong>
              <p>{{ inc.amount }} грн ({{ formatDate(inc.date) }})</p>
              <span class="category">Категорія: {{ inc.category }}</span>
            </div>
            <button @click="deleteIncome(inc._id)" class="delete-btn">Видалити</button>
          </li>
        </ul>
        <p v-else>Доходів поки що немає.</p>
      </div>
    </div>
  </div>
</template>
