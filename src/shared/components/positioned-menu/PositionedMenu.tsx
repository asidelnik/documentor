import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { IPositionedMenuProps } from '../../../types/IPositionedMenuProps';
import { IconButton } from '@mui/material';

export default function PositionedMenu({ options, videoStatus, isDisabled, select, children }: IPositionedMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectItem = (id: number) => {
    setAnchorEl(null);
    select(id)
  }

  return (
    <div>
      <IconButton
        id="positioned-button"
        aria-controls={open ? 'positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disabled={isDisabled}
        onClick={handleClick}
      >
        {children}
      </IconButton>

      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {options.map(option => {
          return (
            <MenuItem
              key={option.id}
              selected={option.id === videoStatus}
              onClick={() => selectItem(option.id)}>
              {option.label}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  );
}
