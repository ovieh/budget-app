import React from 'react';
import { useHiQuery } from '../../generated/graphql';

interface Props {}

export const Hi: React.FC<Props> = () => {
  const { data, error, loading } = useHiQuery();
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    console.log(JSON.stringify(error));
    return <div>error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return <h1>{data.hi}</h1>;
};
