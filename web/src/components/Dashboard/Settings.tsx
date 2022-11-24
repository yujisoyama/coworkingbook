import { useState, KeyboardEvent, MouseEvent } from 'react';
import Drawer from '@mui/material/Drawer';
import { Buildings, EnvelopeSimple, IdentificationCard, Info, PencilSimpleLine, ShareNetwork, SignOut, UserCircle } from 'phosphor-react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
    const { user, setToken } = useUser();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleDrawer = (isDrawerOpen: boolean) => (event: KeyboardEvent | MouseEvent) => {
        setIsDrawerOpen(isDrawerOpen);
    };

    const signOut = () => {
        setToken("");
        localStorage.setItem("token", "");
        navigate("/");
    }

    const editProfile = () => {
        navigate("/profile");
    }

    return (
        <div className='h-[38px] inline'>
            <UserCircle className='inline hover:cursor-pointer hover:scale-110 duration-100' onClick={toggleDrawer(true)} size={38} color="#f9bc60" weight="bold" />
            <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)} >
                <div className='bg-backgroundLight w-96 h-full flex flex-col justify-between mobile:w-80'>
                    <div className='flex flex-col gap-5 p-9'>
                        <UserCircle className='block mx-auto' size={45} color="#e8e4e6" />
                        <div className='flex flex-row items-center gap-2 font-open text-paragraph'>
                            <IdentificationCard className="inline" size={25} color="#e8e4e6" />
                            <p>{user.fullname}</p>
                        </div>
                        <div className='flex flex-row items-center gap-2 font-open text-paragraph'>
                            <EnvelopeSimple className="inline" size={25} color="#e8e4e6" />
                            <p>{user.email}</p>
                        </div>
                        <div className='flex flex-row items-center gap-2 font-open text-paragraph'>
                            <Buildings className="inline" size={25} color="#e8e4e6" />
                            <p>{user.company}</p>
                        </div>
                        <div className='flex flex-row items-center gap-2 font-open text-paragraph'>
                            <ShareNetwork className="inline" size={25} color="#e8e4e6" />
                            <p>{user.role}</p>
                        </div>
                    </div>
                    <div>
                        <div onClick={editProfile} className='px-9 py-4 flex flex-row items-center gap-2 font-open text-paragraph hover:cursor-pointer hover:bg-[#005855] duration-100'>
                            <PencilSimpleLine size={25} color="#e8e4e6" />
                            <p>Edit profile</p>
                        </div>
                        <div onClick={signOut} className='px-9 py-4 flex flex-row items-center gap-2 font-open text-paragraph hover:cursor-pointer hover:bg-[#005855] duration-100'>
                            <SignOut size={25} color="#e8e4e6" />
                            <p>Sing out</p>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
