import { useState, FunctionComponent } from 'react';

import { Card, Button } from '../common';

interface ResultLine {
  label: string;
  value: string | ResultLine[];
}

const mockData: ResultLine[] = [
  { label: 'Country', value: 'US' },
  {
    label: 'Rating',
    value: [
      {
        label: 'Daily',
        value: '1100',
      },
      { label: 'Blitz', value: '1000' },
      {
        label: 'Rapid',
        value: '1100',
      },
    ],
  },
  { label: 'No. of Games', value: '203' },
  { label: 'Last Updated', value: 'never' },
];

const LoadPlayers = () => {
  const [results, setResults] = useState<any>();
  return (
    <div className='flex flex-col items-center'>
      <div className='text-4xl font-bold my-6'>Load Players</div>
      {results ? (
        <Results results={results} onBack={() => setResults(null)} />
      ) : (
        <Search onSearch={setResults} />
      )}
    </div>
  );
};

const Search: FunctionComponent<{ onSearch: (res: any) => void }> = ({
  onSearch,
}) => (
  <div className='w-full flex flex-col items-center'>
    <div className='mb-4'>
      <label>Search Player:</label>
      <input className='ml-2 border-2 rounded' />
    </div>
    <Button className='w-1/6' onClick={() => onSearch(mockData)}>
      Search
    </Button>
  </div>
);

const Results: FunctionComponent<{
  results: ResultLine[];
  onBack?: () => void;
}> = ({ results, onBack }) => (
  <div className='w-full flex flex-col items-center'>
    <Card className='w-1/5 px-6 flex flex-col items-center'>
      <div className='w-full text-3xl font-medium text-center border-b-2 mb-2 pb-1'>
        justuntinian
      </div>
      <ResultList results={results} />
    </Card>
    <Button className='mt-4 px-10' onClick={onBack}>
      Back
    </Button>
  </div>
);

const ResultList: FunctionComponent<{ results: ResultLine[] }> = ({
  results,
}) => (
  <ul className='list-outside'>
    {results.map(({ label, value }) => (
      <li>
        <div className='inline font-medium mr-2'>{label}:</div>
        {typeof value === 'object' ? (
          <ResultList results={value}></ResultList>
        ) : (
          <div className='inline'>{value}</div>
        )}
      </li>
    ))}
  </ul>
);

export default LoadPlayers;
