<template>
  <div>
    <h1>Book Manager</h1>
    
    <!-- Book List with Update and Delete options -->
    <div class="book-list">
      <h2>All Books</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.name }}</td>
            <td>{{ book.isbn }}</td>
            <td>
              <button @click="selectBookForUpdate(book)" class="btn-update">Update</button>
              <button @click="deleteBook(book.id)" class="btn-delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Update Form -->
    <div v-if="selectedBook" class="update-form">
      <h2>Update Book</h2>
      <form @submit.prevent="updateBook">
        <div>
          <label for="update-name">Name:</label>
          <input type="text" v-model="selectedBook.name" id="update-name" required />
        </div>
        <div>
          <label for="update-isbn">ISBN:</label>
          <input type="text" v-model="selectedBook.isbn" id="update-isbn" required />
        </div>
        <div class="button-group">
          <button type="submit" class="btn-update">Update Book</button>
          <button type="button" @click="cancelUpdate" class="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
    
    <!-- Advanced Query Section -->
    <div class="query-section">
      <h2>Advanced Queries</h2>
      
      <div class="query-controls">
        <button @click="queryOrderByISBN" class="btn-query">Order by ISBN</button>
        <button @click="queryLimit" class="btn-query">Limit to 2 Books</button>
        <button @click="queryWhereNameStartsWith" class="btn-query">Names Starting with 'A'</button>
        <button @click="resetQuery" class="btn-query">Reset</button>
      </div>
      
      <div class="query-results">
        <h3>Query Results:</h3>
        <table v-if="queryResults.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in queryResults" :key="book.id">
              <td>{{ book.name }}</td>
              <td>{{ book.isbn }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No results found</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit, where } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const selectedBook = ref(null);
    const queryResults = ref([]);
    
    // Fetch all books
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };
    
    // Select a book for updating
    const selectBookForUpdate = (book) => {
      selectedBook.value = { ...book };
    };
    
    // Cancel update operation
    const cancelUpdate = () => {
      selectedBook.value = null;
    };
    
    // Update a book
    const updateBook = async () => {
      try {
        const bookRef = doc(db, 'books', selectedBook.value.id);
        
        // Convert ISBN to number
        const isbnNumber = Number(selectedBook.value.isbn);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }
        
        await updateDoc(bookRef, {
          name: selectedBook.value.name,
          isbn: isbnNumber
        });
        
        alert('Book updated successfully!');
        selectedBook.value = null;
        fetchBooks(); // Refresh the list
      } catch (error) {
        console.error('Error updating book: ', error);
      }
    };
    
    // Delete a book
    const deleteBook = async (id) => {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await deleteDoc(doc(db, 'books', id));
          alert('Book deleted successfully!');
          fetchBooks(); // Refresh the list
        } catch (error) {
          console.error('Error deleting book: ', error);
        }
      }
    };
    
    // Advanced Query: Order by ISBN
    const queryOrderByISBN = async () => {
      try {
        const q = query(collection(db, 'books'), orderBy('isbn'));
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        queryResults.value = results;
      } catch (error) {
        console.error('Error executing query: ', error);
      }
    };
    
    // Advanced Query: Limit results
    const queryLimit = async () => {
      try {
        const q = query(collection(db, 'books'), limit(2));
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        queryResults.value = results;
      } catch (error) {
        console.error('Error executing query: ', error);
      }
    };
    
    // Advanced Query: Where name starts with 'A'
    const queryWhereNameStartsWith = async () => {
      try {
        // Firestore doesn't support direct LIKE queries, but we can use >= and < for prefix matching
        const q = query(
          collection(db, 'books'),
          where('name', '>=', 'A'),
          where('name', '<', 'B')
        );
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        queryResults.value = results;
      } catch (error) {
        console.error('Error executing query: ', error);
      }
    };
    
    // Reset query results
    const resetQuery = () => {
      queryResults.value = [];
    };
    
    onMounted(() => {
      fetchBooks();
    });
    
    return {
      books,
      selectedBook,
      queryResults,
      selectBookForUpdate,
      cancelUpdate,
      updateBook,
      deleteBook,
      queryOrderByISBN,
      queryLimit,
      queryWhereNameStartsWith,
      resetQuery
    };
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.btn-update {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}

.btn-delete {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #9e9e9e;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-query {
  background-color: #673ab7;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}

.update-form {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.button-group {
  margin-top: 10px;
}

.query-section {
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.query-controls {
  margin-bottom: 15px;
}

.query-results {
  margin-top: 15px;
}
</style> 