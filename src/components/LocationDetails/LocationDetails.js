import React from 'react';
import styles from "./LocationDetails.module.scss";
import commonStyles from "../../common/commonStyles.module.scss";
import {CgClose} from "react-icons/cg";
import * as emojis from "../../common/emojis";
import PropTypes from 'prop-types';

function LocationDetails(props) {

    LocationDetails.propTypes = {
        toShow: PropTypes.bool,
        locationDetails: PropTypes.object,
        closeLocationScreen:PropTypes.func
    };

    return (
        <div className={`popupScreen scrollbarContainer ${props?.toShow ? "show" : ""}`}>
            <div className={styles.container}>
                {/* Customer Details Section */}
                <div className={commonStyles.characterContainer}>
                    <img src={props?.locationDetails?.character?.image} alt={props?.locationDetails?.character?.name} />

                    <div className='flex-grow-1'>
                        <h5>
                            {props?.locationDetails?.character?.name}
                        </h5>
                        <h6 className='font-weight-normal text-secondary'>
                        <span className={`${commonStyles.status} ${commonStyles[props?.locationDetails?.character?.status]}`}></span>
                        
                     {props?.locationDetails?.character?.status}, 
                     
                     {emojis.speciesEmojis[props?.locationDetails?.character?.species]}  
                     {props?.locationDetails?.character?.species}, 
                     
                     {emojis.genderEmojis[props?.locationDetails?.character?.gender]} 
                     {props?.locationDetails?.character?.gender}
                        </h6>
                    </div>

                    <CgClose onClick={() => props?.closeLocationScreen(null,null,null, false)} size={24} className="flex-grow-auto cursor-pointer" />
                </div>

                {/* Customer Location Details Section */}
                <div className={styles.containerLocation}>
                    <h5 className="text-primary text-uppercase mb-5">
                        {props?.locationDetails?.type} Details
                    </h5>
                    <div className="row mb-3">
                        <div className="col-4">
                            <p className='text-secondary'>
                            Name:
                            </p>
                        </div>
                        <div className="col-8">
                        <h6 className='text-white'>
                                {props?.locationDetails?.location?.name}
                        </h6>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <p className='text-secondary'>
                            Type:
                            </p>
                        </div>
                        <div className="col-8">
                        <h6 className='text-white'>
                                {props?.locationDetails?.location?.type}
                        </h6>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <p className='text-secondary'>
                            Dimension:
                            </p>
                        </div>
                        <div className="col-8">
                        <h6 className='text-white'>
                                {props?.locationDetails?.location?.dimension}
                        </h6>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <p className='text-secondary'>
                            Residents:
                            </p>
                        </div>
                        <div className="col-8">
                        <h6 className='text-white'>
                                {props?.locationDetails?.location?.residents?.length}
                        </h6>
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    );
}

export default LocationDetails;