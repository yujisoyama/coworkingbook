import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { teal, yellow } from '@mui/material/colors';
import { Circle } from 'phosphor-react';
import { Desks } from './Desks';
import { FormEvent, useEffect, useState } from 'react';
import { MeetingRooms } from './MeetingRooms';
import { useUser } from '../../../context/UserContext';
import { api } from '../../../Api';
import { ThreeDots } from 'react-loader-spinner';
import { IBook, INotAvailable, IStatus, } from '../../../@types/Book';
import { Loading } from '../Loading';

const Default_Desks: IStatus[] = [
    { booking_number: 1, available: true, selected: false },
    { booking_number: 2, available: true, selected: false },
    { booking_number: 3, available: true, selected: false },
    { booking_number: 4, available: true, selected: false },
    { booking_number: 5, available: true, selected: false },
    { booking_number: 6, available: true, selected: false },
    { booking_number: 7, available: true, selected: false },
    { booking_number: 8, available: true, selected: false },
    { booking_number: 9, available: true, selected: false },
    { booking_number: 10, available: true, selected: false },
]

const Default_Rooms: IStatus[] = [
    { booking_number: 1, available: true, selected: false },
    { booking_number: 2, available: true, selected: false },
    { booking_number: 3, available: true, selected: false },
]

export const BookingTab = () => {
    const date = new Date();
    const minDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    date.setDate(date.getDate() + 14);
    const maxDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const { user, token } = useUser();
    const [desks, setDesks] = useState<IStatus[]>(Default_Desks);
    const [rooms, setRooms] = useState<IStatus[]>(Default_Rooms);
    const [book, setBook] = useState<IBook>({ type: '', booking_number: 0, booking_day: minDate, period_id: 3, user: user.id });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [bookSuccess, setBookSuccess] = useState<boolean>(false);
    const [bookFail, setBookFail] = useState<boolean>(false);
    const [bookNotAvailable, setBookNotAvailable] = useState<boolean>(false);
    const [bookMessage, setBookMessage] = useState<string>('');
    const [availabilityLoaded, setAvailabilityLoaded] = useState<boolean>(false);

    const loadAvailability = async () => {
        setAvailabilityLoaded(false);
        book.type = '';
        book.booking_number = 0;
        const { booking_day, period_id } = book;
        let timer = setTimeout(async () => {
            await api.post('/book/available', {
                booking_day,
                period_id
            },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then(res => {
                    for (let i = 0; i < desks.length; i++) {
                        desks[i].selected = false;
                        const notAvailable: INotAvailable[] = res.data.notAvailableDesks.filter((notAvailable: INotAvailable) => notAvailable.booking_number === desks[i].booking_number);
                        if (notAvailable.length) {
                            desks[i].available = false;
                        } else {
                            desks[i].available = true;
                        }
                    }
                    for (let i = 0; i < rooms.length; i++) {
                        rooms[i].selected = false;
                        const notAvailable: INotAvailable[] = res.data.notAvailableRooms.filter((notAvailable: INotAvailable) => notAvailable.booking_number === rooms[i].booking_number);
                        if (notAvailable.length) {
                            rooms[i].available = false;
                        } else {
                            rooms[i].available = true;
                        }
                    }
                    clearTimeout(timer);
                    setAvailabilityLoaded(true);
                })
        }, 700)
    }

    const selectDesk = (booking_number: number) => {
        if (desks[booking_number - 1].available) {
            setDesks(desks.map(desk =>
                desk.booking_number === booking_number
                    ? { ...desk, selected: true }
                    : { ...desk, selected: false }
            ));
            setRooms(rooms.map(room =>
                room.selected
                    ? { ...room, selected: false }
                    : { ...room }
            ));
            setBook({ ...book, type: 'desk', booking_number });
        }
    }

    const selectRoom = (booking_number: number) => {
        if (rooms[booking_number - 1].available) {
            setRooms(rooms.map(room =>
                room.booking_number === booking_number
                    ? { ...room, selected: true }
                    : { ...room, selected: false }
            ));
            setDesks(desks.map(desk =>
                desk.selected
                    ? { ...desk, selected: false }
                    : { ...desk }
            ));
            setBook({ ...book, type: 'room', booking_number });
        }
    }

    const selectDate = (event: FormEvent<HTMLInputElement>) => {
        setBook({ ...book, booking_day: event.currentTarget.value });
        event.preventDefault();
    }

    const selectPeriod = (event: FormEvent<HTMLInputElement>) => {
        setBook({ ...book, period_id: Number(event.currentTarget.value) })
    }

    const renderDeskOrRoom = (type: string) => {
        switch (type) {
            case '':
                return <p>Select a Desk or Meeting room.</p>
            case 'desk':
                return <p>Desk number: <span className='text-highlight'>{book.booking_number}</span></p>
            case 'room':
                return <p>Meeting room number: <span className='text-highlight'>{book.booking_number}</span></p>
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
        setBookNotAvailable(false);
        setIsSubmitting(true);
        console.log(book);

        let timer = setTimeout(async () => {
            await api.post('/book', book, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => {
                setBookMessage(res.data);
                setBookSuccess(true);
                setBookFail(false);
                setBookNotAvailable(false);
                clearTimeout(timer);
                setIsSubmitting(false);
                setBook({ type: '', booking_number: 0, booking_day: minDate, period_id: 3, user: user.id });
                loadAvailability();
            }).catch(error => {
                if (error.response.status === 409) {
                    setBookMessage(error.response.data);
                    setBookNotAvailable(true);
                } else {
                    setBookFail(true);
                }
                console.log(error);
                clearTimeout(timer);
                setIsSubmitting(false);
                setBookSuccess(false);
            })
        }, 1000);
    }

    useEffect(() => {
        loadAvailability();
    }, [book.booking_day, book.period_id])

    return (
        <div className="mt-[3%] w-full min-h-[500px] bg-backgroundLight rounded-xl flex flex-col text-paragraph font-semibold text-lg px-9 py-5">
            <div className='flex flex-row justify-start items-center gap-6
                bookingTabMd:flex-col
                bookingTabLg:items-start
                bookingTabMd:gap-4'>
                <div className='bookingTabSm:text-base'>
                    <label htmlFor="date" className="mr-3">Select a date:</label>
                    <input onChange={selectDate} type="date" name="date" id="date" min={minDate} max={maxDate} defaultValue={minDate} className="border-none outline-none bg-highlight py-2 px-4 rounded-lg text-background font-normal text-base bookingTabSm:text-sm" />
                </div>
                <div className='ml-10 flex flex-row items-center gap-6
                    bookingTabMd:ml-0
                    bookingTabSm:text-sm
                    bookingTabSm:gap-3
                    bookingTabMobile:flex-col
                    bookingTabMobile:items-start
                    bookingTabMobile:gap-0'>
                    Select a period:
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue={3}
                            className='gap-5 bookingTabSm:gap-1 bookingTabMobile:mr-50px'
                            onChange={selectPeriod}
                        >
                            <FormControlLabel value={3} control={<Radio sx={{ color: teal[100], '&.Mui-checked': { color: yellow[800], }, }} />} label={<span className='bookingTabSm:text-sm'>Full Day</span>} />
                            <FormControlLabel value={1} control={<Radio sx={{ color: teal[100], '&.Mui-checked': { color: yellow[800], }, }} />} label={<span className='bookingTabSm:text-sm'>Morning</span>} />
                            <FormControlLabel value={2} control={<Radio sx={{ color: teal[100], '&.Mui-checked': { color: yellow[800], }, }} />} label={<span className='bookingTabSm:text-sm'>Afternoon</span>} />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className='flex flex-row gap-8 mt-5 
                bookingTabLg:flex-col 
                bookingTabLg:items-center
                bookingTabLg:gap-0' >
                <div className='w-2/3
                    bookingTabLg:w-full'>
                    <div className="h-[350px] border-background border-2 rounded-xl
                        bookingTabMobile:h-[270px]">
                        {availabilityLoaded
                            ? (
                                <>
                                    <div className='h-[233px] grid grid-cols-5 gap-4 justify-items-center items-center
                                        bookingTabMobile:h-[180px]
                                        bookingTabMobile:gap-0
                                        bookingTabMobile:px-2'>
                                        {desks.map(desk => [
                                            <div key={desk.booking_number} onClick={() => selectDesk(desk.booking_number)}>
                                                <Desks booking_number={desk.booking_number} available={desk.available} selected={desk.selected} />
                                            </div>
                                        ])}
                                    </div>
                                    <div className='h-[116px] grid grid-cols-3 justify-items-center items-center
                                        bookingTabMobile:h-[90px]
                                        bookingTabMobile:gap-0
                                        bookingTabMobile:px-2'>
                                        {rooms.map(room => [
                                            <div key={room.booking_number} onClick={() => selectRoom(room.booking_number)}>
                                                <MeetingRooms booking_number={room.booking_number} available={room.available} selected={room.selected} />
                                            </div>
                                        ])}
                                    </div>
                                </>
                            ) : (
                                <Loading />
                            )}
                    </div>
                    <div className='flex flex-row mt-4 gap-1 items-center justify-end text-sm mr-5
                        bookingTabMobile:mr-1
                        bookingTabMobile:text-xs'>
                        <Circle className='ml-8 bookingTabMobile:ml-3' size={16} color="#e8e4e6" weight="fill" />
                        <p>Available</p>
                        <Circle className='ml-8 bookingTabMobile:ml-3' size={16} color="#e16162" weight="fill" />
                        <p>Not Available</p>
                        <Circle className='ml-8 bookingTabMobile:ml-3' size={16} color="#f9bc60" weight="fill" />
                        <p>Selected</p>
                    </div>
                </div>
                <div className='w-1/3 mt-6 flex flex-col
                    bookingTabLg:w-full'>
                    <div>
                        Booking info:
                        <hr />
                        <div className='mt-4 flex flex-col gap-2 text-base'>
                            {renderDeskOrRoom(book.type)}
                            <p>Date: <span className='text-highlight'>{book.booking_day}</span></p>
                            {renderPeriod(book.period_id)}
                        </div>
                    </div>
                    <div className='mt-10 self-center'>
                        <button onClick={handleBook} disabled={book.booking_number === 0 || isSubmitting} className={`w-36 mx-auto h-12 rounded-full text-background font-extrabold ${book.booking_number === 0 ? 'bg-disabled scale-95' : 'bg-highlight hover:bg-[#FFB340] hover:scale-105 duration-300'}`} >
                            {isSubmitting
                                ? <ThreeDots height="20" width="40" radius="2" color="#001e1d" ariaLabel="three-dots-loading" wrapperStyle={{ justifyContent: "center" }} visible={true} />
                                : 'Book'}
                        </button>
                    </div>
                    {bookSuccess &&
                        <div className='mt-6 self-center border-2 border-background bg-paragraph text-background text-sm p-3 rounded-lg'>
                            {bookMessage}
                        </div>
                    }
                    {bookFail &&
                        <div className='mt-6 self-center border-2 bg-attentionBackground border-attention text-sm text-background p-3 rounded-lg'>
                            Something went wrong, try again later.
                        </div>
                    }
                    {bookNotAvailable &&
                        <div className='mt-6 self-center border-2 bg-attentionBackground border-attention text-sm text-background p-3 rounded-lg'>
                            {bookMessage}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
