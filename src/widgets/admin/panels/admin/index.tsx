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
import { numberRegExp, numberRegExpErrorText } from 'shared/utils';

import { useStyles } from './styles';

const defaultAdmins = [
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

export const AdminPanel = observer(() => {
  const { classes } = useStyles();
  const { PagesStore } = useStores();

  const dataForm: IPageData = {
    admins: PagesStore?.data[PagesEnum.ADMIN]?.admins?.length
      ? PagesStore?.data[PagesEnum.ADMIN]?.admins
      : defaultAdmins,
  };

  const form = useForm({
    initialValues: dataForm,
    validateInputOnChange: true,
    validate: zodResolver(validateScheme),
  });

  const handleSubmit = useCallback(async () => {
    const payload: IPageData = {
      admins: form?.values?.admins?.map((item) => ({
        ...item,
        id: item.id,
      })),
    };

    try {
      const { data } = await setPayload(PagesEnum.ADMIN, payload);

      if (data && data.success) {
        PagesStore.setCurrentPageData(PagesEnum.ADMIN, payload);

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
          {dataForm?.admins?.length &&
            dataForm.admins.map((item, index) => (
              <Box key={index}>
                <TextFieldInput
                  placeholder={`Введите id админа ${index + 1}`}
                  fieldName={`admins.${index}.id`}
                  label={`Админ приложения ${index + 1}`}
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

const adminsSchemaZod = z.object({
  id: z.string().regex(numberRegExp, { message: numberRegExpErrorText }),
});

const adminsSchema = z.array(adminsSchemaZod);

const validateScheme = z.object({
  admins: adminsSchema.optional(),
});
