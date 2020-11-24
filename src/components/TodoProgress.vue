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
        progress: Number,
        progressClass: String,
    },
};
</script>
