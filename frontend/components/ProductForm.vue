<template>
  <div class="product-form-modal">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content">
      <h2>{{ isEdit ? 'Редактировать продукт' : 'Создать продукт' }}</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="name">Название</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            placeholder="Введите название продукта"
          />
        </div>

        <div class="form-group">
          <label for="category">Категория</label>
          <input
            id="category"
            v-model="formData.category"
            type="text"
            required
            placeholder="Введите категорию"
          />
        </div>

        <div class="form-group">
          <label for="price">Цена</label>
          <input
            id="price"
            v-model.number="formData.price"
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="Введите цену"
          />
        </div>

        <div class="form-group">
          <label for="quantity">Количество</label>
          <input
            id="quantity"
            v-model.number="formData.quantity"
            type="number"
            required
            min="0"
            placeholder="Введите количество"
          />
        </div>

        <div class="form-group">
          <label for="description">Описание</label>
          <textarea
            id="description"
            v-model="formData.description"
            placeholder="Введите описание продукта"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="button" @click="closeModal" class="btn btn-secondary">
            Отмена
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEdit ? 'Сохранить' : 'Создать' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '~/types/product'

const props = defineProps<{
  product?: Product;
  isEdit: boolean;
}>();

const emit = defineEmits(['close', 'submit']);

const formData = ref<Product>({
  name: '',
  price: 0,
  category: '',
  description: '',
  quantity: 0,
} as Product);

onMounted(() => {
  if (props.product) {
    formData.value = { ...props.product };
  }
});

const handleSubmit = async () => {
  const url = props.isEdit
    ? `http://localhost:3000/products/${props.product?._id}`
    : 'http://localhost:3000/products';

  try {
    const response = await fetch(url, {
      method: props.isEdit ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      emit('submit');
      closeModal();
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.product-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  z-index: 1;

  h2 {
    margin-bottom: 20px;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-weight: 500;
    color: #2c3e50;
  }

  input,
  textarea {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
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
}
</style> 