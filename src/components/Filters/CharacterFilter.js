import React, { useState } from 'react'
import commonStyles from "../../common/commonStyles.module.scss";
import PropTypes from 'prop-types';
import { IoFilter } from "react-icons/io5";
import { CgClose } from "react-icons/cg";

function CharacterFilter() {
    CharacterFilter.propTypes = {
        filterDetails: PropTypes.object
    };

    const [toShow, setToShow] = useState(false);
    const toggleFilterScreen = (toShow = true) => {
        setToShow(toShow);
    }

    return (
        <>
            <button className='btn btn-transparent' onClick={toggleFilterScreen}>
                <IoFilter size={36} />
            </button>
            <div className={`popupScreen scrollbarContainer flex-column justify-content-between ${toShow ? "show" : ""}`}>
                    <div>
{/* Header */}
<div className={`${commonStyles.characterContainer} justify-content-between pt-5`}>
                        <h5 className="text-primary text-uppercase mb-0">
                            Filters
                        </h5>
                        <CgClose onClick={() => toggleFilterScreen(false)} size={24} className="flex-grow-auto cursor-pointer ml-auto" />
                    </div>

                    {/* Customer Location Details Section */}
                    <div className='mt-5'>


                        <div className="d-flex flex-column align-items-start justify-content-between">
                            <p className='mb-0 lh-1' >
                                Status
                            </p>
                            <div className="btn-group mt-3" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="filterStatus" id="statusAlive" autoComplete="off" />
                                <label className="btn btn-outline-primary btn-sm px-4 py-3" htmlFor="statusAlive">Alive</label>

                                <input type="radio" className="btn-check" name="filterStatus" id="statusDead" autoComplete="off" />
                                <label className="btn btn-outline-primary btn-sm px-4 py-3" htmlFor="statusDead">Dead</label>

                                <input type="radio" className="btn-check" name="filterStatus" id="statusUnkown" autoComplete="off" />
                                <label className="btn btn-outline-primary btn-sm px-4 py-3" htmlFor="statusUnkown">Unknown</label>

                            </div>
                        </div>


                        <div className="d-flex flex-column align-items-start justify-content-between mt-5">
                            <p className='mb-0 lh-1' >
                                Gender
                            </p>
                            <div className="btn-group mt-3" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="filterGender" id="genderMale" autoComplete="off" />
                                <label className="btn btn-outline-primary btn-sm px-4 py-3" htmlFor="genderMale">Male</label>

                                <input type="radio" className="btn-check" name="filterGender" id="genderFemale" autoComplete="off" />
                                <label className="btn btn-outline-primary btn-sm px-4 py-3" htmlFor="genderFemale">Female</label>

                                <input type="radio" className="btn-check" name="filterGender" id="genderless" autoComplete="off" />
                                <label className="btn btn-outline-primary btn-sm px-4 py-3" htmlFor="genderless">Genderless</label>

                                <input type="radio" className="btn-check" name="filterGender" id="genderUnknown" autoComplete="off" />
                                <label className="btn btn-outline-primary btn-sm px-4 py-3" htmlFor="genderUnknown">Unknown</label>
                            </div>


                        </div>
                    </div>
                    </div>
                    
                    <button className="btn btn-primary ms-auto">
                        Apply Filters
                    </button>
                </div>
            {/* Overlay over webpage when a above screen is opened */}
            <div id="bodyOverlay" className={toShow ? "show" : ""} ></div>
        </>
    )
}

export default CharacterFilter