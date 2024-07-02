import { useCallback } from 'react';

import { Box, Button, Image, SimpleGrid, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { RouterPathEnum } from 'app/providers';
import art from 'app/public/img/pages/page-4/art.png';
import { IInfoForm, IPersonForm } from 'app/store/info-form-store';
import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { DefaultButton, ScrollContainer } from 'shared/components';

import { brideDataLabels, groomDataLabels } from './info-form.constants';
import { useStyles } from './styles';

const groomDataForm: IPersonForm = {
  surname: '',
  name: '',
  patronymic: '',
  citizenship: '',
  birthDate: '',
};

const brideDataForm: IPersonForm = {
  surname: '',
  name: '',
  patronymic: '',
  citizenship: '',
  birthDate: '',
};

const dataForm: IInfoForm = {
  registrationPlace: '',
  groom: groomDataForm,
  bride: brideDataForm,
};

export const InfoForm: React.FC = observer(() => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { PagesStore, InfoFormStore } = useStores();

  const form = useForm({
    initialValues: dataForm,
    validateInputOnChange: true,
  });

  const handleSubmit = useCallback(async () => {
    InfoFormStore.setData({
      registrationPlace: form.values.registrationPlace,
      groom: form.values.groom,
      bride: form.values.bride,
    });
    PagesStore.setActivePage(PagesEnum.LOADING);
    navigate(RouterPathEnum.LOADING);
  }, [form]);

  return (
    <ScrollContainer className={classes.scroll}>
      <Box className={classes.root}>
        <Box>
          <Image mt={32} src={art} height={64} width={260} fit="contain" />
        </Box>

        <form className={classes.form}>
          <SimpleGrid cols={1} mt={10} w="100%">
            <Text size="xl" fw={600}>
              Данные жениха:
            </Text>
            {Object.keys(groomDataForm).map((field) => {
              return (
                <TextInput
                  w="100%"
                  size="xl"
                  radius="xl"
                  key={field}
                  placeholder={groomDataLabels[field]}
                  {...form.getInputProps(`groom.${field}`)}
                />
              );
            })}

            <Text size="xl" fw={600}>
              Данные невесты:
            </Text>
            {Object.keys(brideDataForm).map((field) => {
              return (
                <TextInput
                  size="xl"
                  radius="xl"
                  key={field}
                  placeholder={brideDataLabels[field]}
                  {...form.getInputProps(`bride.${field}`)}
                />
              );
            })}
            <Text size="xl" fw={600}>
              Данные свидетельства:
            </Text>
            <TextInput
              size="xl"
              radius="xl"
              key="registrationPlace"
              placeholder="Место регистрации брака (город)"
              {...form.getInputProps('registrationPlace')}
            />
          </SimpleGrid>
          <DefaultButton
            variant="gradient"
            gradient={{ from: '#7DB8A4', to: '#41AE8D', deg: 90 }}
            onClick={handleSubmit}
            mb={30}
            mt={20}
          >
            Создать
          </DefaultButton>
        </form>
      </Box>
    </ScrollContainer>
  );
});
