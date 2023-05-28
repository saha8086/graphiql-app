import { FC, useId, useCallback } from 'react';
import {
  Table,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  IconButton,
  Input,
  Checkbox,
} from '@chakra-ui/react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { VscTrash, VscAdd } from 'react-icons/vsc';

import { Datalist } from '@components/Datalist/Datalist';
import { HEADERS, HEADER_MAX_LENGTH } from '@consts/headers';
import { isValidHeaderEntry, validateHeaders } from '@utils/fetch';
import { useBreakpointValue } from '@hooks/responsive';

interface FormValues {
  headers: {
    checked: boolean;
    name: string;
    value: string;
  }[];
}

export interface HeadersEditorProps {
  onSubmit: (headers: Headers) => void;
}

export const HeadersEditor: FC<HeadersEditorProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const headersDatalistId = useId();

  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      headers: [],
    },
    mode: 'onChange',
    shouldUseNativeValidation: true,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'headers',
    control,
    rules: {
      maxLength: HEADER_MAX_LENGTH,
      validate: {
        headers: (headers) =>
          headers
            .filter(({ checked }) => checked)
            .every(({ name, value }) => isValidHeaderEntry([name, value])),
      },
    },
  });

  const submitHandler: SubmitHandler<FormValues> = useCallback(
    ({ headers }) => {
      onSubmit(
        new Headers(
          validateHeaders(
            headers.filter(({ checked }) => checked).map(({ name, value }) => [name, value])
          )
        )
      );
    },
    [onSubmit]
  );

  const TdPaddingInline = useBreakpointValue({
    lg: 4,
    md: 2,
    base: 1,
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <TableContainer>
        <Datalist id={headersDatalistId} options={HEADERS} />
        <Table size="sm">
          <Tbody>
            {fields.map((field, index) => (
              <Tr key={field.id}>
                <Td paddingInline={TdPaddingInline}>
                  <Checkbox {...register(`headers.${index}.checked`)} />
                </Td>
                <Td paddingInline={TdPaddingInline}>
                  <Input
                    {...register(`headers.${index}.name`)}
                    placeholder={t('headers.name')}
                    list={headersDatalistId}
                  />
                </Td>
                <Td paddingInline={TdPaddingInline}>
                  <Input {...register(`headers.${index}.value`)} placeholder={t('headers.value')} />
                </Td>
                <Td paddingInline={TdPaddingInline}>
                  <IconButton
                    aria-label="Delete"
                    icon={<VscTrash />}
                    onClick={() => remove(index)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th colSpan={4}>
                <Button
                  leftIcon={<VscAdd />}
                  onClick={() =>
                    append({
                      checked: false,
                      name: '',
                      value: '',
                    })
                  }
                >
                  {t('headers.add')}
                </Button>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </form>
  );
};
