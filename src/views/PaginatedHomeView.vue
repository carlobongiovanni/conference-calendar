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
  <div>
    <router-link :to="{ name: 'home', params: { skip: 10} }">
      next
    </router-link>
  </div>
  <span>{{ countItems }}</span>
</template>

<script>

export default {
  props: ["skip"],
  data() {
    return {
      listItems: [],
      countItems: 0,
      skip: 20
    }
  },
  methods: {
    async getItems() {
      const FULL_URL = import.meta.env.VITE_API_URL + "/endpoint/paginatedEvents?skip=" + this.skip;
      const res = await fetch(FULL_URL);
      const finalRes = await res.json();
      this.listItems = finalRes;
//      this.skip = skip
      if (finalRes[0].totalCount) {
        this.countItems = finalRes[0].totalCount
      }
    }
  },
  mounted() {
    this.getItems()
  }
};
</script>
