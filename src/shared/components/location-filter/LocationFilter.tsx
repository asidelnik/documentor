import c from './LocationFilter.module.scss';
import { Button, IconButton, Input, Slider, TextField, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export interface ILocationFilterProps {
  isShowMap: boolean;
  lat?: number;
  long?: number;
  radius?: number;
  setIsShowMap: (value: boolean) => void;
  deleteCenterHandler: () => void;
  radiusSliderChange: (event: Event, value: number | number[]) => void;
  radiusInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  isVertical?: boolean;
}

export default function LocationFilter({
  isShowMap,
  lat,
  long,
  radius,
  setIsShowMap,
  deleteCenterHandler,
  radiusSliderChange,
  radiusInputChange,
  buttonText,
  isVertical
}: ILocationFilterProps) {
  const isShowFilterControls = lat !== undefined && long !== undefined;
  const isShowHorizontalValueIcon = !isVertical && lat && long;
  const toolTipTitle = "Click the map to set a center marker. Update the radius.";

  return (
    <>
      <div className={isVertical ? c.container : c.containerHorizontal}>
        <div className={c.buttonsContainer}>
          <div className={c.left}>
            <Tooltip
              title={toolTipTitle}
              arrow
              placement="top"
              disableHoverListener={isVertical}
              enterDelay={850}
            >
              <Button
                onClick={() => setIsShowMap(!isShowMap)}
                className={c.showMapButton}
                variant='outlined'>
                {isShowMap ?
                  (<>Close map <CloseIcon sx={{ marginLeft: '6px' }} /></>) :
                  (<>{buttonText}<MapOutlinedIcon sx={{ marginLeft: '6px' }} /></>)}
              </Button>
            </Tooltip>

            {(isVertical && isShowMap) &&
              <Tooltip
                title={toolTipTitle}
                arrow
                placement="top"
              >
                <InfoOutlinedIcon style={{ color: 'hsl(0, 0%, 26%)' }} />
              </Tooltip>
            }
          </div>

          {(isShowFilterControls || isShowHorizontalValueIcon) &&
            <div className={c.right}>
              {isShowHorizontalValueIcon && (
                <Tooltip
                  title='Location filter selected'
                  arrow
                  placement="top"
                  disableHoverListener={isVertical}
                  enterDelay={500}
                >
                  <TaskAltIcon sx={{ fill: 'green' }} />
                </Tooltip>
              )}

              {isShowFilterControls &&
                <IconButton
                  onClick={deleteCenterHandler}
                  aria-label="Delete location filters"
                  color="warning"
                  title="Delete location filters"
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              }
            </div>
          }
        </div>

        {((isVertical && isShowFilterControls) || (!isVertical && isShowFilterControls && isShowMap)) &&
          <div className={c.inputsContainer}>
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
          </div>
        }
      </div>
    </>
  )
}