<template>
  <div class="product-list">
    <div class="product-list__header">
      <h2>Список продуктов</h2>
      <button @click="openCreateModal" class="btn btn-primary">
        Добавить продукт
      </button>
    </div>

    <div class="product-list__grid">
      <div v-for="product in products" :key="product._id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p class="category">{{ product.category }}</p>
        <p class="description">{{ product.description }}</p>
        <div class="details">
          <span class="price">{{ product.price }} ₽</span>
          <span class="quantity">В наличии: {{ product.quantity }}</span>
        </div>
        <div class="actions">
          <button @click="editProduct(product)" class="btn btn-secondary">
            Редактировать
          </button>
          <button @click="deleteProduct(product._id)" class="btn btn-danger">
            Удалить
          </button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)"
        class="btn btn-secondary"
      >
        Назад
      </button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)"
        class="btn btn-secondary"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '~/types/product'

const products = ref<Product[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = 10;

const fetchProducts = async (page: number) => {
  try {
    const response = await fetch(`http://localhost:3000/products?page=${page}&limit=${itemsPerPage}`);
    const data = await response.json();
    products.value = data.products;
    totalPages.value = Math.ceil(data.total / itemsPerPage);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const changePage = (page: number) => {
  currentPage.value = page;
  fetchProducts(page);
};

const deleteProduct = async (id: string) => {
  if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });
      await fetchProducts(currentPage.value);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
};

const emit = defineEmits(['edit', 'create']);

const editProduct = (product: Product) => {
  emit('edit', product);
};

const openCreateModal = () => {
  emit('create');
};

onMounted(() => {
  fetchProducts(1);
});
</script>

<style lang="scss" scoped>
.product-list {
  padding: 20px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }
}

.product-card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;

  h3 {
    margin: 0 0 10px;
    font-size: 1.2em;
  }

  .category {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 10px;
  }

  .description {
    margin-bottom: 15px;
    line-height: 1.4;
  }

  .details {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    .price {
      font-weight: bold;
      color: #2c3e50;
    }

    .quantity {
      color: #666;
    }
  }

  .actions {
    display: flex;
    gap: 10px;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &-primary {
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: color.adjust(#3498db, $lightness: -7.5%);
      border-color: color.adjust(#3498db, $lightness: -10%);
    }
  }

  &-secondary {
    background-color: #ecf0f1;
    color: #2c3e50;

    &:hover {
      background-color: color.adjust(#ecf0f1, $lightness: -7.5%);
      border-color: color.adjust(#ecf0f1, $lightness: -10%);
    }
  }

  &-danger {
    background-color: #e74c3c;
    color: white;

    &:hover {
      background-color: color.adjust(#e74c3c, $lightness: -7.5%);
      border-color: color.adjust(#e74c3c, $lightness: -10%);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style> 