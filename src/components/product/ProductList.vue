<template>
  <div>
    <section class="mb-3">
      <div class="flex items-center justify-between">
        <h2 class="mb-2 text-2xl font-extrabold">產品列表</h2>
        <ul class="flex">
          <li class="mr-1">
            <p>
              總共有 <span> {{ countDataItem }}</span>
              項產品 /
            </p>
          </li>
          <li>
            <p>
              本頁有
              <span> {{ productsData.length }} </span>
              項產品
            </p>
          </li>
        </ul>
      </div>
      <table class="w-full lg:text-center">
        <thead>
          <tr class="border-b-2 border-black">
            <th class="p-2" @click="sort('title')">
              產品名稱
              <img
                src="@/assets/long-arrow-alt-down-solid.svg"
                alt="arrow"
                class="w-[8px] inline"
                :class="{ ' rotate-180': toSort }"
                v-if="sortType === 'title'"
              />
              <img
                src="@/assets/window-minimize-regular.svg"
                alt="minimize"
                class="w-[8px] inline"
                v-if="sortType !== 'title'"
              />
            </th>
            <th class="p-2">主圖</th>
            <th class="p-2" @click="sort('category')">
              分類
              <img
                src="@/assets/long-arrow-alt-down-solid.svg"
                alt="arrow"
                class="w-[8px] inline"
                :class="{ ' rotate-180': toSort }"
                v-if="sortType === 'category'"
              />
              <img
                src="@/assets/window-minimize-regular.svg"
                alt="minimize"
                class="w-[8px] inline"
                v-if="sortType !== 'category'"
              />
            </th>
            <th class="p-2" @click="sort('origin_price')">
              原價
              <img
                src="@/assets/long-arrow-alt-down-solid.svg"
                alt="arrow"
                class="w-[8px] inline"
                :class="{ ' rotate-180': toSort }"
                v-if="sortType === 'origin_price'"
              />
              <img
                src="@/assets/window-minimize-regular.svg"
                alt="minimize"
                class="w-[8px] inline"
                v-if="sortType !== 'origin_price'"
              />
            </th>
            <th class="p-2" @click="sort('price')">
              售價
              <img
                src="@/assets/long-arrow-alt-down-solid.svg"
                alt="arrow"
                class="w-[8px] inline"
                :class="{ ' rotate-180': toSort }"
                v-if="sortType === 'price'"
              />
              <img
                src="@/assets/window-minimize-regular.svg"
                alt="minimize"
                class="w-[8px] inline"
                v-if="sortType !== 'price'"
              />
            </th>
            <th class="p-2" @click="sort('is_enabled')">
              是否上架
              <img
                src="@/assets/long-arrow-alt-down-solid.svg"
                alt="arrow"
                class="w-[8px] inline"
                :class="{ ' rotate-180': toSort }"
                v-if="sortType === 'is_enabled'"
              />
              <img
                src="@/assets/window-minimize-regular.svg"
                alt="minimize"
                class="w-[8px] inline"
                v-if="sortType !== 'is_enabled'"
              />
            </th>
            <th class="p-2">編輯/刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productsData" :key="product[1].id" class="border-b-2">
            <td class="">{{ product[1].title }}</td>
            <td class="">
              <img
                :src="product[1].imageUrl"
                :alt="product[1].title"
                class="h-[60px] w-[80px] p-1 object-cover mx-auto"
              />
            </td>
            <td class="">{{ product[1].category }}</td>
            <td class="">{{ product[1].origin_price }}</td>
            <td class="">{{ product[1].price }}</td>
            <td class="" :class="{ 'text-red-500': product[1].is_enabled === 0 }">
              {{ product[1].is_enabled === 0 ? '未上架' : '上架' }}
            </td>
            <td>
              <base-btn outline @click="showEditProduct(product[1])" class="mr-2">編輯</base-btn>
              <base-btn red-outline @click="tryDeleteProduct(product[1])">刪除</base-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <base-dialog :show="switchEditProduct" @close="closeEditProduct" product-model title="修改商品">
      <product-form @product-from-data="editProduct"></product-form>
    </base-dialog>
    <base-dialog :show="switchDeleteProduct" title="刪除商品" @close="closeDeleteProduct">
      <p class="mb-2 text-2xl">確定要刪除商品？</p>
      <div class="flex">
        <base-btn class="w-full mr-2" outline @click="closeDeleteProduct">否</base-btn>
        <base-btn class="w-full" red-outline @click="deleteProduct">是</base-btn>
      </div>
    </base-dialog>
    <base-pagination></base-pagination>
  </div>
</template>

<script>
import ProductForm from './ProductForm.vue';

export default {
  emit: ['product-id', 'edit-product-data'],
  components: { ProductForm },
  data() {
    return {
      switchEditProduct: false,
      sortType: 'title',
      toSort: false,
      switchDeleteProduct: false,
      deleteProductId: null,
    };
  },
  computed: {
    countPageData() {
      const currentPage = this.$store.getters['pagination/currentPage'];
      const showItem = this.$store.getters['pagination/showItem'];
      const start = (currentPage - 1) * showItem;
      const end = currentPage * showItem;
      return { start, end };
    },
    productsData() {
      const data = this.$store.getters['product/productsData'] ?? '';
      const dataArr = Object.entries(data);
      const newData = dataArr.slice(this.countPageData.start, this.countPageData.end);

      if (this.sortType !== '') {
        return newData.sort((itemA, itemB) => {
          if (itemA[1][this.sortType] > itemB[1][this.sortType]) return this.toSort ? -1 : 1;
          if (itemA[1][this.sortType] < itemB[1][this.sortType]) return this.toSort ? 1 : -1;
          return 0;
        });
      }

      return newData;
    },
    countDataItem() {
      return this.$store.getters['product/countDataItem'];
    },
  },

  methods: {
    showEditProduct(product) {
      this.$store.dispatch('product/getEditProductData', product);
      this.switchEditProduct = true;
    },
    closeEditProduct() {
      this.switchEditProduct = false;
    },
    tryDeleteProduct(product) {
      this.switchDeleteProduct = true;
      const { id } = product;
      this.deleteProductId = id;
    },
    editProduct(product) {
      this.switchEditProduct = false;
      this.$emit('edit-product-data', product);
    },
    sort(type) {
      this.toSort = !this.toSort;
      this.sortType = type;
    },
    closeDeleteProduct() {
      this.switchDeleteProduct = false;
    },
    deleteProduct() {
      this.switchDeleteProduct = false;
      this.$emit('product-id', this.deleteProductId);
    },
  },
};
</script>
