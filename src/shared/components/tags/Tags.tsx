import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ITagsProps } from '../../../props/ITagsProps';

export default function Tags({
  options,
  checkedIds,
  update,
  isDisabled,
  placeholder,
  label,
  width,
  size
}: ITagsProps) {
  const checkedOptions = checkedIds === null ? undefined : checkedIds.map(i => options.find(o => i === o.id)).filter(o => o !== undefined);

  return (
    <Autocomplete
      multiple
      disablePortal
      sx={{ backgroundColor: 'white', width, maxHeight: '48px', overflowY: 'hidden', overflowX: 'visible' }}
      id="tags"
      value={checkedOptions}
      options={options}
      disabled={isDisabled}
      getOptionLabel={(option) => option.label}
      onChange={(_event, values) => update(values.map(v => v.id))}
      renderInput={(params) => (
        <TextField {...params}
          placeholder={placeholder}
          label={label}
          value={checkedOptions?.map(c => c.label) ?? ''}
          size={size}
        />
      )}
    />
  );
}