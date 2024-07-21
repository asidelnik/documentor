import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { IMultipleSelectCheckmarksProps } from '../../../props/IDropDownProps';
import { ISelectOption } from '../../../types/ISelectOption';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ buttonText, options, defaultOptions, updateSelectedOptions }: IMultipleSelectCheckmarksProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>(defaultOptions);
  const selectedLabels: string[] = selectedIds.length > 0 && options.length > 0 ?
    selectedIds.map((selected) => options.find(option => option.id === selected)?.label!).filter(Boolean) : [];

  function onChangeHandler(event: SelectChangeEvent<number[]>) {
    const { target: { value: newSelectedIds } } = event;
    console.log(newSelectedIds);

    if (Array.isArray(newSelectedIds)) {
      setSelectedIds(newSelectedIds);
      updateSelectedOptions(newSelectedIds);
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{buttonText}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedIds}
          onChange={onChangeHandler}
          input={<OutlinedInput label="Tag" />}
          renderValue={(_selected) => selectedLabels.join(', ')}
          MenuProps={MenuProps}
          defaultValue={defaultOptions}
        >
          {options.map((option: ISelectOption) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox checked={selectedIds.indexOf(option.id) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div >
  );
}
