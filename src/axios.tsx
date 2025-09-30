import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WeatherApp() {
    const [city, setCity] = useState<string>("");
    const [weather, setWeather] = useState<any>(null);
    const [error, setError] = useState<string>("");

    const api_key = "46f2c731588f5d4a4eb3db79128f764e";

    const getWeather = async () => {
        if (city === "") {
            toast.error("Tên thành phố không được bỏ trống");
            return;
        }
        try {
            setError("");
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}&lang=vi`
            );
            toast.success("Lấy dữ liệu thời tiết thành công");
            setWeather(res.data);
        } catch (err) {
            setError("Không tìm thấy thành phố!");
            setWeather(null);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-tr from-[#12ff71] to-[#ffc02c] bg-clip-text text-transparent ">Ứng dụng thời tiết</h2>

            <div className="flex mb-4">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Nhập tên thành phố"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={getWeather}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Lấy thời tiết
                </button>
            </div>
            {error && <p className="text-red-500 font-bold mb-4 bg-white rounded p-3">{error}</p>}
            {weather && (
                <div className="text-center">
                    <h1 className="text-3xl text-white font-semibold mb-2">{weather.name}, {weather.sys.country}</h1>
                    <p className="text-7xl">☁️</p>
                    <p className="text-6xl text-white font-bold mb-2">{Math.round(weather.main.temp)}°C</p>
                    <p className="capitalize text-xl font-bold text-white mb-2">{weather.weather[0].description}</p>
                    <hr />
                    <div className="grid grid-cols-2 text-white gap-4 mt-4">
                        <p className="mb-1">Độ ẩm: <br />
                         {weather.main.humidity}%</p>
                        <p>Gió: <br />{Math.round(weather.wind.speed)}  m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
}

