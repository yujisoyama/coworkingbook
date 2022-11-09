
import { MutatingDots } from 'react-loader-spinner'

export const Loading = () => {
    return (
        <div className='flex h-full justify-center items-center'>
            <MutatingDots
                height="100"
                width="100"
                color="#f9bc60"
                secondaryColor='#f9bc60'
                radius='15'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}
