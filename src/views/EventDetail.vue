<template>
    <div class="main">
      <ul>
        <li>
            {{ item.title }} is scheduled from {{ convertDatetime(item.scheduled_time_from) }} to {{ convertDatetime(item.scheduled_time_to) }}.
            <div>
                <br/>
                The event will be held in/at: {{ item.location }}</div>
            <div v-if="item.misc != ''">            
                <br/>
                More informations: <span v-html="item.misc"></span></div>
            <br/>
            Registration to the conference is {{ item.status }}. 
            <div v-if="checkEmptyObject(item.cfp)">
                A CFP is available! More details:
                <br/>
                {{ item.cfp ? item.cfp.link : '' }}, up to {{ item.cfp ? convertDatetime(item.cfp.untilDate) : 'N/A' }}    
            </div>
            
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
            },
            checkEmptyObject(object) {
                return object === null
            }
        },
        mounted() {
            this.getItem()
        }
    };
</script>