import React from 'react';
import Spinner from '../ui/Spinner';

type LoaderProps = {
  children: JSX.Element;
  loading: boolean;
};

export default function Loader({
  children,
  loading,
}: LoaderProps): JSX.Element {
  if (loading)
    return (
      <Spinner/>
    );
  return children;
}
