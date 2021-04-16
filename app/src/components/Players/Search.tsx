import { FunctionComponent, useState } from 'react';

import { Button } from '../common';

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
          className='ml-2 border-2 rounded pl-1'
        />
      </div>
      <Button
        type='submit'
        className='w-1/6 disabled:bg-gray-500 disabled:opacity-20'
        disabled={!input.value}
      >
        <strong>Find Player</strong>
      </Button>
    </form>
  );
};
export default Search;
