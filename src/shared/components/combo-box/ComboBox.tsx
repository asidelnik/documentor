import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IComboBoxProps } from '../../../props/IComboBoxProps';

export default function ComboBox({ options, checkedId, update, isDisabled, placeholder, label, width, size }: IComboBoxProps) {
  const checkedOption = checkedId === null ? undefined : options.find(o => o.id === checkedId);

  return (
    <Autocomplete
      id="combo-box"
      options={options}
      value={checkedOption ?? null}
      getOptionLabel={(option) => option.label}
      onChange={(_event, value) => update(value?.id ?? null)}
      disablePortal
      sx={{ backgroundColor: 'white', width }}
      disabled={isDisabled}
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