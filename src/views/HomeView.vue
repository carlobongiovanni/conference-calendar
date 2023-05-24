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
    <paginate
        id="unit"
        :page-count="(parseInt((pageCounter / 10) + 1))"
        :page-range="3"
        :initial-page="0"
        :margin-pages="0"
        :click-handler="paginateCallback"
        :first-last-button="true"
        :hide-prev-next="true"
        :prev-class="'ignore'"
        :next-class="'ignore'"
        :disabled-class="'ignore'"
      ></paginate>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";

export default {
  data() {
    return {
      listItems: [],
      page: 0,
      pageCounter: 0
    }
  },
  components: {
    paginate: Paginate,
  },
  methods: {
    async getItems() {
      const FULL_URL = import.meta.env.VITE_API_URL + "/endpoint/paginatedEvents?skip=" + (this.page * 10);
      const res = await fetch(FULL_URL);
      const finalRes = await res.json();
      this.listItems = finalRes;
      if (finalRes[0].totalCount) {
        this.pageCounter = finalRes[0].totalCount
      }
    },
    paginateCallback(pageNum) {
      this.getPaginatedItems(pageNum)
    },
    async getPaginatedItems(pageNum) {
      const FULL_URL = import.meta.env.VITE_API_URL + "/endpoint/paginatedEvents?skip=" + ((pageNum - 1) * 10);
      const res = await fetch(FULL_URL);
      const finalRes = await res.json();
      this.listItems = finalRes;
      if (finalRes[0].totalCount) {
        this.pageCounter = finalRes[0].totalCount
      }
    },
  },
  mounted() {
    this.getItems()
  }
};
</script>
