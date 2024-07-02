import { useCallback } from 'react';

import { Box, Button, SimpleGrid, Space } from '@mantine/core';
import { FormErrors, useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { observer } from 'mobx-react-lite';
import { z } from 'zod';

import { setPayload } from 'app/api';
import { IPageData, PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { ScrollContainer } from 'shared/components';
import { TextFieldInput } from 'shared/components/fields';
import {
  getValidateErrors,
  numberRegExp,
  numberRegExpErrorText,
} from 'shared/utils';

import { useStyles } from './styles';

const defaultGroups = [
  {
    id: '',
    name: '',
    imgUrl: '',
  },
  {
    id: '',
    name: '',
    imgUrl: '',
  },
  {
    id: '',
    name: '',
    imgUrl: '',
  },
  {
    id: '',
    name: '',
    imgUrl: '',
  },
  {
    id: '',
    name: '',
    imgUrl: '',
  },
];

export const NearlyReadyPanel = observer(() => {
  const { classes } = useStyles();
  const { PagesStore } = useStores();

  const dataForm: IPageData = {
    group1: {
      id: PagesStore?.data[PagesEnum.NEARLY_READY]?.group1?.id ?? '',
      isSubscriptionToMessages: false,
    },
    group2: {
      id: PagesStore?.data[PagesEnum.NEARLY_READY]?.group2?.id ?? '',
      isSubscriptionToMessages: true,
    },
    groups: PagesStore?.data[PagesEnum.NEARLY_READY]?.groups?.length
      ? PagesStore?.data[PagesEnum.NEARLY_READY]?.groups
      : defaultGroups,
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
      groups: form?.values?.groups?.map((group) => ({
        ...group,
        id: group.id,
      })),
    };

    try {
      const { data } = await setPayload(PagesEnum.NEARLY_READY, payload);

      if (data && data.success) {
        PagesStore.setCurrentPageData(PagesEnum.NEARLY_READY, payload);

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
    <ScrollContainer className={classes.scroll}>
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

          <Space h="md" />

          {dataForm?.groups?.length &&
            dataForm.groups.map((item, index) => (
              <Box key={index}>
                <TextFieldInput
                  placeholder={`Введите id группы ${index + 1}`}
                  fieldName={`groups.${index}.id`}
                  label={`Подписка на группу ${index + 1}`}
                  form={form}
                  clearable
                />
                <TextFieldInput
                  placeholder={`Введите название группы ${index + 1}`}
                  fieldName={`groups.${index}.name`}
                  label={`Название группы ${index + 1}`}
                  form={form}
                  clearable
                />
                <TextFieldInput
                  placeholder={`Введите URL изображения группы ${index + 1}`}
                  fieldName={`groups.${index}.imgUrl`}
                  label={`URL изображения группы ${index + 1}`}
                  form={form}
                  clearable
                />
              </Box>
            ))}
        </SimpleGrid>

        <Space h="md" />

        <Button onClick={handleSubmit} fullWidth sx={{ fontWeight: 500 }}>
          Сохранить
        </Button>
      </form>
    </ScrollContainer>
  );
});

const groupSchema = z.object({
  id: z.string().regex(numberRegExp, { message: numberRegExpErrorText }),
  name: z.string().optional(),
  imgUrl: z.string().optional(),
});

const groupsSchema = z.array(groupSchema);

const validateScheme = z.object({
  group1: z.object({
    id: z.string().regex(numberRegExp, { message: numberRegExpErrorText }),
    isSubscriptionToMessages: z.boolean(),
  }),
  group2: z.object({
    id: z.string().regex(numberRegExp, { message: numberRegExpErrorText }),
    isSubscriptionToMessages: z.boolean(),
  }),
  groups: groupsSchema.optional(),
});
