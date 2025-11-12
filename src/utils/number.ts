export function useNumberFormat(number: number): string | number {
    if (number > 100000000) {
        return Number((number / 100000000).toFixed(1)) + ' 亿';
    }

    if (number > 10000000) {
        return Number((number / 10000000).toFixed(1)) + ' 千万';
    }

    if (number > 10000) {
        return Number((number / 10000).toFixed(1)) + ' 万';
    }

    return number;
}

export function useFormatDuring(during: number) {
    const s = Math.floor(during) % 60;
    during = Math.floor(during / 60);
    const i = during % 60;

    const ii = i < 10 ? `0${i}` : i;
    const ss = s < 10 ? `0${s}` : s;

    return ii + ':' + ss;

}

export const formateSongsAuthor = (attr: any[]) => {
  return attr.map(item => item.name).join(' / ');
};

// 根据指定的数量将数组切片
export const sliceArr = (count=20, list:any[]) => {
  const arr = [];
  let index = 0;
  let nextSliceIndex = 0;
  while (index < list.length) {
    const item = list.slice(nextSliceIndex, nextSliceIndex+count);
    arr.push(item);
    index++;
    nextSliceIndex+=count;
  }
  return arr;
};

// 获取数组最后一位
export const getArrLast = (arr:any[]) => {
  return arr[arr.length - 1];
};