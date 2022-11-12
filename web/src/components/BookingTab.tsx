import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { teal, yellow } from '@mui/material/colors';
import { Circle } from 'phosphor-react';
import { Desks } from './Desks';
import { FormEvent, useEffect, useState } from 'react';
import { MeetingRooms } from './MeetingRooms';
import { useUser } from '../context/UserContext';
import { api } from '../Api';
import { ThreeDots } from 'react-loader-spinner';

export interface IStatus {
    id: number;
    available: boolean;
    selected: boolean;
}

export interface IBook {
    type: string;
    book_number: number;
    booking_day: string;
    period: number;
    user: number;
}

const Default_Desks: IStatus[] = [
    { id: 1, available: false, selected: false },
    { id: 2, available: true, selected: false },
    { id: 3, available: true, selected: false },
    { id: 4, available: false, selected: false },
    { id: 5, available: true, selected: false },
    { id: 6, available: true, selected: false },
    { id: 7, available: true, selected: false },
    { id: 8, available: false, selected: false },
    { id: 9, available: true, selected: false },
    { id: 10, available: true, selected: false }
]

const Default_Rooms: IStatus[] = [
    { id: 1, available: true, selected: false },
    { id: 2, available: true, selected: false },
    { id: 3, available: false, selected: false },
]

export const BookingTab = () => {
    const date = new Date();
    const minDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    date.setDate(date.getDate() + 14);
    const maxDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const { user } = useUser();
    const [desks, setDesks] = useState<IStatus[]>(Default_Desks);
    const [rooms, setRooms] = useState<IStatus[]>(Default_Rooms);
    const [book, setBook] = useState<IBook>({ type: '', book_number: 0, booking_day: minDate, period: 3, user: user.id });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [bookSuccess, setBookSuccess] = useState<boolean>(false);
    const [bookFail, setBookFail] = useState<boolean>(false);


    const selectDesk = (id: number) => {
        if (desks[id - 1].available) {
            setDesks(desks.map(desk =>
                desk.id === id
                    ? { ...desk, selected: true }
                    : { ...desk, selected: false }
            ));
            setRooms(rooms.map(room =>
                room.selected
                    ? { ...room, selected: false }
                    : { ...room }
            ));
            setBook({ ...book, type: 'desk', book_number: id });
        }
    }

    const selectRoom = (id: number) => {
        if (rooms[id - 1].available) {
            setRooms(rooms.map(room =>
                room.id === id
                    ? { ...room, selected: true }
                    : { ...room, selected: false }
            ));
            setDesks(desks.map(desk =>
                desk.selected
                    ? { ...desk, selected: false }
                    : { ...desk }
            ));
            setBook({ ...book, type: 'room', book_number: id });
        }
    }

    const selectDate = (event: FormEvent<HTMLInputElement>) => {
        setBook({ ...book, booking_day: event.currentTarget.value });
        event.preventDefault();
    }

    const selectPeriod = (event: FormEvent<HTMLInputElement>) => {
        setBook({ ...book, period: Number(event.currentTarget.value) })
    }

    const renderDeskOrRoom = (type: string) => {
        switch (type) {
            case '':
                return <p>Select a Desk or Meeting room.</p>
            case 'desk':
                return <p>Desk number: <span className='text-highlight'>{book.book_number}</span></p>
            case 'room':
                return <p>Meeting room number: <span className='text-highlight'>{book.book_number}</span></p>
        }
    }

    const renderPeriod = (period_type: number) => {
        switch (period_type) {
            case 1:
                return <p>Period: <span className='text-highlight'>Morning</span></p>
            case 2:
                return <p>Period: <span className='text-highlight'>Afternoon</span></p>
            case 3:
                return <p>Period: <span className='text-highlight'>Full Day</span></p>
        }
    }

    const handleBook = () => {
        setBookSuccess(false);
        setBookFail(false);
        setIsSubmitting(true)
        let timer = setTimeout(async () => {
            try {
                await api.post('/book', book).then(res => {
                    clearTimeout(timer);
                    setIsSubmitting(false);
                    setBookSuccess(true);
                    setBookFail(false);
                })
            } catch (error) {
                console.log(error);
                clearTimeout(timer);
                setIsSubmitting(false);
                setBookSuccess(false);
                setBookFail(true);
            }
        }, 1000);
    }

    return (
        <div className="mt-[3%] w-full min-h-[500px] bg-backgroundLight rounded-xl flex flex-col text-paragraph font-semibold text-lg px-9 py-5">
            <div className='flex flex-row justify-start items-center gap-6'>
                <div>
                    <label htmlFor="date" className="mr-3">Select a date:</label>
                    <input onChange={selectDate} type="date" name="date" id="date" min={minDate} max={maxDate} defaultValue={minDate} className="border-none outline-none bg-highlight py-2 px-4 rounded-lg text-background font-normal text-base" />
                </div>
                <div className='ml-10'>
                    Select a period:
                </div>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={3}
                        className='gap-5'
                        onChange={selectPeriod}
                    >
                        <FormControlLabel value={3} control={<Radio sx={{ color: teal[100], '&.Mui-checked': { color: yellow[800], }, }} />} label="Full Day" />
                        <FormControlLabel value={1} control={<Radio sx={{ color: teal[100], '&.Mui-checked': { color: yellow[800], }, }} />} label="Morning" />
                        <FormControlLabel value={2} control={<Radio sx={{ color: teal[100], '&.Mui-checked': { color: yellow[800], }, }} />} label="Afternoon" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className='flex flex-row gap-8 mt-5'>
                <div className='w-2/3'>
                    <div className="h-[80%] min-w-[700px] min-h-[350px] border-background border-2 rounded-xl">
                        <div className='h-2/3 grid grid-cols-5 gap-4 justify-items-center items-center'>
                            {desks.map(desk => [
                                <div key={desk.id} onClick={() => selectDesk(desk.id)}>
                                    <Desks id={desk.id} available={desk.available} selected={desk.selected} />
                                </div>
                            ])}
                        </div>
                        <div className='h-1/3 grid grid-cols-3 justify-items-center items-center'>
                            {rooms.map(room => [
                                <div key={room.id} onClick={() => selectRoom(room.id)}>
                                    <MeetingRooms id={room.id} available={room.available} selected={room.selected} />
                                </div>
                            ])}
                        </div>
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
                <div className='w-1/3 mt-6 flex flex-col'>
                    <div>
                        Booking info:
                        <hr />
                        <div className='mt-4 flex flex-col gap-2 text-base'>
                            {renderDeskOrRoom(book.type)}
                            <p>Date: <span className='text-highlight'>{book.booking_day}</span></p>
                            {renderPeriod(book.period)}
                        </div>
                    </div>
                    <div className='mt-10 self-center'>
                        <button onClick={handleBook} disabled={book.book_number === 0 || isSubmitting} className={`w-36 mx-auto h-12 rounded-full text-background font-extrabold ${book.book_number === 0 ? 'bg-disabled scale-95' : 'bg-highlight hover:bg-[#FFB340] hover:scale-105 duration-300'}`} >
                            {isSubmitting
                                ? <ThreeDots
                                    height="20"
                                    width="40"
                                    radius="2"
                                    color="#001e1d"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{ justifyContent: "center" }}
                                    visible={true}
                                />
                                : 'Book'}
                        </button>
                    </div>
                    {bookSuccess &&
                        <div className='mt-6 self-center border-2 border-background bg-paragraph text-background text-sm p-3 rounded-lg'>
                            Your booking has been done!
                        </div>
                    }
                    {bookFail &&
                        <div className='mt-6 self-center border-2 bg-[#e7b3b3] border-attention text-sm text-background p-3 rounded-lg'>
                            Something went wrong, try again later.
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
