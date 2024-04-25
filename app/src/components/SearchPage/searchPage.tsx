"use client"
import React, { useState } from 'react';
import SearchForm from '../SearchForm/searchForm';
import SuccessModal from '../SuccessModal/successModal';
import FailedModal from '../FailedModal/failedModal';
import { getFlightData } from '../../../lib/post.ts';

export default function SearchPage() {
  const defauldFlightInfo = {
    flightNum: "",
    custName: "",
    custTEL: "",
    custID: "",
    custMemo: ""
  };
  const [flightInfo, setFlightInfo] = useState(defauldFlightInfo);
  const [isSuccess, setSuccess] = useState(false);
  const [isFailed, setFailed] = useState(false);

  const searchFlight: Function = async (data: any) => {
    const apiData = await getFlightData();
    const found = (
      (Array.isArray(apiData))
        ? apiData?.find((ele: any) => data?.flightNum === `${ele.AirlineID}${ele.FlightNumber}`)
        : false
    );

    setFlightInfo(data);

    if (found) {
      createFlightPlan();
    } else {
      setFailedModal(true);
    }
  };

  const resetData: Function = () => {
    setFlightInfo(defauldFlightInfo);
  };

  const setSuccessModal: Function = (isOpen: boolean) => setSuccess(isOpen);
  const setFailedModal: Function = (isOpen: boolean) => setFailed(isOpen);

  const resetForm: Function = () => {
    resetData();
    setFailedModal(false);
  };

  const confirmForm: Function = () => {
    setFailedModal(false);
    createFlightPlan(true);
  };

  const createFlightPlan: Function = () => {
    setSuccessModal(true);
  };

  const closeSuccessModal: Function = () => {
    resetData();
    setSuccessModal(false);
  }

  return (
    <>
      <SearchForm flightInfo={ flightInfo } searchFlight={ searchFlight } />
      <SuccessModal open={ isSuccess } closeModal={ () => closeSuccessModal() } />
      <FailedModal
        flightNum={ flightInfo.flightNum }
        open={ isFailed }
        closeModal={ () => setFailedModal(false) }
        resetForm={ () => resetForm() }
        confirm={ () => confirmForm() }
      />
    </>
  );
}
