<template>
  <div class="container">
    <ProductList
      @edit="handleEdit"
      @create="handleCreate"
    />
    <ProductForm
      v-if="showModal"
      :product="selectedProduct"
      :is-edit="!!selectedProduct"
      @close="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '~/types/product'

const showModal = ref(false);
const selectedProduct = ref<Product | null>(null);

const handleEdit = (product: Product) => {
  selectedProduct.value = product;
  showModal.value = true;
};

const handleCreate = () => {
  selectedProduct.value = null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedProduct.value = null;
};

const handleSubmit = () => {
  showModal.value = false;
  selectedProduct.value = null;
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style> 