import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ICheckBoxesTagsProps } from '../../../props/ICheckBoxesTagsProps';
import { useMemo } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ options, checkedId, update }: ICheckBoxesTagsProps) {
  const checkedOption = useMemo(() => options.find(o => o.id === checkedId), [options, checkedId]);
  // console.log({ checkedIdProp: checkedId, checkedOption })

  return (
    <Autocomplete
      id="checkboxes-tags"
      value={checkedOption}
      options={options}
      disableCloseOnSelect
      limitTags={1}
      disabled={options.length <= 0}
      getOptionLabel={(option) => option.title}
      renderOption={(_, option) => {
        return (
          <li key={option.id}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={option.id === checkedId}
              onChange={() => update(option.id, checkedId)}
            />
            {option.title}
          </li>
        );
      }}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Event" value={checkedOption?.title} style={{ height: 60 }} />
      )}
    />
  );
}