import { FC, useState } from 'react';

import { Avatar, Box, Button, Text } from '@mantine/core';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { addGroup } from 'shared/utils';

import { useStyles } from './styles';

interface IGroupItem {
  imgUrl: string;
  name: string;
  groupId: number;
  className?: string;
  onSubscriptionChange?: () => void;
}

export const GroupItem: FC<IGroupItem> = observer(
  ({ imgUrl, name, groupId, className, onSubscriptionChange }) => {
    const { classes } = useStyles();
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async () => {
      try {
        const result = await addGroup(groupId);

        if (result) {
          setSubscribed(true);
          if (onSubscriptionChange) {
            onSubscriptionChange();
          }
        } else {
          console.log('Ошибка при подписке');
        }
      } catch (error) {
        console.error('Error subscribing:', error);
      }
    };

    return (
      <Box className={cn(classes.root, className)}>
        <Box className={cn(classes.container)}>
          <Avatar src={imgUrl} alt="img" />
          <Text size="l" ml={21} fw={500}>
            {name}
          </Text>
        </Box>

        <Button
          onClick={handleSubscribe}
          variant="gradient"
          gradient={{ from: '#7DB8A4', to: '#41AE8D', deg: 90 }}
          sx={{ fontWeight: 600 }}
          radius={93}
          h={35}
          w={140}
          fz={16}
          disabled={subscribed}
        >
          Подписаться
        </Button>
      </Box>
    );
  },
);
