import { useState, KeyboardEvent, MouseEvent } from 'react';
import Drawer from '@mui/material/Drawer';
import { UserCircle } from 'phosphor-react';

export const Settings = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const toggleDrawer = (isDrawerOpen: boolean) => (event: KeyboardEvent | MouseEvent) => {
        setIsDrawerOpen(isDrawerOpen);
    };

    return (
        <div className='h-[38px] inline'>
            <UserCircle className='inline hover:cursor-pointer hover:scale-110 duration-100' onClick={toggleDrawer(true)} size={38} color="#f9bc60" weight="bold" />
            <Drawer
                anchor='left'
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                <div className='bg-backgroundLight w-96 h-full'>
                    asdasdasd
                </div>
            </Drawer>
        </div>
    );
}
