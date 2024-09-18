import { useEffect, useState } from "react";

const DevSection = () => {

    const [dev, setDev] = useState([]);

    useEffect(() => {
        fetch('dev.json')
        .then(res => res.json())
        .then(data => {
            setDev(data);
        })
    })

    return (
        <div>
            <p>
                {
                    dev.map((dev, index) => {
                        return (
                            <div key={index}>
                                <h2>{dev.name}</h2>
                            </div>
                        )
                    })
                }
            </p>
        </div>
    );
};

export default DevSection;