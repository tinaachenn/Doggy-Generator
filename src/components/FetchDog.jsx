import React, {useState} from "react";

const FetchDog = ({dogData}) => {
    if (!dogData) {
        return null;
    }

    const { image, breed } = dogData;

    return (
        <div className="dog-container">
            <div className="dog-info">
                <button type="button" className="button">{breed.name}</button>
                <button type="button" className="button">{breed.weight.imperial} lbs</button>
                <button type="button" className="button">{breed.life_span}</button>
            </div>
            <img className="dog-image" src={image.url} alt="Dog" />
        </div>
    );
}

export default FetchDog;