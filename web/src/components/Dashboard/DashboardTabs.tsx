import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { BookingTab } from './BookingTab/BookingTab';
import { LastBookingsTab } from './LastBookingsTag/LastBookingsTab';
import { UpcomingBookingsTab } from './UpcomingBookingsTab/UpcomingBookingsTab';

export const DashboardTabs = () => {
    const [tabOpen, setTabOpen] = useState<boolean[]>([true, false, false]);

    const openTab = (tab: number) => {
        const newTabOpen: boolean[] = [false, false, false];
        newTabOpen[tab] = true;
        setTabOpen(newTabOpen);
    }

    return (
        <Tabs.Root className="flex flex-col w-5/6 mx-auto py-8" defaultValue="booking">
            <Tabs.List className="flex" aria-label="Manage your account">
                <Tabs.Trigger onClick={() => openTab(0)} className={`px-4 flex h-12 items-center justify-center border-b ${tabOpen[0] ? 'text-highlight border-highlight' : 'text-paragraph border-background hover:cursor-pointer hover:text-main duration-100'} text-xl font-semibold mobile:px-2 mobile:text-sm`} value="booking">
                    Booking
                </Tabs.Trigger>
                <Tabs.Trigger onClick={() => openTab(1)} className={`px-4 flex h-12 items-center justify-center border-b ${tabOpen[1] ? 'text-highlight border-highlight' : 'text-paragraph border-background hover:cursor-pointer hover:text-main duration-100'} text-xl font-semibold mobile:px-2 mobile:text-sm`} value="current">
                    Upcoming Bookings
                </Tabs.Trigger>
                <Tabs.Trigger onClick={() => openTab(2)} className={`px-4 flex h-12 items-center justify-center border-b ${tabOpen[2] ? 'text-highlight border-highlight' : 'text-paragraph border-background hover:cursor-pointer hover:text-main duration-100'} text-xl font-semibold mobile:px-2 mobile:text-sm`} value="last">
                    Last Bookings
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className='h-full' value="booking">
                <BookingTab />
            </Tabs.Content>
            <Tabs.Content className='h-full' value="current">
                <UpcomingBookingsTab />
            </Tabs.Content>
            <Tabs.Content className='h-full' value="last">
                <LastBookingsTab />
            </Tabs.Content>
        </Tabs.Root>
    )
}
