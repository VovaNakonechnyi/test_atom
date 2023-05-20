<template>
  <el-menu-item :disabled="disabled">
    <el-icon :size="100">
      <slot name="icon"></slot>
    </el-icon>
    <span>
      <slot name="title"></slot>
    </span>
  </el-menu-item>
</template>
<script setup lang="ts">
interface Props {
  disabled: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: true,
});
</script>
