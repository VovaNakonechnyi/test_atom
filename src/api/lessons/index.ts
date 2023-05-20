import { useCustomFetch } from 'src/composables/fetch';
import { Lesson } from 'src/interfaces/common.int';
// const query = 'src/db.json';
const query = 'https://vovanakonechnyi.github.io/db.json';
export default () => ({
  apiLessons(): Promise<Lesson[]> {
    return useCustomFetch(`${query}`, {
      method: 'GET',
    });
  },
});
