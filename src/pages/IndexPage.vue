<template>
  <q-page class="row justify-center">
    <MyLoader v-if="!data.length" />
    <template v-else>
      <div class="col-12 py-2">
        <div class="row justify-center">
          <span class="text-4xl">{{ currentLeson.title }}</span>
        </div>
      </div>
      <div class="col-12 py-2">
        <div class="row justify-center">
          <span class="text-2xl text-orange-500"
            >{{ currentLeson.subtitle }}.</span
          >
        </div>
      </div>
      <div class="col-12 py-2">
        <div class="row justify-center">
          <div class="col-12 col-sm-8 col-md-6 p-2" style="height: 450px">
            <div id="player" width="100%" height="100%"></div>
          </div>
          <div class="col-10 col-sm-4 p-2">
            <MyMenu>
              <template #body>
                <MyMenuItem
                  v-for="item in data"
                  :key="item.id"
                  @click="refresh(item)"
                  :disabled="!item.unlock"
                >
                  <template #icon>
                    <component
                      :is="getLockComponentName(item.unlock)"
                      :color="getLockColor(item.unlock)"
                    ></component>
                  </template>
                  <template #title>{{ item.subtitle }}</template>
                </MyMenuItem>
              </template>
            </MyMenu>
          </div>
        </div>
      </div>
      <div class="col-12 py-2">
        <div class="row justify-center">
          <div class="col-12 col-sm-8 p-2 text-center">
            <span class="text-1xl">{{ currentLeson.description }}</span>
          </div>
          <div class="col-10 col-sm-4 p-2 flex items-center">
            <div class="row">
              <div v-if="getNextLesson" class="col-12 text-center">
                <span class="text-1xl text-orange font-bold">
                  Переглянули епізод? Отримайте доступ до наступного:</span
                >
              </div>
              <div class="col-12 p-2 text-center">
                <el-button
                  @click="refresh(getNextLesson ? getNextLesson : undefined)"
                  :disabled="getNextLesson ? !getNextLesson.unlock : true"
                  type="warning"
                  >Наступний епізод</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref, watch } from 'vue';
import MyMenu from 'src/components/shared/menu/MyMenu.vue';
import MyMenuItem from 'src/components/shared/menu/MyMenuItem.vue';
import MyLoader from 'src/components/shared/loader/MyLoader.vue';

import { useLessonsStore } from 'src/stores/lessons';

import { Lesson } from 'src/interfaces/common.int';
import { EventYT, RootYT } from 'src/interfaces/yt.int';

const store = useLessonsStore();

await store.fetchLessons();
const data = ref(store.lessons);

const currentLeson = ref(data.value[0]);

const getLockComponentName = (str: boolean): string =>
  str ? 'Unlock' : 'Lock';
const getLockColor = (str: boolean): string => (str ? 'orange' : 'black');

const refresh = (item?: Lesson): void => {
  if (item?.id) {
    currentLeson.value = item;
    if (player.value) player.value.loadVideoById(currentLeson.value.videoId);
  }
};

const player: Ref<RootYT | null> = ref(null);
const initYt = (): void => {
  const videoId = currentLeson.value.videoId;
  player.value = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: videoId,
    events: {
      onStateChange,
    },
  });
};

const durationYt = ref(0);

const getNextLesson = computed(() => {
  const nextLesson = data.value[currentLeson.value.id];
  if (nextLesson && !nextLesson.id) return false;
  return nextLesson;
});
const onStateChange = (event: EventYT): void => {
  if (event && event.data) {
    const { duration = 0 } = event.target.playerInfo;
    durationYt.value = duration;

    if (getNextLesson.value && !getNextLesson.value.unlock) timer(event.data);
  }
};

const timer = (data: number): void => {
  switch (data) {
    case 0:
      activateNextLesson();
      break;

    case 1:
      startTimer();
      break;

    case 2:
      stopTimer();
      break;

    default:
      break;
  }
};
const activateNextLesson = (): void => {
  clearTimer();
  if (data.value[currentLeson.value.id].id)
    data.value[currentLeson.value.id].unlock = true;
};

const totalTimeTimer = ref(0);
const localTimeTimer = ref(0);
const timerIntervalFunc = ref();
const start = ref(1);

const startTimer = (): void => {
  // const start = Date.now();
  // timerIntervalFunc.value = setInterval(function () {
  //   const delta = Date.now() - start;
  //   localTimeTimer.value = Math.floor(delta / 1000);
  // }, 1000);
  timerIntervalFunc.value = setInterval(function () {
    localTimeTimer.value = start.value++;
  }, 1000);
};

const stopTimer = (): void => {
  clearInterval(timerIntervalFunc.value);
  totalTimeTimer.value += localTimeTimer.value;
};

const clearTimer = (): void => {
  localTimeTimer.value = 0;
  totalTimeTimer.value = 0;
  start.value = 0;
};
const diffTimer = computed(
  (): number => durationYt.value - totalTimeTimer.value
);
const diffLocalTimer = computed(
  (): number => durationYt.value - localTimeTimer.value
);

watch([diffTimer, diffLocalTimer], () => {
  if (
    diffLocalTimer.value &&
    diffLocalTimer.value >= 0 &&
    diffLocalTimer.value <= 1
  ) {
    activateNextLesson();
    stopTimer();
  }
  if (diffTimer.value && diffTimer.value >= 0 && diffTimer.value <= 3) {
    activateNextLesson();
    stopTimer();
  }
});

onMounted(async () => {
  initYt();
});
</script>
