import { Buildings, IdentificationCard, PencilSimpleLine, ShareNetwork, Lock } from "phosphor-react";
import { FormEvent } from "react";

import { Link, useNavigate } from "react-router-dom";
import { api } from "../Api";
import { Input } from "../components/Input";
import { useUser } from "../context/UserContext";

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const Profile = () => {
    const { user, token, setAuthenticated } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);

        if (form.fullname === "") {
            toast.error('Your name cannot be empty.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }

        await api.post('/profile/update', {
            id: user.id,
            fullname: form.fullname,
            company: form.company,
            role: form.role,
            newPassword: form.newPassword,
            password: form.password
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            navigate('/dashboard')
            setAuthenticated(undefined);
        });
    }

    return (
        <div className="bg-background bg-cover w-screen h-screen overflow-y-auto flex">
            <div className="w-[400px] h-[650px] mx-auto self-center p-8 opacity-95 rounded-[30px] bg-backgroundLight relative  before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileSignup:w-[350px]">
                <div className="">
                    <PencilSimpleLine className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                    <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5">Edit Profile</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5 relative">
                        <div className="relative mx-auto">
                            <span><IdentificationCard className="inline absolute top-4 left-5" size={24} /></span>
                            <Input name="fullname" id="fullname" type='text' placeholder="Full name*" warning="false" defaultValue={user.fullname} />
                        </div>
                        <div className="relative mx-auto">
                            <span><Buildings className="inline absolute top-4 left-5" size={24} /></span>
                            <Input name="company" id="company" type='text' placeholder="Company" warning="false" defaultValue={user.company} />
                        </div>
                        <div className="relative mx-auto">
                            <span><ShareNetwork className="inline absolute top-4 left-5" size={24} /></span>
                            <Input name="role" id="role" type='text' placeholder="Role" warning="false" defaultValue={user.role} />
                        </div>
                        <div className="relative mx-auto">
                            <span><Lock className="inline absolute top-4 left-5" size={24} /></span>
                            <Input name="newPassword" id="newPassword" type='password' placeholder="New Password" warning="false" />
                        </div>
                        <div className="relative mx-auto">
                            <span><Lock className="inline absolute top-4 left-5" size={24} /></span>
                            <Input name="password" id="password" type='password' placeholder="Password*" warning="false" />
                        </div>
                        <button className={`w-36 mx-auto h-12 rounded-full font-extrabold bg-highlight hover:bg-[#FFB340] hover:scale-105 duration-300`} type="submit">
                            Update Profile
                        </button>
                    </form>
                    <div className="mt-5 text-sm text-secondary font-semibold font-open text-center">
                        <Link to="/dashboard" className="text-main hover:underline">Return</Link>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}
