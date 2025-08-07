<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
    
    <!-- Display BookList component below the form -->
    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';
import BookList from '../components/BookList.vue';

const isbn = ref('');
const name = ref('');

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value);
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number');
      return;
    }
    
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value
    });
    
    isbn.value = '';
    name.value = '';
    alert('Book added successfully!');
    
    // Refresh the book list by forcing a component reload
    // This is a simple approach; in a more complex app, we would use a more elegant solution
    window.location.reload();
  } catch (error) {
    console.error('Error adding book: ', error);
  }
};
</script>

<style scoped>
div {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  padding: 8px;
  width: 100%;
  max-width: 300px;
}
button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style> 