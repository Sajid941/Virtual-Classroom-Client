import { useEffect, useState } from "react";

const DevSection = () => {

    const [dev, setDev] = useState(null)

    useEffect(() => {
        fetch('dev.json')
        .then(res => res.json())
        .then(data => {
            setDev(data);
        })
    })

    return (
        <div>
            <p>{dev?.name}</p>
        </div>
    );
};

export default DevSection;