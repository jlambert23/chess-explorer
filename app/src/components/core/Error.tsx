import four04 from '../../images/404.png';

const Error = () => (
  <div className='h-full flex flex-col justify-center items-center'>
    <img src={four04} alt='404' height='13%' width='13%' />
    <div className='text-center text-6xl font-bold pt-1'>404</div>
  </div>
);
export default Error;
