<script setup>
import axios from 'axios';
import { reactive, ref, onMounted } from 'vue';
import '../assets/style.css';
import Navigation from '../components/Navigation.vue';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
  });

const formatDate = (dateStr) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('uk-UA', options);
};


const filterType = ref('category');
const filterValue = ref('');
const token = localStorage.getItem('token');

const incomes = reactive({ list: [] });
const expenses = reactive({ list: [] });

const balance = ref(0);

const fetchData = async () => {
  let expenseUrl = '/expenses';
  let incomeUrl = '/incomes';
  if (String(filterValue.value).trim() === '') {
    console.warn('Поле фільтру порожнє');
    return;
}
  
  try {
    if (filterType.value === 'category') {
      expenseUrl = `/expenses/category/${encodeURIComponent(filterValue.value)}`;
      incomeUrl = `/incomes/category/${encodeURIComponent(filterValue.value)}`;
    } else if (filterType.value === 'date') {
      expenseUrl = `/expenses/date/${filterValue.value}`;
      incomeUrl = `/incomes/date/${filterValue.value}`;
    } else if (filterType.value === 'month') {
      const [year, month] = filterValue.value.split('-');
      expenseUrl = `/expenses/month/${year}/${month}`;
      incomeUrl = `/incomes/month/${year}/${month}`;
    } else if (filterType.value === 'year') {
      expenseUrl = `/expenses/year/${filterValue.value}`;
      incomeUrl = `/incomes/year/${filterValue.value}`;
    }

    const [expenseData, incomeData] = await Promise.all([
      axiosInstance.get(expenseUrl, { headers: { Authorization: `Bearer ${token}` } }),
      axiosInstance.get(incomeUrl, { headers: { Authorization: `Bearer ${token}` } })
    ]);
    
    expenses.list = expenseData.data;
    incomes.list = incomeData.data;
  } catch (error) {
    console.error('Ошибка загрузки данных', error);
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const getCurrentMoney = async () => {
    const allIncomes = reactive({ list: [] });
    const allExpenses = reactive({ list: [] });

    try {
        const resInc = await axiosInstance.get('/incomes', getAuthHeaders());
        allIncomes.list = resInc.data;

        const resExp = await axiosInstance.get('/expenses', getAuthHeaders());
        allExpenses.list = resExp.data;

        const totalIncomes = allIncomes.list.reduce((sum, income) => sum + income.amount, 0);
        const totalExpenses = allExpenses.list.reduce((sum, expense) => sum + expense.amount, 0);
        balance.value = totalIncomes - totalExpenses;

        console.log(`Текущий остаток: ${balance} грн`);
        return balance;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
};

onMounted(getCurrentMoney);
</script>

<template>
    <Navigation />
    <div class="background"> 
        <div class="container">
            <h1 class="balance">Баланс: {{ balance }}</h1>
            <div class="section">
                <label for="filterType">Фільтр:</label>
                <div class="input-form">
                    <select v-model="filterType">
                        <option value="category">За категорією</option>
                        <option value="date">За датою</option>
                        <option value="month">За місяцем</option>
                        <option value="year">За роком</option>
                    </select>
                    <input v-if="filterType === 'category'" v-model="filterValue" placeholder="Введіть категорію" />
                    <input v-if="filterType === 'date'" v-model="filterValue" type="date" />
                    <input v-if="filterType === 'month'" v-model="filterValue" type="month" />
                    <input v-if="filterType === 'year'" v-model="filterValue" type="number" min="2000" max="2100" placeholder="Введіть рік" />
                    </div>
                <button @click="fetchData">Показати</button>
            </div>

            <div class="list two-columns">
                <div class="column">
                    <h3>Доходи</h3>
                    <div class="items-list">
                        <div class="item-card" v-for="inc in incomes.list" :key="inc.id">
                            <div class="item-info">
                                <strong>{{ inc.title }}</strong> - {{ inc.amount }} грн ({{ formatDate(inc.date) }})
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <h3>Витрати</h3>
                    <div class="items-list">
                        <div class="item-card" v-for="exp in expenses.list" :key="exp.id">
                            <div class="item-info">
                                <strong>{{ exp.title }}</strong> - {{ exp.amount }} грн ({{ formatDate(exp.date) }})
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.section, .list {
    background-color: rgba(255, 255, 255, 0.9);
    color: #3a8b29;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 100%;
}

.input-form {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

input, select {
    flex: 1;
    max-width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #3a8b29;
    border-radius: 5px;
}

.list.two-columns {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.column {
    width: 48%;
}

.balance {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
  color: #3a8b29;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

</style>
