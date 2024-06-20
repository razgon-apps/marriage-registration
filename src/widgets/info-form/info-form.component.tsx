import { useCallback } from 'react';

import { Button, Input, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { useStores } from 'app/store/use-stores';

interface FormData {
  surname: string;
  name: string;
  patronymic: string;
  citizenship: string;
  birthDate: string;
  birthPlace: string;
  spouseSurname: string;
  spouseName: string;
  spousePatronymic: string;
  spouseCitizenship: string;
  spouseBirthDate: string;
  spouseBirthPlace: string;
  marriageDate: string;
}

interface FormInputProps {
  onChange: (formData: FormData) => void;
}

const dataForm: FormData = {
  surname: '',
  name: '',
  patronymic: '',
  citizenship: '',
  birthDate: '',
  birthPlace: '',
  spouseSurname: '',
  spouseName: '',
  spousePatronymic: '',
  spouseCitizenship: '',
  spouseBirthDate: '',
  spouseBirthPlace: '',
  marriageDate: '',
};

const today = new Date();
const yesterday = new Date(today.getTime());
yesterday.setDate(today.getDate() - 1);

// const validateScheme = z.object({
//   date: z
//     .date({ invalid_type_error: 'Укажите дату гороскопа' })
//     .min(yesterday, { message: 'Дата должна быть текущей или больше' }),
// });

export const InfoForm: React.FC<FormInputProps> = observer(({ onChange }) => {
  const navigate = useNavigate();
  const { PanelStore, InfoFormStore } = useStores();

  const form = useForm({
    initialValues: dataForm,
    validateInputOnChange: true,
  });

  // const clearAllFields = () => {
  //   form.reset();
  //   form.setFieldValue('date', '');
  //   form.setTouched({ date: true });
  //   setDatePickerKey(Math.random());
  // };

  const handleSubmit = useCallback(async () => {
    console.log('form.values', form.values);

    InfoFormStore.setData(form.values);
    PanelStore.setActivePanel('result');
    navigate('/result');
  }, [form]);

  return (
    <form style={{ width: '100%' }}>
      <SimpleGrid cols={2} mt={16} w="100%">
        {Object.keys(dataForm).map((field) => {
          // const value = zodiacRus[zodiac] ? zodiacRus[zodiac] : null;
          return (
            <Input
              key={field}
              placeholder={field}
              {...form.getInputProps(field)}
            />
          );
        })}
      </SimpleGrid>
      <Button
        disabled={!form.isValid()}
        color="button.0"
        onClick={handleSubmit}
        fullWidth
        sx={{ fontWeight: 500 }}
      >
        Далее
      </Button>
    </form>
  );
});
