import { useCallback } from 'react';

import { Button, SimpleGrid } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { observer } from 'mobx-react-lite';
import { z } from 'zod';

import { setPayload } from 'app/api';
import { IPageData, PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { CheckboxField, TextFieldInput } from 'shared/components/fields';

import { useStyles } from './styles';

export const AllowAccessPanel = observer(() => {
  const { classes } = useStyles();
  const { PagesStore } = useStores();

  const dataForm: IPageData = {
    sharingText: PagesStore?.data[PagesEnum.ALLOW_ACCESS]?.sharingText ?? '',
    checkedAccessPhotoInAlbum:
      PagesStore?.data[PagesEnum.ALLOW_ACCESS]?.checkedAccessPhotoInAlbum ??
      false,
    checkedAccessHaveFun:
      PagesStore?.data[PagesEnum.ALLOW_ACCESS]?.checkedAccessHaveFun ?? false,
  };

  const form = useForm({
    initialValues: dataForm,
    validateInputOnChange: true,
    validate: zodResolver(validateScheme),
  });

  const handleSubmit = useCallback(async () => {
    const payload: IPageData = {
      sharingText: form.values.sharingText,
      checkedAccessPhotoInAlbum: form.values.checkedAccessPhotoInAlbum,
      checkedAccessHaveFun: form.values.checkedAccessHaveFun,
    };

    try {
      const { data } = await setPayload(PagesEnum.ALLOW_ACCESS, payload);

      if (data && data.success) {
        PagesStore.setCurrentPageData(PagesEnum.ALLOW_ACCESS, payload);

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
          placeholder="Введите текст"
          fieldName="sharingText"
          label="Текст для постинга в альбоме"
          form={form}
          clearable
        />

        <CheckboxField
          label="Пост фото в альбом"
          fieldName="checkedAccessPhotoInAlbum"
          form={form}
          checked={form.values.checkedAccessPhotoInAlbum}
        />

        <CheckboxField
          label="Ознакомлен"
          fieldName="checkedAccessHaveFun"
          checked={form.values.checkedAccessHaveFun}
          form={form}
        />
      </SimpleGrid>

      <Button onClick={handleSubmit} fullWidth sx={{ fontWeight: 500 }}>
        Сохранить
      </Button>
    </form>
  );
});

const validateScheme = z.object({
  sharingText: z.string().nullable(),
  checkedAccessPhotoInAlbum: z.boolean().nullable(),
  checkedAccessHaveFun: z.boolean().nullable(),
});
