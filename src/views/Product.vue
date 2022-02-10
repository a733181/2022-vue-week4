<template>
  <div class="container mx-auto my-5">
    <section class="w-full mb-6 lg:flex lg:justify-between">
      <base-btn red-outline @click="logout">登出</base-btn>
      <base-btn @click="showAddProduct">新增商品</base-btn>
    </section>
    <product-list @product-id="deleteProduct" @edit-product-data="editProduct" />
    <base-loading :show="isLoading"></base-loading>
    <base-dialog :show="!!error" title="Error" @close="closeDialog">
      {{ error }}
    </base-dialog>
    <base-dialog :show="switchAddProduct" @close="closeAddProduct" product-model title="新增商品">
      <product-form add-product-model @product-from-data="addProduct"></product-form>
    </base-dialog>
  </div>
</template>

<script>
import ProductList from '../components/product/ProductList.vue';
import ProductForm from '../components/product/ProductForm.vue';

export default {
  components: { ProductList, ProductForm },
  data() {
    return {
      error: null,
      isLoading: false,
      switchAddProduct: false,
    };
  },
  computed: {},
  methods: {
    async tryLogin() {
      try {
        this.isLoading = true;
        const res = await this.$store.dispatch('auth/tryLogin');
        if (res) {
          this.getProducts();
        }
      } catch (err) {
        this.$router.replace('/login');
        this.isLoading = false;
      }
    },
    async getProducts() {
      try {
        await this.$store.dispatch('product/getProducts');
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
    closeDialog() {
      this.error = null;
    },
    showAddProduct() {
      this.switchAddProduct = true;
    },
    closeAddProduct() {
      this.switchAddProduct = false;
    },
    async addProduct(productData) {
      this.switchAddProduct = false;
      try {
        this.isLoading = true;
        const res = await this.$store.dispatch('product/addProduct', productData);
        if (res) {
          this.getProducts();
        }
      } catch (err) {
        this.isLoading = false;
        this.err = err.message;
      }
    },
    async editProduct(productData) {
      try {
        this.isLoading = true;
        const res = await this.$store.dispatch('product/editProduct', productData);
        if (res) {
          this.getProducts();
        }
      } catch (err) {
        this.isLoading = false;
        this.error = err.message;
      }
    },
    async deleteProduct(productId) {
      try {
        this.isLoading = true;
        const res = await this.$store.dispatch('product/deleteProduct', productId);
        if (res) {
          this.getProducts();
        }
      } catch (err) {
        this.isLoading = false;
        this.error = err.message;
      }
    },
    async logout() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('auth/logout');
        this.$router.replace('/login');
      } catch (err) {
        this.err = err.message;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.tryLogin();
  },
};
</script>
