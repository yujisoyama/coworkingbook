import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { teal, yellow } from '@mui/material/colors';
import { Circle } from 'phosphor-react';


export const BookingTab = () => {
    const date = new Date();
    const minDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    date.setDate(date.getDate() + 14)
    const maxDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    return (
        <div className="mt-[3%] w-full min-h-[500px] bg-backgroundLight rounded-xl flex flex-col text-paragraph font-semibold text-lg px-9 py-5">
            <div className='flex flex-row justify-start items-center gap-6'>
                <div>
                    <label htmlFor="date" className="mr-3">Select a date:</label>
                    <input type="date" name="date" id="date" min={minDate} max={maxDate} className="border-none outline-none bg-highlight py-2 px-4 rounded-full text-background font-normal text-base" />
                </div>
                <div className='ml-10'>
                    Select a period:
                </div>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="fullday"
                        className='gap-5'
                    >
                        <FormControlLabel value="fullday" control={<Radio sx={{ color: teal[100], '&.Mui-checked': { color: yellow[800], }, }} />} label="Full Day" />
                        <FormControlLabel value="morning" control={<Radio sx={{ color: teal[100], '&.Mui-checked': { color: yellow[800], }, }} />} label="Morning" />
                        <FormControlLabel value="afternoon" control={<Radio sx={{ color: teal[100], '&.Mui-checked': { color: yellow[800], }, }} />} label="Afternoon" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className='flex flex-row gap-4'>
                <div>
                    <div className="w-1/2 h-3/4 min-w-[700px] min-h-[350px] mt-5 border-background border-2 rounded-xl">

                    </div>
                    <div className='flex flex-row mt-4 gap-1 items-center justify-end text-sm mr-5'>
                        <Circle className='ml-8' size={16} color="#e8e4e6" weight="fill" />
                        <p>Available</p>
                        <Circle className='ml-8' size={16} color="#e16162" weight="fill" />
                        <p>Not Available</p>
                        <Circle className='ml-8' size={16} color="#f9bc60" weight="fill" />
                        <p>Selected</p>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>

        </div>
    )
}
