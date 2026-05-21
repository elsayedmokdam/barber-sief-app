export const formatTime = (time: string) => {
    const convertedTime = Number(time);
  if (convertedTime >= 60) {
    return `${Math.floor(convertedTime / 60)} ساعة ${convertedTime % 60} دقيقة`;
  }else if (convertedTime < 60) {
    return `${convertedTime} دقيقة`;
  }else {
    return "الان";
  }
};
