import { useCallback } from 'react';

import { Button, SimpleGrid } from '@mantine/core';
import { FormErrors, useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { z } from 'zod';

import { setPayload } from 'app/api';
import { IPageData, PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { TextFieldInput } from 'shared/components/fields';
import {
  getValidateErrors,
  numberRegExp,
  numberRegExpErrorText,
} from 'shared/utils';

import { useStyles } from './styles';

export const CreatePanel = observer(() => {
  const { classes } = useStyles();
  const { PagesStore } = useStores();

  const dataForm: IPageData = {
    group1: {
      id: PagesStore?.data[PagesEnum.CREATE]?.group1?.id ?? '',
      isSubscriptionToMessages: false,
    },
    group2: {
      id: PagesStore?.data[PagesEnum.CREATE]?.group2?.id ?? '',
      isSubscriptionToMessages: true,
    },
  };

  const form = useForm({
    initialValues: dataForm,
    validateInputOnChange: true,
    validate: zodResolver(validateScheme),
  });

  const handleSubmit = useCallback(async () => {
    const payload: IPageData = {
      group1: {
        id: form.values.group1.id,
        isSubscriptionToMessages: false,
      },
      group2: {
        id: form.values.group2.id,
        isSubscriptionToMessages: true,
      },
    };

    try {
      const { data } = await setPayload(PagesEnum.CREATE, payload);

      if (data && data.success) {
        PagesStore.setCurrentPageData(PagesEnum.CREATE, payload);

        showNotification({
          title: 'Ссылки обновлены!',
          message: '',
          autoClose: 10_000,
          color: data.success ? 'green' : 'red',
        });
      }
    } catch (e) {
      showNotification({
        title: 'Ошибка!',
        message: '',
        autoClose: 2_000,
        color: 'red',
      });
    }
  }, [form]);

  return (
    <form className={classes.container}>
      <SimpleGrid cols={1} w="100%">
        <TextFieldInput
          placeholder="Введите id группы"
          fieldName="group1.id"
          label="Подписка на группу"
          form={form}
          clearable
        />

        <TextFieldInput
          placeholder="Введите id группы"
          fieldName="group2.id"
          label="Подписка на рассылку"
          form={form}
          clearable
        />
      </SimpleGrid>

      <Button onClick={handleSubmit} fullWidth sx={{ fontWeight: 500 }}>
        Сохранить
      </Button>
    </form>
  );
});

const validateScheme = z.object({
  group1: z.object({
    id: z
      .string()
      .regex(numberRegExp, { message: numberRegExpErrorText })
      .nullable(),
    isSubscriptionToMessages: z.boolean(),
  }),
  group2: z.object({
    id: z
      .string()
      .regex(numberRegExp, { message: numberRegExpErrorText })
      .nullable(),
    isSubscriptionToMessages: z.boolean(),
  }),
});
