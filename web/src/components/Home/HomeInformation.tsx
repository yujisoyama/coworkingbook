import workGif from "../../../assets/work.gif"

export const HomeInformation = () => {
    return (
        <div className="mt-5 w-[40rem] mobileHome:w-[400px]">
            <h1 className="text-4xl text-highlight font-open font-bold mobileHome:pl-4">Coworking Booking</h1>
            <p className="mt-5 text-lg font-open font-semibold text-paragraph mobileHome:pl-4 pr-4">Platform to simplify the booking for desks or meeting rooms in coworking spaces</p>
            <img src={workGif} alt="gif" className="block w-96 h-96 mt-10 mr-auto ml-auto mobileHome:mt-3" />
        </div>
    )
}
