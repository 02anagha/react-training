import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useHttp from "../hooks/useHttp";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

function Searchbar() {
    const [input, setInput] = useState("");
    const [debouncedValue, setDebouncedValue] = useState('');
    const [throttledValue, setThrottledValue] = useState('');
    const {
        data,
        isLoading: isSending,
        error,
        sendRequest
    } = useHttp('http://localhost:3000/search', requestConfig);

    console.log(data)
    useEffect(() => {
        console.log('Input value changed:', input);

        const throttleTimer = setTimeout(() => {
            console.log("Throttle timer expired.", input);
            let jsonData = JSON.stringify({
                searchValue: input,
            })
            sendRequest(jsonData);
        }, 1000);
        return () => {
            console.log('Clearing throttle timer');
            clearTimeout(throttleTimer);
        };
    }, [input]);

    const handleChange = (value) => {
        setInput(value);
        console.log("value", value)
    };
    return (
        <>
            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                    placeholder="Type to search..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />

                {data && data.length > 0 && (
                    <div className="search-dropdown">
                        <ul>
                            {data[0].name}
                            {data.map((result) => {
                                {result.name}
                                <li>
                                    <span> {result.name} </span>
                                    <span>  &#8377;&nbsp;{result.price} </span>
                                </li>
                            })}
                        </ul>

                    </div >)
                }
            </div>
        </>

    )
}

export default Searchbar