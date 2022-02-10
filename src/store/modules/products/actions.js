export default {
  async getProducts(context) {
    const payload = {
      url: 'api/tita/admin/products/all',
    };
    const res = await context.dispatch('axios/get', payload, {
      root: true,
    });
    // console.log(res.data.products);

    context.commit('getProducts', res.data.products);
    const DataLength = Object.entries(res.data.products).length;
    context.commit('setCountDataItem', DataLength);

    // setPageNumber
    const showItem = context.rootGetters['pagination/showItem'];
    const allPage = Math.ceil(DataLength / showItem);
    context.dispatch('pagination/setAllPage', allPage, {
      root: true,
    });
  },
  getEditProductData(context, payload) {
    context.commit('getEditProductData', payload);
  },
  async deleteProduct(context, payload) {
    const id = payload;
    const url = {
      url: `api/tita/admin/product/${id}`,
    };

    const res = await context.dispatch('axios/delete', url, {
      root: true,
    });
    return res.data.success;
  },
  async editProduct(context, payload) {
    const data = {
      url: `api/tita/admin/product/${payload.data.id}`,
      data: {
        ...payload,
      },
    };

    const res = await context.dispatch('axios/put', data, {
      root: true,
    });
    return res.data.success;
  },
  async addProduct(context, payload) {
    const data = {
      url: 'api/tita/admin/product',
      data: {
        ...payload,
      },
    };
    const res = await context.dispatch('axios/post', data, {
      root: true,
    });
    return res.data.success;
  },
};
