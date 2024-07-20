import c from './CustomDropDown.module.scss';
import { useState, useEffect, useRef } from 'react';
import { statusTexts, VideoStatusEnum } from '../../../enums/video-status';
import { IDropDownProps } from '../../../props/IDropDownProps';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CustomDropdown({ buttonText, options, update }: IDropDownProps) {
  const entries: [string, string][] = Object.entries(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const toggleRef = useRef(null);

  function handleStatusChange(key: string) {
    console.log(key)
    const numberKey = Number(key);
    setSelectedStatus(statusTexts[numberKey]);
    update(numberKey);
    setIsOpen(false);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     console.log('mouse-down')
  //     if (toggleRef.current) {// && !toggleRef.current[event.target]) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
    <div ref={toggleRef}>
      <button className={c.button} onClick={() => setIsOpen(!isOpen)}>
        <span className={c.buttonText}>{selectedStatus || buttonText}</span>
        {isOpen ?
          <KeyboardArrowDownIcon /> :
          <KeyboardArrowRightIcon />
        }

      </button>

      {isOpen && (
        <div className={c.popup}>
          {entries.map(([key, value]) => (
            <div key={key} className={c.option}
              onClick={() => handleStatusChange(key)}>
              {value}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}