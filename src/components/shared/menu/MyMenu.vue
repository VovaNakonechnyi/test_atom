<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
  >
    <slot name="body"></slot>
    <!-- <el-menu-item
      v-for="item in data"
      :key="item.id"
      :index="item.subtitle"
      @click="refresh(item)"
      :disabled="!item.unlock"
    >
      <el-icon :size="100">
        <component
          :is="getLockComponentName(item.unlock)"
          :color="getLockColor(item.unlock)"
        ></component>
      </el-icon>
      <span>{{ item.subtitle }}</span>
    </el-menu-item> -->
  </el-menu>
</template>
