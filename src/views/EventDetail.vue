<template>
    <div class="main">
      <ul>
        <li>
            <div>
                <img :src="item.logo" alt="Logo of the event" width="64" />
            </div>
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
            <div>
                Add to Calendar functionality:
            <add-to-calendar-button 
                :name="item.title"
                description="A nice description does not hurt"
                :startDate="convertDatetimeInDays(item.scheduled_time_from)"
                :endDate="convertDatetimeInDays(item.scheduled_time_to)"
                :location="item.location"
                options="['Apple','Google','iCal','Microsoft365','Outlook.com','Yahoo']"
                trigger="click"
                inline
                listStyle="modal"
                iCalFileName="Reminder-Event"
                >
            </add-to-calendar-button>
            </div>
            <br />

        </li>
      </ul>
    </div>
</template>

<script>
    import 'add-to-calendar-button';

    export default {
        props: ["id"],
        data() {
            return {
                item: {},
                is_data_fetched: false
            }
        },
        methods: {
            async getItem() {
                const FULL_URL = import.meta.env.VITE_API_URL + "/endpoint/event?id=" + this.id 
                const res = await fetch(FULL_URL);
                const finalRes = await res.json();
                this.item = finalRes;
                this.is_data_fetched = true;
            },
            convertDatetime(scheduledTime) {
                var convertedDate = new Date(scheduledTime)
                return convertedDate
            },
            convertDatetimeInDays(scheduledTime) {
                var convertDate = new Date(parseInt(scheduledTime)).toISOString().split('T')[0]
                return convertDate
            },
            checkEmptyObject(object) {
                return object === null
            }
        },
        beforeMount() {
            this.getItem()
        }
    };
</script>