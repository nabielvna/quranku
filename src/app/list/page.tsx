import SurahList from '../list/list';

const Home: React.FC = () => {
    return (
      <div className='w-full flex flex-col justify-center items-center'>
        <div className='p-5 w-[50%]'>
          <SurahList />
        </div>
      </div>
    );
};

export default Home;
