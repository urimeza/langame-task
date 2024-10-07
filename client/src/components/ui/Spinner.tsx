import React from 'react';
import { Triangle } from 'react-loader-spinner';

const Spinner = (): JSX.Element => {
  return (
    <div className='spinnerFixed'>
    <Triangle
      visible
      height="120"
      width="120"
      color="salmon"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    </div>
  );
};

export default Spinner;

