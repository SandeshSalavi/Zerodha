import React from 'react';

function pricing() {
    return (
       <div className='container mb-5'>
        <div className='row'>
            <div className='col-4'>
                <h1 className='mb-3 fs-2'>Unbeatable pricing</h1>
                <p>
we pioneered the concept of discount broking and price transparency in India.Plat fees and no hidden charges.
                </p>
                 <a href=''  style={{textDecoration:"none"}}>See pricing<i class="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className='col-2'></div>
            <div className='col-6'>
                <div className='row text-center  mb-5'>
                     <div className='col border'>
                        <h1 className='  mt-4 mb-3'><i class="fa fa-inr" aria-hidden="true"></i>0 </h1>
                        <p  className='mb-4'>
                            Free equity and <br></br> direct mutual funds
                        </p>
                     </div>
                      <div className='col border'>
                        <h1 className=' mt-4 mb-3'><i class="fa fa-inr" aria-hidden="true"></i>20 </h1>
                        <p className='mb-4  '>
                            Intraday and F&O
                        </p>
                     </div>
                </div>
            </div>

        </div>

       </div>
      );
}

export default pricing;