export default {
  namespaced: true,
  actions: {
    async login(context, payload) {
      try {
        const data = {
          url: 'admin/signin',
          ...payload,
        };
        const res = await context.dispatch('axios/post', data, {
          root: true,
        });
        // console.log(res);
        const { token } = res.data;

        // cookie
        const expired = new Date(res.data.expired).toUTCString();
        document.cookie = `token=${token};expires=${expired};`;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    async tryLogin(context) {
      const payload = {
        url: 'api/user/check',
      };

      try {
        const res = await context.dispatch('axios/post', payload, {
          root: true,
        });

        // console.log(res);
        return res.data.success;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    async logout(context) {
      try {
        const payload = {
          url: 'logout',
        };

        await context.dispatch('axios/post', payload, {
          root: true,
        });

        // cookie clear
        document.cookie = `token=;expires=${new Date().toGMTString()}`;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};
