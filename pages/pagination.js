import { useState } from 'react';
import Paginator from '../src/components/commons/virtual-paginator';
import ComponentStateHandler, { useFetcher } from '../src/components/commons/component-state-handler';
import Tray from '../src/components/commons/tray';
import Image from '../src/components/commons/image';

const Loader = () => (<div>{"loading...."}</div>)

const Error = () => (<div>{"error...."}</div>)

const Rail = () => {
  return (
    <>
      {
        <Tray>
          {
            new Array(20).fill(1).map((item, index) => (
              <div key={index}>
                <Image
                  alt="hai kuch to bhai"
                  height={300}
                  width={400}
                  // eslint-disable-next-line max-len
                  src="/image/upload/w_599,h_337,c_scale,f_webp,q_auto:eco/resources/0-101-externalli_666746733/app_cover/1170x658withlogo_45191934.jpg"
                />
                <div style={{ margin: '5px' }} />
              </div>
            ))
          }
        </Tray>
      }      
    </>
  );
}


const Rails = () => {
  const [list, setList] = useState([])
  const dataFetcher = () => getInfiniteData();
  const onDataFetched = list => {
    setList((prevList) => [...prevList, ...list]);
  };
  const fetchMore = async () => {
    try {
      const list = await getInfiniteData();
      setList((prevList) => [...prevList, ...list]);
    } catch (e) {
      console.log(e)
    }
  }

  const [fetchState] = useFetcher(dataFetcher, onDataFetched);

  return (
    <ComponentStateHandler
      Loader={Loader}
      state={fetchState}
      ErrorComp={Error}
    >
      <Paginator
        fetchMore={fetchMore}
        totalSize={50}
        batchSize={5}
        Skeleton={Loader}
      >
        {
          list.map((item, index) => {
            return (
              <Rail key={index} />
            )
          })
        }
      </Paginator>
    </ComponentStateHandler>
  );
}
  
export default Rails;
