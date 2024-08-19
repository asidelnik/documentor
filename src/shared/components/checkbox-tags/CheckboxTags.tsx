import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ICheckBoxesTagsProps } from '../../../props/ICheckBoxesTagsProps';

export default function CheckboxesTags({ options, checkedId, update, isDisabled, placeholder }: ICheckBoxesTagsProps) {
  const checkedOption = checkedId === null ? undefined : options.find(o => o.id === checkedId);

  return (
    <Autocomplete
      disablePortal
      id="checkboxes-tags"
      value={checkedOption ?? null}
      options={options}
      style={{ width: "100%" }}
      disabled={isDisabled}
      getOptionLabel={(option) => option.label}
      onChange={(_event, value) => update(value?.id ?? null)}
      // isOptionEqualToValue={(option, value) => option.id === value?.id}
      renderInput={(params) => (
        <TextField {...params}
          placeholder={placeholder}
          value={checkedOption?.label ?? ''}
          style={{ height: 60 }} />
      )}
    />
  );
}