import { useEffect, useState } from "react"
import { IUpcomingBooking } from "../../../@types/Book";
import { api } from "../../../Api";
import { useUser } from "../../../context/UserContext";
import { Loading } from "../Loading";
import { UpcomingBookings } from "./UpcomingBookings";

export const UpcomingBookingsTab = () => {
    const date = new Date();
    const todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const { user, token } = useUser();
    const [upcomingBooks, setUpcomingBooks] = useState<IUpcomingBooking[]>();
    const [upcomingBooksLoaded, setUpcomingBooksLoaded] = useState<boolean>(false);

    const loadUpcomingBooks = async () => {
        setUpcomingBooksLoaded(false);
        let timer = setTimeout(async () => {
            await api.get(`/book/upcoming/${user.id}/${todayDate}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => {
                setUpcomingBooks(res.data);
                clearTimeout(timer);
                setUpcomingBooksLoaded(true);
            });
        }, 700);
    }

    const cancelBooking = async (bookId: number) => {
        await api.delete(`/book/cancel/${bookId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).catch(error => {
            console.log(error);
        });
        loadUpcomingBooks();
    }

    useEffect(() => {
        loadUpcomingBooks();
    }, [])

    return (
        <div>
            <div className="mt-[3%] w-full bg-backgroundLight rounded-xl flex flex-col text-paragraph font-semibold px-9 py-5">
                {upcomingBooksLoaded ? (
                    <>
                        {upcomingBooks?.length ? (
                            <>
                                {upcomingBooks.map(book => [
                                    <UpcomingBookings id={book.id} key={book.id} type={book.type} booking_number={book.booking_number} booking_day={book.booking_day} period_id={book.period_id} user={user.id} cancelBooking={() => cancelBooking(book.id)} />
                                ])}
                            </>
                        ) : (
                            <div className="flex h-16 justify-center items-center upcomingTabMobile:text-sm">You don't have current books.</div>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    )
}
