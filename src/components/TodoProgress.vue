<template>
    <div class="progress">
        <div
            class="progress-bar bg-secondary"
            role="progressbar"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="`width: ${progress}%;`"
            :class="progressClass"
        >
            {{ progress }}%
        </div>
    </div>
</template>

<script>
export default {
    props: {
        total: Number,
        completed: Number,
    },

    computed: {
        progress: function() {
            const progress = (this.completed * 100) / this.total || 0;
            console.log("progress", progress);
            return Math.round(progress);
        },

        progressClass: function() {
            const progress = this.progress;

            if (progress >= 0 && progress <= 30) {
                return "bg-danger";
            } else if (progress > 30 && progress <= 60) {
                return "bg-warning";
            } else {
                return "bg-success";
            }
        },
    },
};
</script>
