import { useEffect, useState } from "react"
import { IUpcomingBooking } from "../../../@types/Book";
import { api } from "../../../Api";
import { useUser } from "../../../context/UserContext";
import { Loading } from "../Loading";
import { LastBookings } from "./LastBookings";

export const LastBookingsTab = () => {
    const date = new Date();
    const todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const { user, token } = useUser();
    const [lastBooks, setLastBooks] = useState<IUpcomingBooking[]>();
    const [lastBooksLoaded, setLastBooksLoaded] = useState<boolean>(false);

    const loadLastBooks = async () => {
        setLastBooksLoaded(false);
        let timer = setTimeout(async () => {
            await api.get(`/book/last/${user.id}/${todayDate}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => {
                setLastBooks(res.data);
                clearTimeout(timer);
                setLastBooksLoaded(true);
            });
        }, 700);
    }

    useEffect(() => {
        loadLastBooks();
    }, [])

    return (
        <div>
            <div className="mt-[3%] w-full bg-backgroundLight rounded-xl flex flex-col text-paragraph font-semibold text-lg px-9 py-5">
                {lastBooksLoaded ? (
                    <>
                        {lastBooks?.length ? (
                            <>
                                {lastBooks.map(book => [
                                    <LastBookings id={book.id} key={book.id} type={book.type} booking_number={book.booking_number} booking_day={book.booking_day} period_id={book.period_id} user={user.id} />
                                ])}
                            </>
                        ) : (
                            <div className="flex h-16 justify-center items-center upcomingTabMobile:text-sm">You don't have last books.</div>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    )
}
