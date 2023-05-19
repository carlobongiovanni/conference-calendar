<template>
  <div class="main">
    <ul>
      <li v-for="item in listItems">
        <router-link :to="{ name: 'eventDetail', params: { id: item._id } }">
          {{ item.title }} - from {{ item.scheduled_time_from }} to {{ item.scheduled_time_to }}, in {{ item.location }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      listItems: [],
    }
  },
  methods: {
    async getItems() {
      const FULL_URL = import.meta.env.VITE_API_URL + "/endpoint/events"
      const res = await fetch(FULL_URL);
      const finalRes = await res.json();
      this.listItems = finalRes;
    }
  },
  mounted() {
    this.getItems()
  }
};
</script>
