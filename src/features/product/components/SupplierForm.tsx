import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Supplier, SupplierRequest } from '../types';

type Props = {
  type?: 'create' | 'update';
  supplier?: Supplier;
};

export const SupplierForm: React.FC<Props> = ({ type = 'create', supplier }) => {
  const form = useForm<SupplierRequest>({
    initialValues: {
      name: supplier?.name ?? '',
    },
  });

  function handleCreate() {}

  function handleUpdate() {}

  function handleDelete() {}

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        label="Nama Supplier"
        placeholder="Masukan nama supplier"
        className="mb-2"
      />
      <div className="flex items-center justify-end space-x-2 mt-4">
        {type == 'create' ? (
          <Button onClick={handleCreate}>Tambah</Button>
        ) : (
          <>
            <Button color="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleUpdate}>Edit</Button>
          </>
        )}
      </div>
    </>
  );
};
