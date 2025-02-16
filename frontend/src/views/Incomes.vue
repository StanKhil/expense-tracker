<script setup>

</script>

<template>
  <div>
    <h1>Доходи</h1>
    <form @submit.prevent>
      <label for="name">Назва:</label>
      <input type="text" id="name" required />

      <label for="amount">Сума:</label>
      <input type="number" id="amount" required />

      <label for="date">Дата:</label>
      <input type="date" id="date" required />

      <button>Додати</button>
    </form>
  </div>
</template>