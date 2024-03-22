import React from "react";

const FetchDog = ({ dogData, addToBanList }) => {
    if (!dogData) {
        return null;
    }

    const { image, breed } = dogData;

    const handleAddToBanList = (value) => {
        addToBanList(value);
    };

    return (
        <div className="dog-container">
            <div className="dog-info">
                <button type="button" className="button" onClick={() => handleAddToBanList(breed.name)}>{breed.name}</button>
                <button type="button" className="button" onClick={() => handleAddToBanList(breed.weight.imperial)}>{breed.weight.imperial} lbs</button>
                <button type="button" className="button" onClick={() => handleAddToBanList(breed.life_span)}>{breed.life_span}</button>
            </div>
            <img className="dog-image" src={image.url} alt="Dog" />
        </div>
    );
}

export default FetchDog;
