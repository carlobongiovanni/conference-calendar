<script>
export default {
    data() {
        return {
            userIp: {},
        }
    },
    methods: {
        async getUserIp() {
          const IP_GETTER_URL = "https://api.ipify.org?format=json";
          const userIp = await fetch(IP_GETTER_URL);
          const responseUserIp = await userIp.json();

          const STORE_IP_URL = import.meta.env.VITE_API_URL + "/endpoint/storeIp?ip=" + responseUserIp.ip 
          await fetch(STORE_IP_URL, { method: "POST" });
        },
    },
    mounted() {
        this.getUserIp()
    }
};
</script>

<template>
  <div class="hidden">

  </div>
</template>
