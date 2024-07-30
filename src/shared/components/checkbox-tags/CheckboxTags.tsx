import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';
import { ICheckBoxesTagsProps } from '../../../props/ICheckBoxesTagsProps';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ options, checkedId, update }: ICheckBoxesTagsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(checkedId);

  function checkboxClickHandler(optionId: string) {
    setSelectedId(optionId);
    update(optionId);
  }

  return (
    <Autocomplete
      id="checkboxes-tags"
      options={options}
      disableCloseOnSelect
      disabled={options.length > 0}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={option.id === selectedId}
              onClick={() => checkboxClickHandler(option.id)}
            />
            {option.title}
          </li>
        );
      }}

      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label="Event" placeholder="Event" />
      )}
    />
  );
}