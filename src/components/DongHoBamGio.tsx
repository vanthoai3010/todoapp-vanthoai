import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DongHoBamGio() {
    const [seconds, setSeconds] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const toggle = () => {
        setIsActive(!isActive);
    }
    const reset = () => {
        setSeconds(0);
        setIsActive(false);
        setLaps([]);
    }

    return (
        <div className="text-center">   
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-tr from-[#12ff71] to-[#ffc02c] bg-clip-text text-transparent ">Đồng hồ bấm giờ</h2>
            <div className="text-6xl text-white mb-4 font-mono">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
            <div className="space-x-4 mb-4">
                <button onClick={toggle} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors">
                    {isActive ? 'Dừng' : 'Bắt đầu'}
                </button>
                <button onClick={reset} className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition-colors">
                    Đặt lại
                </button>
                <button onClick={() => {
                    if (isActive) {
                        setLaps([...laps, seconds]);
                    } else {
                        toast.error("Phải đang chạy mới có thể lưu vòng!");
                    }
                }} className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:ring-2 focus:ring-green-500  transition-colors">
                    Vòng
                </button>   
            </div>
            <div className="max-h-48 overflow-y-auto">
                {laps.map((lap, index) => (
                    <div key={index} className="text-lg font-mono">
                        Vòng {index + 1}: {String(Math.floor(lap / 60)).padStart(2, '0')}:{String(lap % 60).padStart(2, '0')}
                    </div>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
