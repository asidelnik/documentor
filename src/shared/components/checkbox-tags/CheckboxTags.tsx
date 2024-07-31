import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';
import { ICheckBoxesTagsProps } from '../../../props/ICheckBoxesTagsProps';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ options, checkedIdProp, update }: ICheckBoxesTagsProps) {
  const [checkedId, setCheckedId] = useState<string | null>(checkedIdProp);
  const checkedOption = options.find(o => o.id === checkedId);
  // console.log(options);

  function checkboxClickHandler(optionId: string) {
    // console.log(optionId)
    setCheckedId(optionId);
    update(optionId);
  }

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
              onChange={() => checkboxClickHandler(option.id)}
            />
            {option.title}
          </li>
        );
      }}

      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label="Event" placeholder="Event" value={checkedOption?.title} />
      )}
    />
  );
}