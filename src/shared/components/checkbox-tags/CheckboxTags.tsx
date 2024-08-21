import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ICheckBoxesTagsProps } from '../../../props/ICheckBoxesTagsProps';

export default function CheckboxesTags({ options, checkedId, update, isDisabled, placeholder, label, width, size }: ICheckBoxesTagsProps) {
  const checkedOption = checkedId === null ? undefined : options.find(o => o.id === checkedId);

  return (
    <Autocomplete
      sx={{ backgroundColor: 'white', width }}
      disablePortal
      id="checkboxes-tags"
      value={checkedOption ?? null}
      options={options}
      disabled={isDisabled}
      getOptionLabel={(option) => option.label}
      onChange={(_event, value) => update(value?.id ?? null)}
      // isOptionEqualToValue={(option, value) => option.id === value?.id}
      renderInput={(params) => (
        <TextField {...params}
          placeholder={placeholder}
          label={label}
          value={checkedOption?.label ?? ''}
          size={size}
        />
      )}
    />
  );
}