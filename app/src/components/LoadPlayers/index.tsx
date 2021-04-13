import { FunctionComponent, useState } from 'react';

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

  const onSearch = (term: string) => {
    console.log(term);
    setResults(mockData);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='text-4xl font-bold my-6'>Load Players</div>
      {results ? (
        <Results results={results} onBack={() => setResults(null)} />
      ) : (
        <Search onSearch={onSearch} />
      )}
    </div>
  );
};

const Search: FunctionComponent<{ onSearch: (term: string) => void }> = ({
  onSearch,
}) => {
  const [input, setInput] = useState({ value: '' });
  return (
    <form
      className='w-full flex flex-col items-center'
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(input.value);
      }}
    >
      <div className='mb-4'>
        <label>Search Player:</label>
        <input
          value={input.value}
          onChange={(e) => setInput({ value: e.target.value })}
          className='ml-2 border-2 rounded'
        />
      </div>
      <Button
        type='submit'
        className='w-1/6 disabled:bg-gray-500 disabled:opacity-20'
        disabled={!input.value}
      >
        Search
      </Button>
    </form>
  );
};

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
