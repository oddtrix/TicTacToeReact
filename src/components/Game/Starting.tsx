import React from "react"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";

const Starting = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let [countdown, setCountdown] = React.useState<number>(3)

    const countDownFunc = () => {
        console.log(countdown)
        setCountdown(--countdown)
    }

    React.useEffect(() => {
        let intervalId = setInterval(countDownFunc, 1000)
        if (countdown == 0) {
            clearInterval(intervalId)
        }

        return () => clearInterval(intervalId)
    }, [countdown, setCountdown])

    React.useEffect(() => {

    }, [dispatch]);

    React.useEffect(() => {
        if (countdown == 0) {
            navigate("/game");
        }
    }, [countdown])
    return (
        <>
            <div className="bg-green-400 mt-52 p-10 rounded-xl text-white flex flex-col items-center">
                <h1 className="text-2xl ">Starting in ...</h1>
                <span className="mt-4 text-2xl">{countdown}s</span>
            </div>
        </>
    )
}

export default Starting