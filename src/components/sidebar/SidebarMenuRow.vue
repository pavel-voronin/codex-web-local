<template>
  <component
    :is="props.as"
    class="sidebar-menu-row"
    :data-has-left="hasLeft"
    :data-has-right="hasRight"
    :data-force-right-hover="props.forceRightHover"
    v-bind="$attrs"
  >
    <span v-if="hasLeft" class="sidebar-menu-row-left">
      <slot name="left" />
    </span>

    <span class="sidebar-menu-row-main">
      <slot />
    </span>

    <span v-if="hasRight" class="sidebar-menu-row-right">
      <span v-if="hasRightDefault" class="sidebar-menu-row-right-default">
        <slot name="right" />
      </span>
      <span v-if="hasRightHover" class="sidebar-menu-row-right-hover">
        <slot name="right-hover" />
      </span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    as?: string
    forceRightHover?: boolean
  }>(),
  {
    as: 'div',
    forceRightHover: false,
  },
)

const slots = useSlots()

const hasLeft = computed(() => Boolean(slots.left))
const hasRightDefault = computed(() => Boolean(slots.right))
const hasRightHover = computed(() => Boolean(slots['right-hover']))
const hasRight = computed(() => hasRightDefault.value || hasRightHover.value)
</script>

<style scoped>
@reference "tailwindcss";

.sidebar-menu-row {
  @apply w-full min-w-0 rounded-lg px-3 py-1 text-left transition flex items-center gap-2;
}

.sidebar-menu-row-left {
  @apply w-4 h-4 shrink-0 flex items-center justify-center text-zinc-500;
}

.sidebar-menu-row-main {
  @apply min-w-0 flex-1;
}

.sidebar-menu-row-right {
  @apply ml-2 shrink-0 flex items-center;
}

.sidebar-menu-row-right-default,
.sidebar-menu-row-right-hover {
  @apply transition;
}

.sidebar-menu-row[data-has-right='true'] .sidebar-menu-row-right-hover {
  @apply opacity-0 pointer-events-none w-0 overflow-hidden;
}

.sidebar-menu-row[data-has-right='true']:hover .sidebar-menu-row-right-default,
.sidebar-menu-row[data-has-right='true']:focus-within .sidebar-menu-row-right-default {
  @apply opacity-0 pointer-events-none w-0 overflow-hidden;
}

.sidebar-menu-row[data-has-right='true']:hover .sidebar-menu-row-right-hover,
.sidebar-menu-row[data-has-right='true']:focus-within .sidebar-menu-row-right-hover {
  @apply opacity-100 pointer-events-auto w-auto overflow-visible;
}

.sidebar-menu-row[data-has-right='true'][data-force-right-hover='true'] .sidebar-menu-row-right-default {
  @apply opacity-0 pointer-events-none w-0 overflow-hidden;
}

.sidebar-menu-row[data-has-right='true'][data-force-right-hover='true'] .sidebar-menu-row-right-hover {
  @apply opacity-100 pointer-events-auto w-auto overflow-visible;
}
</style>
