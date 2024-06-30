import React, { useEffect, useState } from 'react';

import { Text } from '@mantine/core';

import { useStyles } from './styles';

interface CountdownProps {
  initialValue: number;
  onTimerEnd: () => void;
}

export const CountdownTimer: React.FC<CountdownProps> = ({
  initialValue,
  onTimerEnd,
}) => {
  const { classes } = useStyles();
  const [timeLeft, setTimeLeft] = useState(initialValue);

  // Функция для форматирования времени в формат "мм:сс"
  const formatTime = (time: number): string => {
    const minutes = Math.max(Math.floor(time / 60), 0);
    const seconds = Math.max(time % 60, 0);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Запускаем таймер при монтировании компонента
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          onTimerEnd(); // Вызываем функцию, переданную через props, при завершении таймера
        }
        return Math.max(newTime, 0); // Возвращаем новое значение времени, но не меньше 0
      });
    }, 1000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [onTimerEnd, setTimeLeft]);

  return (
    <Text
      variant="gradient"
      gradient={{ from: '#7DB8A4', to: '#41AE8D', deg: 90 }}
      className={classes.text}
    >
      {formatTime(timeLeft)}
    </Text>
  );
};
