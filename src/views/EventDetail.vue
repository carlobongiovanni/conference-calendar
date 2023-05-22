<template>
    <div class="main">
      <ul>
        <li>
            {{ item.title }} is scheduled from {{ convertDatetime(item.scheduled_time_from) }} to {{ convertDatetime(item.scheduled_time_to) }}, in {{ item.location }} 
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        props: ["id"],
        data() {
            return {
                item: {},
            }
        },
        methods: {
            async getItem() {
                const FULL_URL = import.meta.env.VITE_API_URL + "/endpoint/event?id=" + this.id 
                const res = await fetch(FULL_URL);
                const finalRes = await res.json();
                this.item = finalRes;
            },
            convertDatetime(scheduledTime) {
                var convertedDate = new Date(scheduledTime)
                return convertedDate
            }
        },
        mounted() {
            this.getItem()
        }
    };
</script>