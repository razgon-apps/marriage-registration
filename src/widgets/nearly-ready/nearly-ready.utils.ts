import { IGroup } from 'app/store/pages-store';

export const countNonEmptyItems = (items: IGroup[] | undefined): number => {
  return items
    ? items?.reduce((count, item) => {
        if (item.id !== 0 && item.name !== '' && item.imgUrl !== '') {
          return count + 1;
        }
        return count;
      }, 0)
    : 0;
};
