import c from './LocationFilter.module.scss';
import { Button, IconButton, Input, Slider, TextField, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';

export interface ILocationFilterProps {
  isShowMap: boolean;
  lat?: number;
  long?: number;
  radius?: number;
  setIsShowMap: (value: boolean) => void;
  deleteCenterHandler: () => void;
  radiusSliderChange: (event: Event, value: number | number[]) => void;
  radiusInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LocationFilter({
  isShowMap,
  lat,
  long,
  radius,
  setIsShowMap,
  deleteCenterHandler,
  radiusSliderChange,
  radiusInputChange
}: ILocationFilterProps) {
  const [isShowLocationFields, setIsShowLocationFields] = useState<boolean>(false);

  useEffect(() => {
    if (lat && long) {
      setIsShowLocationFields(true);
    } else {
      setIsShowLocationFields(false);
    }
  }, [lat, long]);

  return (
    <>
      <div className={c.main}>
        <div className={c.buttons}>
          <Button
            onClick={() => setIsShowMap(!isShowMap)}
            className={c.showMapButton}
            variant='outlined'>
            {isShowMap ?
              (<>Close map <CloseIcon sx={{ marginLeft: '6px' }} /></>) :
              (<>Choose location<MapOutlinedIcon sx={{ marginLeft: '6px' }} /></>)}
          </Button>

          <div className={c.right}>
            {isShowLocationFields &&
              <IconButton
                onClick={deleteCenterHandler}
                aria-label="Delete location filters"
                color="warning"
                title="Delete location filters"
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            }

            {(isShowMap || isShowLocationFields) &&
              <Tooltip
                title="Click the map to set a center marker. Drag the map to move."
                arrow
                placement="top"
              >
                <InfoOutlinedIcon style={{ color: 'hsl(0, 0%, 26%)' }} />
              </Tooltip>
            }
          </div>
        </div>


        {isShowLocationFields &&
          <>
            <div>
              <TextField
                id="latitude"
                label="Latitude"
                type="text"
                variant="outlined"
              value={lat || 0}
                sx={{ width: "320px" }}
                InputLabelProps={{ shrink: true }}
                disabled={true}
              />
            </div>

            <div>
              <TextField
                id="longitude"
                label="Longitude"
                type="text"
                variant="outlined"
              value={long || 0}
                sx={{ width: "320px" }}
                InputLabelProps={{ shrink: true }}
                disabled={true}
              />
            </div>

            <label className={c.label}>Radius (m)</label>
            <div className={c.radiusFields}>
              <Slider
              value={radius || 0}
                onChange={radiusSliderChange}
                disabled={!isShowMap}
                aria-label="Radius slider"
                defaultValue={500}
                getAriaValueText={(value) => `${value} m`}
                valueLabelDisplay="auto"
                step={null}
                min={100}
                max={100000}
                marks={[
                  { value: 100 },
                  { value: 500 },
                  { value: 1000 },
                  { value: 2500 },
                  { value: 5000 },
                  { value: 7500 },
                  { value: 10000 },
                  { value: 25000 },
                  { value: 50000 },
                  { value: 100000 },
                ]}
                sx={{ width: "70%" }}
              />
              <Input
              value={radius || 0}
                size="small"
                onChange={radiusInputChange}
                disabled={!isShowMap}
                sx={{ width: "30%" }}
                inputProps={{
                  step: 50,
                  min: 100,
                  max: 200000,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </div>
          </>
        }
      </div>
    </>
  )
}