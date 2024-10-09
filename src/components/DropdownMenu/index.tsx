import { ReactNode, useState } from 'react';
import Link, { LinkProps } from 'next/link';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import styles from './DropdownMenu.module.scss';
import { UnknownFuntionType } from '@/types/functions';

interface MenuItem {
  href?: string | undefined;
  onClick?: UnknownFuntionType<any> | undefined;
  text: string;
  icon?: ReactNode;
}

interface DropdownMenuProps {
  triggerButtonText: string | ReactNode;
  triggerButtonTextColor?: string;
  ariaLabel?: string;
  menuItems: (MenuItem & Omit<LinkProps, 'href'>)[];
}

export default function DropdownMenu({
  triggerButtonText,
  triggerButtonTextColor = 'inherit',
  ariaLabel,
  menuItems,
}: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        sx={{ color: triggerButtonTextColor }}
        aria-describedby={id}
        onClick={handleClick}
        aria-label={ariaLabel}
      >
        {triggerButtonText}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList className={styles.menu} dense>
          {menuItems.map(({ text, href = '', onClick, icon }) => (
            <MenuItem key={text}>
              <Link className={styles.link} href={href} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                {text}
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}
